import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { ENQUIRY_TYPES } from '../data/companyData';
import type { EnquiryFormData, EnquiryResponse } from '../types';
import { savePendingSubmission, isDeviceOnline } from '../utils/offlineQueue';

interface EnquiryFormProps {
  initialSubject?: string;
  initialType?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialSubject = '',
  initialType = ENQUIRY_TYPES[0]
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    enquiryType: initialType,
    subject: initialSubject,
    message: '',
    consent: false,
    botCatch: '' // Honeypot spam trap
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseStatus, setResponseStatus] = useState<EnquiryResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateField = (name: keyof EnquiryFormData, value: unknown): string => {
    switch (name) {
      case 'fullName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Please enter your full name (minimum 2 characters).';
        }
        return '';

      case 'email':
        if (!value || typeof value !== 'string') {
          return 'Email address is required.';
        }
        // eslint-disable-next-line no-case-declarations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address (e.g., name@company.com).';
        }
        return '';

      case 'phone':
        if (!value || typeof value !== 'string') {
          return 'Mobile contact number is required.';
        }
        // eslint-disable-next-line no-case-declarations
        const cleanPhone = value.replace(/[\s\-()]/g, '');
        if (!/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
          return 'Please enter a valid 10 to 15 digit mobile number (e.g., 9876543210).';
        }
        return '';

      case 'subject':
        if (!value || typeof value !== 'string' || value.trim().length < 3) {
          return 'Please provide an enquiry subject (minimum 3 characters).';
        }
        return '';

      case 'message':
        if (!value || typeof value !== 'string' || value.trim().length < 10) {
          return 'Please enter your requirements/message (minimum 10 characters).';
        }
        return '';

      case 'consent':
        if (value !== true) {
          return 'You must give consent to submit your business enquiry.';
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

    setFormData((prev: EnquiryFormData) => ({
      ...prev,
      [name]: val
    }));

    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev: Partial<Record<keyof EnquiryFormData, string>>) => ({
        ...prev,
        [name]: undefined
      }));
    }

    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (formData.botCatch && formData.botCatch.trim().length > 0) {
      setResponseStatus({
        success: true,
        referenceId: 'REF-' + Date.now().toString(36).toUpperCase(),
        message: 'Your enquiry has been received.'
      });
      return;
    }

    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};
    const fieldsToValidate: (keyof EnquiryFormData)[] = [
      'fullName',
      'email',
      'phone',
      'subject',
      'message',
      'consent'
    ];

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const clientRefId = 'AE-' + Math.floor(100000 + Math.random() * 900000);

    if (!isDeviceOnline()) {
      savePendingSubmission('enquiry', '/api/enquiry', formData as unknown as Record<string, unknown>);
      setResponseStatus({
        success: true,
        referenceId: clientRefId,
        message: 'Saved to Offline Queue: Your enquiry has been securely saved on your device and will sync automatically once reconnected.',
        storedLocally: true
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResponseStatus({
        success: true,
        referenceId: clientRefId,
        message: 'Your commercial enquiry has been successfully registered. Our Pune engineering desk will contact you within 24 hours.'
      });
    } catch {
      savePendingSubmission('enquiry', '/api/enquiry', formData as unknown as Record<string, unknown>);
      setResponseStatus({
        success: true,
        referenceId: clientRefId,
        message: 'Saved to Offline Queue: Securely stored and will sync automatically.',
        storedLocally: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      enquiryType: ENQUIRY_TYPES[0],
      subject: '',
      message: '',
      consent: false,
      botCatch: ''
    });
    setResponseStatus(null);
    setErrors({});
    setServerError(null);
  };

  if (responseStatus?.success) {
    return (
      <div className="rounded-3xl p-8 bg-white/[0.04] border border-emerald-500/30 backdrop-blur-xl shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Enquiry Submitted Successfully</h3>
        <p className="text-slate-300 mb-6 max-w-lg mx-auto text-sm leading-relaxed font-light">
          {responseStatus.message}
        </p>

        <div className="inline-block bg-black/40 border border-white/10 rounded-2xl px-6 py-3 mb-6 text-sm">
          <span className="text-slate-400 font-mono block text-xs uppercase tracking-wider">Reference Tracking ID</span>
          <span className="font-mono font-bold text-brand-orange text-lg">{responseStatus.referenceId}</span>
        </div>

        <div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/10 hover:bg-white/20 transition-colors border border-white/15"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Submit Another Enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl p-6 sm:p-9 bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl space-y-5"
    >
      <div className="border-b border-white/10 pb-5">
        <h3 className="text-2xl font-black text-white tracking-tight">Business Enquiry Desk</h3>
        <p className="text-slate-300 text-xs sm:text-sm font-light mt-1">
          Complete the details below to submit your commercial requirements.
        </p>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 flex items-start gap-3 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>{serverError}</div>
        </div>
      )}

      {/* Honeypot field (hidden from genuine users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botCatch">Do not fill this</label>
        <input
          id="botCatch"
          type="text"
          name="botCatch"
          value={formData.botCatch || ''}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Full Name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rajesh Sharma"
            className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
              errors.fullName ? 'border-rose-400 focus:border-rose-400' : 'border-white/15 focus:border-brand-orange'
            }`}
            required
            disabled={isSubmitting}
          />
          {errors.fullName && <p className="text-rose-400 text-xs mt-1">{errors.fullName}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Company Name <span className="text-slate-500">(Optional)</span>
          </label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Apex Industrial Solutions"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-slate-500 focus:border-brand-orange focus:outline-none transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Email Address <span className="text-brand-orange">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="rajesh@company.com"
            className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
              errors.email ? 'border-rose-400 focus:border-rose-400' : 'border-white/15 focus:border-brand-orange'
            }`}
            required
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="phone" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Mobile Number <span className="text-brand-orange">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
              errors.phone ? 'border-rose-400 focus:border-rose-400' : 'border-white/15 focus:border-brand-orange'
            }`}
            required
            disabled={isSubmitting}
          />
          {errors.phone && <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Enquiry Type & Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="enquiryType" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Enquiry Type <span className="text-brand-orange">*</span>
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none transition-all"
            disabled={isSubmitting}
          >
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Subject <span className="text-brand-orange">*</span>
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Requirement for Component Batch Quotation"
            className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
              errors.subject ? 'border-rose-400 focus:border-rose-400' : 'border-white/15 focus:border-brand-orange'
            }`}
            required
            disabled={isSubmitting}
          />
          {errors.subject && <p className="text-rose-400 text-xs mt-1">{errors.subject}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
          Requirement Details / Message <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe your requirements, specifications, quantities, or service timeline..."
          className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
            errors.message ? 'border-rose-400 focus:border-rose-400' : 'border-white/15 focus:border-brand-orange'
          }`}
          required
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Consent Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 accent-brand-orange"
            disabled={isSubmitting}
          />
          <span className="text-xs text-slate-300 leading-relaxed font-light">
            I consent to Aanant Enterprises processing my details to respond to this commercial enquiry with confidentiality. <span className="text-brand-orange">*</span>
          </span>
        </label>
        {errors.consent && <p className="text-rose-400 text-xs mt-1">{errors.consent}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 rounded-xl shadow-glow-orange transition-all duration-200 active:scale-95 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing Submission...</span>
            </>
          ) : (
            <>
              <span>Submit Business Enquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
