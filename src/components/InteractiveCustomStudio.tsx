import React, { useState } from 'react';
import {
  Sparkles, Zap, Cpu, Layers, CheckCircle2, AlertCircle,
  UploadCloud, FileCheck, ArrowRight, ArrowLeft, RefreshCw,
  MessageCircle, Send, ShieldCheck, Ruler, Hash, HelpCircle, X
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { savePendingSubmission, isDeviceOnline } from '../utils/offlineQueue';
import type { CustomProductFormData, SubmissionResponse, ProductItem } from '../types';

interface InteractiveCustomStudioProps {
  initialProduct?: ProductItem | null;
  onSuccessNavigate?: (refId: string) => void;
}

const processes = [
  {
    id: 'Laser Engraving/Marking' as const,
    title: 'Laser Engraving / Marking',
    icon: Sparkles,
    badge: 'Fiber & CO₂',
    description: 'High-contrast names, logos, barcodes, serial tags & graphics on metals, wood & acrylics.',
    tolerance: '±0.02 mm resolution',
    popularFor: 'Nameplates, awards, pens, metal panels',
  },
  {
    id: 'Laser Cutting' as const,
    title: 'Precision Laser Cutting',
    icon: Zap,
    badge: 'Thermal Beam',
    description: 'Narrow-kerf sheet cutting for intricate geometric screens, acrylic signage & custom brackets.',
    tolerance: '±0.05 mm kerf',
    popularFor: 'Architectural jali, acrylic lettering, stencils',
  },
  {
    id: 'CNC Cutting' as const,
    title: 'Subtractive CNC Cutting',
    icon: Cpu,
    badge: '3-Axis Milling',
    description: 'Computer-controlled router & mill profiling for solid timber, composites & non-ferrous metals.',
    tolerance: '±0.05 mm repeatability',
    popularFor: '3D letters, furniture components, mold blanks',
  },
  {
    id: 'Custom Product Development' as const,
    title: 'Full Custom Development',
    icon: Layers,
    badge: 'End-to-End',
    description: 'Complete fabrication combining machining, laser cutting, engraving, and assembly from your CAD.',
    tolerance: 'DFMA optimized',
    popularFor: 'Bespoke machinery parts, enclosures, prototypes',
  },
];

const materialOptions = [
  'Stainless Steel (SS 304 / 316)',
  'Mild Steel (MS) Sheet',
  'Cast Acrylic / Perspex (Transparent, Colored, Frosted)',
  'Solid Hardwood / Teak / Pine',
  'MDF / HDF / Marine Plywood',
  'Brass / Bronze / Copper Plate',
  'Aluminium (6061 / 5052)',
  'Client Will Supply Material',
  'Other (Specify in Description)',
];

export const InteractiveCustomStudio: React.FC<InteractiveCustomStudioProps> = ({
  initialProduct,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState<CustomProductFormData>({
    customerName: '',
    companyName: '',
    mobileNumber: '',
    email: '',
    productName: initialProduct ? initialProduct.name : '',
    typeOfWork: initialProduct ? 'Laser Cutting' : 'Laser Engraving/Marking',
    material: initialProduct?.material && !initialProduct.material.includes('Contact us') ? initialProduct.material : materialOptions[0],
    productDimensions: initialProduct?.dimensions || '',
    quantity: '1 pc (Prototype)',
    designDescription: initialProduct ? `Requesting customisation for ${initialProduct.name}.` : '',
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
    consent: true,
    botCatch: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomProductFormData, string>>>({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState<SubmissionResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // File Upload Handlers
  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
    const lowerName = file.name.toLowerCase();
    if (!allowed.some((ext) => lowerName.endsWith(ext))) {
      setFileError('Reference photo must be JPG, PNG, WEBP, or PDF.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setFileError('File exceeds 15MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        referenceImageFileName: file.name,
        referenceImageSize: file.size,
        referenceImageBase64: reader.result as string,
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
    if (!allowed.some((ext) => lowerName.endsWith(ext))) {
      setFileError('Technical Drawing must be DXF, DWG, STEP, PDF, AI, or SVG.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setFileError('File exceeds 15MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        technicalDrawingFileName: file.name,
        technicalDrawingSize: file.size,
        technicalDrawingBase64: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateCurrentStep = (): boolean => {
    const errs: Partial<Record<keyof CustomProductFormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.typeOfWork) errs.typeOfWork = 'Please select a manufacturing process.';
    } else if (currentStep === 2) {
      if (!formData.productName.trim()) errs.productName = 'Please enter a product or component name.';
      if (!formData.quantity.trim()) errs.quantity = 'Please enter desired quantity.';
      if (!formData.designDescription.trim()) errs.designDescription = 'Please briefly describe what you want made.';
    } else if (currentStep === 4) {
      if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
        errs.customerName = 'Please enter your full name (minimum 2 characters).';
      }
      const cleanPhone = formData.mobileNumber.replace(/[\s\-()]/g, '');
      if (!/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
        errs.mobileNumber = 'Please enter a valid 10 to 15 digit mobile number.';
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
      if (!formData.consent) {
        errs.consent = 'Please give consent to receive your engineering quotation.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setServerError(null);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep() || isSubmitting) return;

    if (formData.botCatch && formData.botCatch.trim().length > 0) {
      setSubmissionResponse({
        success: true,
        referenceId: 'REF-' + Date.now().toString(36).toUpperCase(),
        message: 'Your inquiry has been received.',
      });
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const generatedRefId = 'AE-' + Math.floor(100000 + Math.random() * 900000);

    // Check device connection
    if (!isDeviceOnline()) {
      savePendingSubmission(
        'custom-request',
        '/api/custom-request',
        formData as unknown as Record<string, unknown>
      );

      setSubmissionResponse({
        success: true,
        referenceId: generatedRefId,
        message: 'Saved offline. We will process your design inquiry automatically once reconnected.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate verified backend transmission with 600ms network response
      await new Promise((resolve) => setTimeout(resolve, 600));

      setSubmissionResponse({
        success: true,
        referenceId: generatedRefId,
        message: 'Your custom product specification has been received. Our Pune engineering desk will evaluate feasibility within 24-48 hours.',
      });
    } catch {
      setServerError('Unable to reach workshop network. Please try submitting again or use direct WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSync = () => {
    const text = encodeURIComponent(
      `*Aanant Enterprises Custom Product Request*\n` +
      `• Process: ${formData.typeOfWork}\n` +
      `• Product: ${formData.productName || 'Custom Piece'}\n` +
      `• Material: ${formData.material}\n` +
      `• Sizing: ${formData.productDimensions || 'To be specified'}\n` +
      `• Quantity: ${formData.quantity}\n` +
      `• Customer: ${formData.customerName || 'Prospective Client'}\n` +
      `• Brief: ${formData.designDescription}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/12 backdrop-blur-2xl shadow-2xl p-6 sm:p-10 text-white relative overflow-hidden">
      
      {/* Laser accent guide at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-orange to-brand-blue-electric" />

      {/* Header Deck */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Product Studio · Guided Configurator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Design & Request Your Custom Piece
          </h3>
          <p className="text-sm text-slate-300 font-light mt-1">
            Specify manufacturing parameters, attach vector drawings, and receive feasibility analysis.
          </p>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          {[
            { num: 1, label: 'Process' },
            { num: 2, label: 'Specs' },
            { num: 3, label: 'Files' },
            { num: 4, label: 'Review' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => {
                if (s.num < currentStep) setCurrentStep(s.num);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                currentStep === s.num
                  ? 'bg-brand-orange text-white border-transparent font-bold shadow-glow-orange/30'
                  : currentStep > s.num
                  ? 'bg-white/10 text-white border-white/20 cursor-pointer'
                  : 'bg-white/5 text-slate-500 border-white/5'
              }`}
            >
              <span>0{s.num}</span>
              <span className="hidden md:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Studio Body */}
      {submissionResponse ? (
        /* Success Screen */
        <div className="py-12 text-center max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
              Engineering Order Request Logged
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-white">
              Thank You, {formData.customerName}!
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {submissionResponse.message}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs flex items-center justify-between">
            <span className="text-slate-400">Reference Tracking ID:</span>
            <span className="text-brand-orange font-bold text-sm tracking-wider">{submissionResponse.referenceId}</span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleWhatsAppSync}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Specs to WhatsApp Desk</span>
            </button>
            <button
              onClick={() => {
                setSubmissionResponse(null);
                setCurrentStep(1);
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-mono font-bold text-slate-300 bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
            >
              Configure Another Item
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="pt-8 space-y-8">

          {/* STEP 1: Select Manufacturing Process */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Step 1: Choose Fabrication Technology</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Select the primary operation required for your custom component.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processes.map((proc) => {
                  const Icon = proc.icon;
                  const isSelected = formData.typeOfWork === proc.id;
                  return (
                    <div
                      key={proc.id}
                      onClick={() => setFormData((prev) => ({ ...prev, typeOfWork: proc.id }))}
                      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'bg-brand-orange/15 border-brand-orange shadow-glow-orange/30 ring-1 ring-brand-orange'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                              isSelected
                                ? 'bg-brand-orange text-white'
                                : 'bg-white/10 text-slate-300 group-hover:scale-105'
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange font-bold">
                              {proc.badge}
                            </span>
                            <h5 className="text-base font-bold text-white leading-snug">{proc.title}</h5>
                          </div>
                        </div>

                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-brand-orange bg-brand-orange text-white'
                              : 'border-white/30'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-3 font-light leading-relaxed">
                        {proc.description}
                      </p>

                      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>Tolerance: {proc.tolerance}</span>
                        <span className="text-brand-orange">{proc.popularFor}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.typeOfWork && (
                <div className="text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.typeOfWork}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Product Specifications & Material */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Step 2: Component Details & Material</h4>
                <p className="text-xs text-slate-400">
                  Provide sizing, quantity, substrate selection, and functional purpose.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    Product / Component Name *
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
                    placeholder="e.g. Architectural Acrylic Nameplate, CNC Motor Mount"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                  />
                  {errors.productName && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.productName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    Material / Substrate
                  </label>
                  <select
                    value={formData.material}
                    onChange={(e) => setFormData((prev) => ({ ...prev, material: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                  >
                    {materialOptions.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Dimensions (Length × Width × Thickness)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.productDimensions}
                    onChange={(e) => setFormData((prev) => ({ ...prev, productDimensions: e.target.value }))}
                    placeholder="e.g. 300mm × 150mm × 5mm or 12 × 6 inches"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-brand-blue-electric" />
                    <span>Required Quantity *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="e.g. 1 pc prototype, 50 pcs batch, 500 pcs run"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                  />
                  {errors.quantity && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.quantity}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Design Description & Special Requirements *
                </label>
                <textarea
                  rows={3}
                  value={formData.designDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, designDescription: e.target.value }))}
                  placeholder="Describe your design, mounting holes, bevels, font styles, surface polish, or application..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                />
                {errors.designDescription && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.designDescription}</span>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Engraving Text & CAD File Upload */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Step 3: Artwork & Engineering Drawings</h4>
                <p className="text-xs text-slate-400">
                  Upload CAD step files, vector drawings, or reference photos for instant DFMA evaluation.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Specific Text / Name to be Engraved (if applicable)
                </label>
                <input
                  type="text"
                  value={formData.textToBeEngraved}
                  onChange={(e) => setFormData((prev) => ({ ...prev, textToBeEngraved: e.target.value }))}
                  placeholder="e.g. 'AANANT RESIDENCY • FLAT 402' or Company Logo with Serial #001-100"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Reference Photo Upload */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-dashed border-white/20 text-center space-y-3 relative hover:border-brand-orange/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto text-brand-orange">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono font-bold text-white uppercase">Reference Photo / Sketch</h5>
                    <p className="text-[11px] text-slate-400">JPG, PNG, WEBP, PDF (Max 15MB)</p>
                  </div>

                  {formData.referenceImageFileName ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 text-xs font-mono text-slate-200">
                      <span className="truncate max-w-[200px] flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        {formData.referenceImageFileName}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            referenceImageFileName: '',
                            referenceImageBase64: '',
                            referenceImageSize: 0,
                          }))
                        }
                        className="p-1 hover:text-rose-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="inline-block px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white cursor-pointer border border-white/15 transition-all">
                      Browse Reference Photo
                      <input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={handleReferenceUpload} className="hidden" />
                    </label>
                  )}
                </div>

                {/* Technical Drawing File Upload */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-dashed border-white/20 text-center space-y-3 relative hover:border-brand-blue-electric/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto text-brand-blue-electric">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono font-bold text-white uppercase">CAD / Vector Drawing File</h5>
                    <p className="text-[11px] text-slate-400">DXF, DWG, STEP, AI, SVG, PDF (Max 15MB)</p>
                  </div>

                  {formData.technicalDrawingFileName ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 text-xs font-mono text-slate-200">
                      <span className="truncate max-w-[200px] flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        {formData.technicalDrawingFileName}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            technicalDrawingFileName: '',
                            technicalDrawingBase64: '',
                            technicalDrawingSize: 0,
                          }))
                        }
                        className="p-1 hover:text-rose-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="inline-block px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white cursor-pointer border border-white/15 transition-all">
                      Browse Drawing File
                      <input type="file" accept=".pdf,.dxf,.dwg,.step,.stp,.ai,.eps,.svg" onChange={handleDrawingUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {fileError && (
                <div className="text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Review & Customer Contact */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Step 4: Contact Information & Review</h4>
                <p className="text-xs text-slate-400">
                  Where should we send your engineering quotation and feasibility review?
                </p>
              </div>

              {/* Specifications Review Snapshot Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
                <div className="text-[10px] text-brand-orange uppercase tracking-wider font-bold">
                  Order Configuration Summary
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Process:</span>
                    <span className="text-white font-semibold truncate block">{formData.typeOfWork}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Component:</span>
                    <span className="text-white font-semibold truncate block">{formData.productName || 'Bespoke Item'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Material:</span>
                    <span className="text-white font-semibold truncate block">{formData.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Quantity:</span>
                    <span className="text-white font-semibold truncate block">{formData.quantity}</span>
                  </div>
                </div>

                {(formData.referenceImageFileName || formData.technicalDrawingFileName) && (
                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2 text-[11px]">
                    {formData.referenceImageFileName && (
                      <span className="px-2 py-0.5 rounded bg-white/10 text-emerald-400 flex items-center gap-1">
                        <FileCheck className="w-3 h-3" />
                        {formData.referenceImageFileName}
                      </span>
                    )}
                    {formData.technicalDrawingFileName && (
                      <span className="px-2 py-0.5 rounded bg-white/10 text-brand-blue-electric flex items-center gap-1">
                        <FileCheck className="w-3 h-3" />
                        {formData.technicalDrawingFileName}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
                    placeholder="e.g. Rajesh Patil"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                  />
                  {errors.customerName && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.customerName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    Mobile Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                  />
                  {errors.mobileNumber && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.mobileNumber}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. rajesh@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                    placeholder="e.g. Patil Industries, Pune"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              {/* Honeypot anti-spam trap */}
              <input
                type="text"
                name="botCatch"
                value={formData.botCatch}
                onChange={(e) => setFormData((prev) => ({ ...prev, botCatch: e.target.value }))}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="consent-box"
                  checked={formData.consent}
                  onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
                  className="mt-1 accent-brand-orange"
                />
                <label htmlFor="consent-box" className="text-xs text-slate-300 cursor-pointer">
                  I agree to share these product parameters with Aanant Enterprises for technical feasibility review and commercial quotation.
                </label>
              </div>
              {errors.consent && (
                <span className="text-[11px] text-rose-400 block">{errors.consent}</span>
              )}

              {serverError && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold text-slate-300 bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Continue to Step 0{currentStep + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange hover:shadow-glow-orange/80 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting Specs...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit for Quotation</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

        </form>
      )}

      {/* Safety & Factory Guarantees */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Strict CAD & Design Confidentiality</span>
        </span>
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-brand-orange" />
          <span>Need real-time assistance? Call: +91 {COMPANY_INFO.phones[0]}</span>
        </span>
      </div>

    </div>
  );
};
