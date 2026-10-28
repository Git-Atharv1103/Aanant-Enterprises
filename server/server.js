import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Robust process error handling to prevent server crashes from socket timeouts
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL] Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Allow payloads up to 15MB for technical CAD / drawing uploads encoded as base64
app.use(express.json({ limit: '15mb' }));

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');

// Ensure data and uploads directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
}
if (!fs.existsSync(QUOTES_FILE)) {
  fs.writeFileSync(QUOTES_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Rate Limiter: max 15 requests per 15 mins per IP
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

function rateLimitMiddleware(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  
  const record = rateLimitMap.get(ip) || { count: 0, firstRequest: now };
  
  if (now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return next();
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests from this IP. Please try again after 15 minutes or contact us directly by phone or WhatsApp.'
    });
  }
  
  record.count += 1;
  rateLimitMap.set(ip, record);
  next();
}

// Health & System Status Endpoint
app.get('/api/status', (req, res) => {
  let enquiryCount = 0;
  let quoteCount = 0;
  try {
    const enquiries = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf8'));
    enquiryCount = enquiries.length;
    const quotes = JSON.parse(fs.readFileSync(QUOTES_FILE, 'utf8'));
    quoteCount = quotes.length;
  } catch (err) {
    console.error('Error reading stats:', err);
  }

  const emailConfigured = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  res.json({
    status: 'operational',
    service: 'Aanant Enterprises Manufacturing Portal API',
    emailForwardingConfigured: emailConfigured,
    totalEnquiriesStored: enquiryCount,
    totalQuotesStored: quoteCount,
    timestamp: new Date().toISOString()
  });
});

// Dedicated Quote / RFQ submission endpoint
app.post('/api/quotes', rateLimitMiddleware, async (req, res) => {
  try {
    const {
      customerName,
      companyName = '',
      email,
      mobileNumber,
      productName,
      manufacturingRequirement,
      manufacturingProcess,
      material = '',
      quantity,
      dimensions = '',
      deliveryDate = '',
      additionalInstructions = '',
      drawingFileName = '',
      drawingFileSize = 0,
      drawingFileType = '',
      drawingBase64 = '',
      consent,
      botCatch = ''
    } = req.body;

    if (botCatch && botCatch.trim() !== '') {
      return res.status(400).json({ success: false, error: 'Spam submission detected.' });
    }

    const errors = [];
    if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
      errors.push('Customer Name is required (min 2 characters).');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.push('A valid email address is required.');
    }
    const cleanPhone = (mobileNumber || '').replace(/[\s\-()]/g, '');
    if (!mobileNumber || typeof mobileNumber !== 'string' || !/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
      errors.push('A valid mobile number is required (10-15 digits).');
    }
    if (!productName || typeof productName !== 'string' || productName.trim().length < 2) {
      errors.push('Product / Component Name is required.');
    }
    if (!manufacturingRequirement || typeof manufacturingRequirement !== 'string' || manufacturingRequirement.trim().length < 5) {
      errors.push('Manufacturing Requirement description is required (min 5 characters).');
    }
    if (!manufacturingProcess || typeof manufacturingProcess !== 'string') {
      errors.push('Manufacturing Process selection is required.');
    }
    if (!quantity || typeof quantity !== 'string' || quantity.trim().length === 0) {
      errors.push('Required Quantity is required.');
    }
    if (consent !== true && consent !== 'true') {
      errors.push('You must confirm authorization/consent to request a quotation.');
    }

    // Secure file upload validation
    let savedDrawingPath = null;
    let storedFileName = null;
    if (drawingFileName && drawingBase64) {
      const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.dxf', '.dwg', '.step', '.stp'];
      const ext = path.extname(drawingFileName).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        errors.push(`Disallowed file type: ${ext}. Allowed formats: PDF, JPG, PNG, DXF, DWG, STEP.`);
      }
      if (drawingFileSize > 15 * 1024 * 1024) {
        errors.push('File size exceeds the 15MB limit.');
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: errors.join(' ') });
    }

    // Generate unique RFQ Reference ID: AE-RFQ-YYYYMMDD-XXXX
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `AE-RFQ-${dateStr}-${randomSuffix}`;

    // Securely write file if provided
    if (drawingFileName && drawingBase64) {
      const safeExt = path.extname(drawingFileName).toLowerCase();
      storedFileName = `${referenceId}-${Date.now()}${safeExt}`;
      savedDrawingPath = path.join(UPLOADS_DIR, storedFileName);

      const base64Data = drawingBase64.replace(/^data:[^;]+;base64,/, '');
      fs.writeFileSync(savedDrawingPath, base64Data, 'base64');
    }

    const newQuoteRecord = {
      referenceId,
      submittedAt: now.toISOString(),
      customerName: customerName.trim(),
      companyName: (companyName || '').trim(),
      email: email.trim().toLowerCase(),
      mobileNumber: mobileNumber.trim(),
      productName: productName.trim(),
      manufacturingRequirement: manufacturingRequirement.trim(),
      manufacturingProcess: manufacturingProcess.trim(),
      material: (material || '').trim(),
      quantity: quantity.trim(),
      dimensions: (dimensions || '').trim(),
      deliveryDate: (deliveryDate || '').trim(),
      additionalInstructions: (additionalInstructions || '').trim(),
      drawingFile: storedFileName ? {
        originalName: drawingFileName,
        storedAs: storedFileName,
        sizeBytes: drawingFileSize,
        type: drawingFileType
      } : null,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'local',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'pending_review'
    };

    let quotes = [];
    try {
      quotes = JSON.parse(fs.readFileSync(QUOTES_FILE, 'utf8'));
    } catch {
      quotes = [];
    }
    quotes.unshift(newQuoteRecord);
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2), 'utf8');

    // Attempt SMTP Notification if configured
    let emailDispatched = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const targetEmail = process.env.NOTIFICATION_EMAIL || 'aanantenterprises03@gmail.com';
        const attachments = [];
        if (savedDrawingPath && fs.existsSync(savedDrawingPath)) {
          attachments.push({
            filename: drawingFileName,
            path: savedDrawingPath
          });
        }

        await transporter.sendMail({
          from: `"Aanant RFQ Portal" <${process.env.SMTP_USER}>`,
          to: targetEmail,
          replyTo: newQuoteRecord.email,
          subject: `[New RFQ ${referenceId}] ${newQuoteRecord.productName} - ${newQuoteRecord.customerName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
              <div style="border-bottom: 3px solid #FF6A00; padding-bottom: 12px; margin-bottom: 16px;">
                <h2 style="color: #172554; margin: 0 0 4px 0;">New Quotation Request (RFQ)</h2>
                <span style="color: #64748b; font-size: 13px;">Aanant Enterprises — Infinite Solutions</span>
              </div>
              <p><strong>Quotation Reference ID:</strong> <span style="font-family: monospace; font-size: 16px; color: #172554;">${referenceId}</span></p>
              <p><strong>Submitted Date:</strong> ${now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
                <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; width: 35%;">Customer Name</td><td style="padding: 8px;">${newQuoteRecord.customerName}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Company Name</td><td style="padding: 8px;">${newQuoteRecord.companyName || 'Not specified'}</td></tr>
                <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${newQuoteRecord.email}">${newQuoteRecord.email}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Mobile / WhatsApp</td><td style="padding: 8px;"><a href="tel:${newQuoteRecord.mobileNumber}">${newQuoteRecord.mobileNumber}</a></td></tr>
                <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Component Name</td><td style="padding: 8px; font-weight: bold; color: #172554;">${newQuoteRecord.productName}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Manufacturing Process</td><td style="padding: 8px;">${newQuoteRecord.manufacturingProcess}</td></tr>
                <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Material</td><td style="padding: 8px;">${newQuoteRecord.material || 'To be recommended / confirmed'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Required Quantity</td><td style="padding: 8px; font-weight: bold;">${newQuoteRecord.quantity}</td></tr>
                <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Approx Dimensions</td><td style="padding: 8px;">${newQuoteRecord.dimensions || 'Per drawings'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Required Delivery Date</td><td style="padding: 8px;">${newQuoteRecord.deliveryDate || 'Standard schedule'}</td></tr>
              </table>

              <div style="background-color: #f1f5f9; padding: 14px; border-radius: 6px; margin-top: 16px;">
                <strong>Manufacturing Requirement Details:</strong><br>
                <p style="white-space: pre-wrap; margin: 6px 0 0 0; color: #1e293b;">${newQuoteRecord.manufacturingRequirement}</p>
              </div>

              ${newQuoteRecord.additionalInstructions ? `
                <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; margin-top: 12px; border: 1px dashed #cbd5e1;">
                  <strong>Additional Instructions:</strong><br>
                  <p style="white-space: pre-wrap; margin: 6px 0 0 0;">${newQuoteRecord.additionalInstructions}</p>
                </div>
              ` : ''}

              ${storedFileName ? `<p style="margin-top: 15px; color: #0284c7;"><strong>Attached Drawing:</strong> ${drawingFileName} (Saved securely in RFQ records)</p>` : ''}
              
              <footer style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                Aanant Enterprises — Pandurang Industrial Area, Sinhgad Road, Pune – 411041<br>
                GSTIN: 27CMRPK4719F1ZP | aanantenterprises03@gmail.com
              </footer>
            </div>
          `,
          attachments
        });
        emailDispatched = true;
      } catch (err) {
        console.error('SMTP RFQ dispatch failed:', err);
      }
    }

    return res.status(201).json({
      success: true,
      referenceId,
      message: 'Your Request for Quotation (RFQ) has been successfully submitted to Aanant Enterprises.',
      storedLocally: true,
      emailDispatched
    });

  } catch (error) {
    console.error('Error handling quote RFQ:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your RFQ. Please reach out directly via phone or WhatsApp.'
    });
  }
});

// General contact enquiry endpoint
app.post('/api/enquiries', rateLimitMiddleware, async (req, res) => {
  try {
    const {
      fullName,
      companyName = '',
      email,
      phone,
      enquiryType,
      subject,
      message,
      consent,
      botCatch = ''
    } = req.body;

    if (botCatch && botCatch.trim() !== '') {
      return res.status(400).json({ success: false, error: 'Spam submission detected.' });
    }

    const errors = [];
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters).');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.push('A valid email address is required.');
    }
    const cleanPhone = (phone || '').replace(/[\s\-()]/g, '');
    if (!phone || typeof phone !== 'string' || !/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
      errors.push('A valid mobile number is required (10 to 15 digits).');
    }
    if (!enquiryType || typeof enquiryType !== 'string') {
      errors.push('Please select an enquiry type.');
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      errors.push('Subject is required (minimum 3 characters).');
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.push('Message is required (minimum 10 characters).');
    }
    if (consent !== true && consent !== 'true') {
      errors.push('You must consent to submit this enquiry.');
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: errors.join(' ') });
    }

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `AE-ENQ-${dateStr}-${randomSuffix}`;

    const newEnquiry = {
      referenceId,
      submittedAt: now.toISOString(),
      fullName: fullName.trim(),
      companyName: (companyName || '').trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      enquiryType: enquiryType.trim(),
      subject: subject.trim(),
      message: message.trim(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'local',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'received'
    };

    let enquiries = [];
    try {
      enquiries = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf8'));
    } catch {
      enquiries = [];
    }
    enquiries.unshift(newEnquiry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf8');

    let emailDispatched = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const targetEmail = process.env.NOTIFICATION_EMAIL || 'aanantenterprises03@gmail.com';

        await transporter.sendMail({
          from: `"Aanant Website" <${process.env.SMTP_USER}>`,
          to: targetEmail,
          replyTo: newEnquiry.email,
          subject: `[New Website Enquiry ${referenceId}] ${newEnquiry.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #172554; border-bottom: 2px solid #FF6A00; padding-bottom: 10px;">New Business Enquiry</h2>
              <p><strong>Reference ID:</strong> ${referenceId}</p>
              <p><strong>Date:</strong> ${now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
              <p><strong>Full Name:</strong> ${newEnquiry.fullName}</p>
              <p><strong>Company:</strong> ${newEnquiry.companyName || 'Not specified'}</p>
              <p><strong>Email:</strong> <a href="mailto:${newEnquiry.email}">${newEnquiry.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${newEnquiry.phone}">${newEnquiry.phone}</a></p>
              <p><strong>Enquiry Type:</strong> ${newEnquiry.enquiryType}</p>
              <p><strong>Subject:</strong> ${newEnquiry.subject}</p>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 10px;">
                <strong>Message:</strong><br>
                <p style="white-space: pre-wrap; margin-top: 5px;">${newEnquiry.message}</p>
              </div>
              <footer style="margin-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
                Aanant Enterprises — Infinite Solutions<br>
                Krushiraj Building, Sinhgad Road, Pune – 411041
              </footer>
            </div>
          `
        });
        emailDispatched = true;
      } catch (mailErr) {
        console.error('SMTP Email dispatch failed:', mailErr);
      }
    }

    return res.status(201).json({
      success: true,
      referenceId,
      message: 'Your enquiry has been successfully submitted and registered with Aanant Enterprises.',
      storedLocally: true,
      emailDispatched
    });

  } catch (error) {
    console.error('Error handling enquiry:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your enquiry. Please contact us via phone or WhatsApp.'
    });
  }
});

// Admin review endpoint (read stored enquiries and quotes)
app.get('/api/quotes', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(QUOTES_FILE, 'utf8'));
    res.json({ success: true, count: data.length, quotes: data });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not load quotes' });
  }
});

app.get('/api/enquiries', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf8'));
    res.json({ success: true, count: data.length, enquiries: data });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not load enquiries' });
  }
});

// Serve frontend dist in production if built
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Aanant Enterprises backend API running on port ${PORT}`);
});
