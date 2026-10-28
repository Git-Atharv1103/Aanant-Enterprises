import React from 'react';
import { CustomProductForm } from '../components/CustomProductForm';
import { ShieldCheck, Clock, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import type { ProductItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface QuotePageProps {
  initialProduct?: ProductItem | null;
}

export const QuotePage: React.FC<QuotePageProps> = ({ initialProduct }) => {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen text-brand-text">
      
      {/* Page Header */}
      <div className="bg-brand-navy-deep text-white py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider">
            Commercial & Engineering Quotations
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Request a Manufacturing Quote (RFQ)
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Submit your component drawings, required quantities, and material specifications. We provide a transparent commercial quotation and feasibility evaluation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: RFQ Form (8 cols) */}
          <div className="lg:col-span-8">
            <CustomProductForm initialProduct={initialProduct} />
          </div>

          {/* Right Column: B2B Assurance & Direct Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Drawing Privacy & Confidentiality Card */}
            <div className="bg-white rounded-2xl p-6 border border-brand-grey-border shadow-card space-y-4">
              <div className="flex items-center gap-3 border-b border-brand-grey-border pb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-navy">Drawing Confidentiality</h3>
                  <p className="text-xs text-brand-orange font-bold uppercase">Strict B2B Protection</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Customer 2D prints and 3D CAD files are used solely for quoting and manufacturing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Non-disclosure agreements (NDAs) supported for proprietary engineering projects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>All uploaded CAD files (DXF, DWG, STEP, PDF) are stored securely.</span>
                </li>
              </ul>
            </div>

            {/* Quick Process Card */}
            <div className="bg-white rounded-2xl p-6 border border-brand-grey-border shadow-card space-y-4">
              <div className="flex items-center gap-3 border-b border-brand-grey-border pb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-navy">Quotation Timeline</h3>
                  <p className="text-xs text-brand-blue font-bold uppercase">Prompt Review</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                Most RFQs with complete dimensional drawings and specified quantities receive a structured quotation breakdown within 24–48 business hours.
              </p>

              <div className="p-3 bg-brand-grey rounded-xl text-xs text-brand-navy font-mono">
                Operating Hours: Mon – Sat (9:30 AM – 6:30 PM IST)
              </div>
            </div>

            {/* Need Direct Assistance Box */}
            <div className="bg-brand-navy-deep text-white rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white">Prefer Direct Discussion?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                For urgent RFQs, high-volume production schedules, or technical drawing questions, call or WhatsApp our team directly:
              </p>

              <div className="space-y-2 pt-1 text-sm font-semibold">
                <a
                  href={`tel:${COMPANY_INFO.phones[0]}`}
                  className="flex items-center gap-2.5 text-blue-200 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>{COMPANY_INFO.phones[0]}</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phones[1]}`}
                  className="flex items-center gap-2.5 text-blue-200 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>{COMPANY_INFO.phones[1]}</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${encodeURIComponent('Hello Aanant Enterprises, I would like to request an urgent manufacturing quotation for CNC machining or laser cutting.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Direct Inquiry</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
