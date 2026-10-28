import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, UploadCloud, FileCheck, RefreshCw, MessageCircle, HelpCircle } from 'lucide-react';
import type { CustomProductFormData, SubmissionResponse, ProductItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { savePendingSubmission, isDeviceOnline } from '../utils/offlineQueue';

interface CustomProductFormProps {
  initialProduct?: ProductItem | null;
  onSuccess?: (refId: string) => void;
}

export const CustomProductForm: React.FC<CustomProductFormProps> = ({
  initialProduct = null,
  onSuccess
}) => {
  const getInitialWorkType = (): CustomProductFormData['typeOfWork'] => {
    if (!initialProduct) return 'Laser Engraving/Marking';
    if (initialProduct.category === 'Laser-Cut Designs' || initialProduct.category === 'Decorative Designs') {
      return 'Laser Cutting';
    }
    if (initialProduct.category === 'CNC-Cut Products') {
      return 'CNC Cutting';
    }
    if (initialProduct.category === 'Custom Components' || initialProduct.category === 'Other Customer-Specific Products') {
      return 'Custom Product Development';
    }
    return 'Laser Engraving/Marking';
  };

  const [formData, setFormData] = useState<CustomProductFormData>({
    customerName: '',
    companyName: '',
    mobileNumber: '',
    email: '',
    productName: initialProduct ? initialProduct.name : '',
    typeOfWork: getInitialWorkType(),
    material: initialProduct?.material && !initialProduct.material.includes('Contact us') ? initialProduct.material : '',
    productDimensions: initialProduct?.dimensions || '',
    quantity: '',
    designDescription: initialProduct ? `Requesting customisation for: ${initialProduct.name}.` : '',
    textToBeEngraved: '',
    logoOrArtwork: '',
    referenceImageFileName: '',
    referenceImageBase64: '',
    referenceImageSize: 0,
    technicalDrawingFileName: '',
    technicalDrawingBase64: '',
    technicalDrawingSize: 0,
    additionalRequirements: '',
    deliveryDate: '',
    consent: false,
    botCatch: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomProductFormData, string>>>({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState<SubmissionResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // File Upload Handlers
  const handleReferenceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
    const lowerName = file.name.toLowerCase();
    const isAllowed = allowed.some((ext) => lowerName.endsWith(ext));

    if (!isAllowed) {
      setFileError('Reference Image must be JPG, PNG, WEBP, or PDF.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setFileError('File size exceeds the 15MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        referenceImageFileName: file.name,
        referenceImageSize: file.size,
        referenceImageBase64: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrawingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['.pdf', '.dxf', '.dwg', '.step', '.stp', '.ai', '.eps', '.svg'];
    const lowerName = file.name.toLowerCase();
    const isAllowed = allowed.some((ext) => lowerName.endsWith(ext));

    if (!isAllowed) {
      setFileError('Technical Drawing must be PDF, DXF, DWG, STEP, AI, EPS, or SVG.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setFileError('File size exceeds the 15MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        technicalDrawingFileName: file.name,
        technicalDrawingSize: file.size,
        technicalDrawingBase64: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeReferenceImage = () => {
    setFormData((prev) => ({
      ...prev,
      referenceImageFileName: '',
      referenceImageSize: 0,
      referenceImageBase64: ''
    }));
  };

  const removeDrawing = () => {
    setFormData((prev) => ({
      ...prev,
      technicalDrawingFileName: '',
      technicalDrawingSize: 0,
      technicalDrawingBase64: ''
    }));
  };

  const validateField = (name: keyof CustomProductFormData, value: unknown): string => {
    switch (name) {
      case 'customerName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Customer Name is required (minimum 2 characters).';
        }
        return '';
      case 'mobileNumber':
        if (!value || typeof value !== 'string') return 'Mobile number is required.';
        // eslint-disable-next-line no-case-declarations
        const cleanPhone = value.replace(/[\s\-()]/g, '');
        if (!/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
          return 'Please enter a valid 10 to 15 digit mobile number.';
        }
        return '';
      case 'email':
        if (!value || typeof value !== 'string') return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      case 'productName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Product Name is required.';
        }
        return '';
      case 'quantity':
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
          return 'Required Quantity is required (e.g. 1 pc, 10 pcs, 50 pcs).';
        }
        return '';
      case 'designDescription':
        if (!value || typeof value !== 'string' || value.trim().length < 5) {
          return 'Please provide a design description (minimum 5 characters).';
        }
        return '';
      case 'consent':
        if (value !== true) {
          return 'You must give consent to submit your custom product request.';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));

    if (errors[name as keyof CustomProductFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: Partial<Record<keyof CustomProductFormData, string>> = {};
    const requiredFields: (keyof CustomProductFormData)[] = [
      'customerName',
      'mobileNumber',
      'email',
      'productName',
      'quantity',
      'designDescription',
      'consent'
    ];

    requiredFields.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const clientRefId = `AE-CUST-${dateStr}-${randSuffix}`;

    const payloadToSend = {
      ...formData,
      manufacturingProcess: formData.typeOfWork,
      manufacturingRequirement: `${formData.designDescription} ${
        formData.textToBeEngraved ? `\n[Text to Engrave: ${formData.textToBeEngraved}]` : ''
      } ${formData.logoOrArtwork ? `\n[Logo/Artwork: ${formData.logoOrArtwork}]` : ''}`,
      drawingFileName: formData.technicalDrawingFileName || formData.referenceImageFileName,
      drawingBase64: formData.technicalDrawingBase64 || formData.referenceImageBase64,
      drawingFileSize: formData.technicalDrawingSize || formData.referenceImageSize
    };

    if (!isDeviceOnline()) {
      savePendingSubmission('custom-request', '/api/quotes', payloadToSend as unknown as Record<string, unknown>);
      setSubmissionResponse({
        success: true,
        referenceId: clientRefId,
        message: 'Saved Offline! Your custom product request has been securely stored on your device and will be synced to our servers automatically when your connection is restored.',
        storedLocally: true
      });
      if (onSuccess) onSuccess(clientRefId);
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/quotes`
        : '/api/quotes';

      // Send payload to backend
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadToSend)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit custom request.');
      }

      // Persist in localStorage backup
      try {
        const localItems = JSON.parse(localStorage.getItem('aanant_custom_requests') || '[]');
        localItems.unshift({ ...formData, referenceId: data.referenceId, submittedAt: new Date().toISOString() });
        localStorage.setItem('aanant_custom_requests', JSON.stringify(localItems));
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }

      setSubmissionResponse(data);
      if (onSuccess && data.referenceId) onSuccess(data.referenceId);
    } catch (err: unknown) {
      console.warn('Backend unavailable, queueing locally:', err);
      try {
        savePendingSubmission('custom-request', '/api/quotes', payloadToSend as unknown as Record<string, unknown>);
        const localItems = JSON.parse(localStorage.getItem('aanant_custom_requests') || '[]');
        localItems.unshift({ ...formData, referenceId: clientRefId, submittedAt: new Date().toISOString(), offlineSaved: true });
        localStorage.setItem('aanant_custom_requests', JSON.stringify(localItems));

        setSubmissionResponse({
          success: true,
          referenceId: clientRefId,
          message: 'Saved to Offline Queue: Your custom product request is saved securely on your device and will be submitted automatically when your connection resumes.',
          storedLocally: true
        });
        if (onSuccess) onSuccess(clientRefId);
      } catch {
        const msg = err instanceof Error ? err.message : 'Submission failed. Please contact us via phone or WhatsApp.';
        setServerError(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      customerName: '',
      companyName: '',
      mobileNumber: '',
      email: '',
      productName: '',
      typeOfWork: 'Laser Engraving/Marking',
      material: '',
      productDimensions: '',
      quantity: '',
      designDescription: '',
      textToBeEngraved: '',
      logoOrArtwork: '',
      referenceImageFileName: '',
      referenceImageBase64: '',
      referenceImageSize: 0,
      technicalDrawingFileName: '',
      technicalDrawingBase64: '',
      technicalDrawingSize: 0,
      additionalRequirements: '',
      deliveryDate: '',
      consent: false,
      botCatch: ''
    });
    setSubmissionResponse(null);
    setErrors({});
    setFileError(null);
    setServerError(null);
  };

  const handleWhatsAppContact = () => {
    const ref = submissionResponse?.referenceId || '';
    const text = ref
      ? `Hello Aanant Enterprises, I submitted custom product request [${ref}] for ${formData.productName}. Please confirm receipt and let me know the details.`
      : `Hello Aanant Enterprises, I would like to enquire about a customised product. I have a design or specific requirement that I would like to discuss.`;
    window.open(`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (submissionResponse?.success) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-card border border-emerald-200 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-2">
          Custom Product Request Submitted!
        </h3>
        <p className="text-brand-text-muted mb-6 max-w-lg mx-auto text-sm leading-relaxed">
          Thank you for sharing your custom product idea with Aanant Enterprises. Our engineering and design team will review your requirements, artwork, and specifications, and contact you with feasibility and quotation details.
        </p>

        <div className="inline-block bg-brand-grey border border-brand-grey-border rounded-xl px-6 py-4 mb-6 text-sm">
          <span className="text-brand-text-muted font-bold block text-xs uppercase tracking-wider">
            Your Tracking Reference ID
          </span>
          <span className="font-mono font-black text-brand-navy text-xl sm:text-2xl mt-0.5 block">
            {submissionResponse.referenceId}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-6">
          <button
            onClick={handleWhatsAppContact}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Contact Us on WhatsApp</span>
          </button>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-brand-navy bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Create Another Custom Request</span>
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Please retain your Reference ID for follow-ups via phone (+91 7387417382) or WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl p-6 sm:p-10 shadow-card border border-brand-grey-border space-y-6">
      
      {/* Honeypot Spam Trap */}
      <input
        type="text"
        name="botCatch"
        value={formData.botCatch}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
          <div>{serverError}</div>
        </div>
      )}

      {/* Prominent Instruction Note */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
        <span className="font-medium">
          Please share your design, reference image, or drawing so our team can review your requirements.
        </span>
      </div>

      {/* Row 1: Customer Name & Company Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="e.g. Ramesh Kulkarni"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
              errors.customerName
                ? 'border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                : 'border-brand-grey-border focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10'
            }`}
          />
          {errors.customerName && <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Company Name (Optional)
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Acme Innovations Pvt Ltd"
            className="w-full px-4 py-2.5 rounded-xl border border-brand-grey-border text-sm focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 focus:outline-none"
          />
        </div>
      </div>

      {/* Row 2: Mobile Number & Email Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
              errors.mobileNumber
                ? 'border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                : 'border-brand-grey-border focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10'
            }`}
          />
          {errors.mobileNumber && <p className="text-xs text-red-600 mt-1">{errors.mobileNumber}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. yourname@gmail.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
              errors.email
                ? 'border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                : 'border-brand-grey-border focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Row 3: Product Name & Type of Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="e.g. Engraved Brass Nameplate / Cut Wall Sign"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
              errors.productName
                ? 'border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                : 'border-brand-grey-border focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10'
            }`}
          />
          {errors.productName && <p className="text-xs text-red-600 mt-1">{errors.productName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Type of Work <span className="text-red-500">*</span>
          </label>
          <select
            name="typeOfWork"
            value={formData.typeOfWork}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-grey-border text-sm focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 focus:outline-none bg-white font-medium"
          >
            <option value="Laser Engraving/Marking">Laser Engraving/Marking</option>
            <option value="Laser Cutting">Laser Cutting</option>
            <option value="CNC Cutting">CNC Cutting</option>
            <option value="Custom Product Development">Custom Product Development</option>
            <option value="Not Sure — Need Guidance">Not Sure — Need Guidance</option>
          </select>
        </div>
      </div>

      {/* Row 4: Material, Product Dimensions, Required Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Material (if known)
          </label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            placeholder="e.g. Brass / SS / Acrylic / Wood"
            className="w-full px-4 py-2.5 rounded-xl border border-brand-grey-border text-sm focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Product Dimensions
          </label>
          <input
            type="text"
            name="productDimensions"
            value={formData.productDimensions}
            onChange={handleChange}
            placeholder="e.g. 10 x 3 inches / 300 x 200 mm"
            className="w-full px-4 py-2.5 rounded-xl border border-brand-grey-border text-sm focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Required Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 1 piece / 25 pieces"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
              errors.quantity
                ? 'border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200'
                : 'border-brand-grey-border focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10'
            }`}
          />
          {errors.quantity && <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>}
        </div>
      </div>

      {/* Row 5: Design Description */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
          Design Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="designDescription"
          rows={3}
          value={formData.designDescription}
          onChange={handleChange}
          placeholder="Describe your design idea, placement, visual style, surface finish, or mounting requirements..."
          className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
            errors.designDescription
              ? 'border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200'
              : 'border-brand-grey-border focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10'
          }`}
        />
        {errors.designDescription && <p className="text-xs text-red-600 mt-1">{errors.designDescription}</p>}
      </div>

      {/* Row 6: Text to Be Engraved & Logo or Artwork Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Text to Be Engraved (if applicable)
          </label>
          <input
            type="text"
            name="textToBeEngraved"
            value={formData.textToBeEngraved}
            onChange={handleChange}
            placeholder="e.g. Dr. Rajesh Verma / Chief Architect"
            className="w-full px-4 py-2.5 rounded-xl border border-brand-grey-border text-sm focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Logo or Artwork Details (if applicable)
          </label>
          <input
            type="text"
            name="logoOrArtwork"
            value={formData.logoOrArtwork}
            onChange={handleChange}
            placeholder="e.g. Uploaded vector logo file / specific font"
            className="w-full px-4 py-2.5 rounded-xl border border-brand-grey-border text-sm focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 focus:outline-none"
          />
        </div>
      </div>

      {/* Row 7: File Uploads (Reference Image & Technical Drawing) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Upload Reference Image */}
        <div className="p-4 rounded-xl bg-brand-grey border border-brand-grey-border space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy">
            Upload Reference Image
          </label>

          {formData.referenceImageFileName ? (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-emerald-300">
              <div className="flex items-center gap-2 truncate">
                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold truncate">{formData.referenceImageFileName}</span>
              </div>
              <button
                type="button"
                onClick={removeReferenceImage}
                className="text-xs text-red-600 hover:text-red-800 font-bold ml-2"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 hover:border-brand-orange rounded-xl bg-white cursor-pointer transition-colors text-center">
              <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-brand-orange mb-1" />
              <span className="text-xs font-semibold text-brand-navy">Upload Reference Image</span>
              <span className="text-[10px] text-gray-500">JPG, PNG, WEBP, PDF (Max 15MB)</span>
              <input
                type="file"
                onChange={handleReferenceImageUpload}
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Upload Technical Drawing */}
        <div className="p-4 rounded-xl bg-brand-grey border border-brand-grey-border space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy">
            Upload Technical Drawing (if applicable)
          </label>

          {formData.technicalDrawingFileName ? (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-emerald-300">
              <div className="flex items-center gap-2 truncate">
                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold truncate">{formData.technicalDrawingFileName}</span>
              </div>
              <button
                type="button"
                onClick={removeDrawing}
                className="text-xs text-red-600 hover:text-red-800 font-bold ml-2"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 hover:border-brand-blue rounded-xl bg-white cursor-pointer transition-colors text-center">
              <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-brand-blue mb-1" />
              <span className="text-xs font-semibold text-brand-navy">Upload CAD / Vector Drawing</span>
              <span className="text-[10px] text-gray-500">PDF, DXF, DWG, STEP, AI, EPS, SVG (Max 15MB)</span>
              <input
                type="file"
                onChange={handleDrawingUpload}
                accept=".pdf,.dxf,.dwg,.step,.stp,.ai,.eps,.svg"
                className="hidden"
              />
            </label>
          )}
        </div>

      </div>

      {fileError && <p className="text-xs text-red-600">{fileError}</p>}

      {/* Row 8: Additional Requirements & Required Delivery Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Additional Requirements (Optional)
          </label>
          <input
            type="text"
            name="additionalRequirements"
            value={formData.additionalRequirements}
            onChange={handleChange}
            placeholder="e.g. Gift packaging / back-adhesive tape / wall mounts"
            className="w-full px-4 py-2.5 rounded-xl border border-brand-grey-border text-sm focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Required Delivery Date (Optional)
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-grey-border text-sm focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 focus:outline-none"
          />
        </div>
      </div>

      {/* Row 9: Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange mt-0.5"
          />
          <span className="text-xs text-brand-text-muted leading-relaxed">
            I confirm that the design and technical requirements submitted are authorized for custom manufacturing and review by Aanant Enterprises. All proprietary designs and artwork will remain strictly confidential. <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.consent && <p className="text-xs text-red-600 mt-1">{errors.consent}</p>}
      </div>

      {/* Action Buttons: Submit & WhatsApp */}
      <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
        
        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:flex-1 py-4 px-6 rounded-xl font-bold text-white gradient-orange-btn shadow-button hover:shadow-glow-orange transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Your Custom Request...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Custom Product Request</span>
            </>
          )}
        </button>

        {/* Contact Us on WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsAppContact}
          className="w-full sm:w-auto py-4 px-6 rounded-xl font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <span>Contact Us on WhatsApp</span>
        </button>

      </div>

    </form>
  );
};
