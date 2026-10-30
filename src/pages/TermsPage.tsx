import React from 'react';
import { FileText, ArrowLeft, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-6 sm:pt-8 pb-12 bg-gradient-to-b from-[#090d16] via-[#0d1322] to-[#070a10] min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-orange hover:text-amber-300 transition-colors mb-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Page Title Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl mb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Commercial Terms & Policies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Last Updated: October 2026 • Aanant Enterprises, Pune, Maharashtra, India
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl space-y-8 text-sm sm:text-base leading-relaxed text-slate-300 font-light">
          
          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">01.</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By accessing and using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use this website.
            </p>
          </section>

          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">02.</span>
              <span>Nature of Website & Commercial Feasibility</span>
            </h2>
            <p>
              This website is published by Aanant Enterprises for corporate communication and custom product design requests. Submitting an inquiry or technical drawing through the Custom Product Studio initiates a feasibility review and quote estimate, but does not constitute a formal procurement agreement until purchase specifications and drawings are approved by both parties.
            </p>
          </section>

          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">03.</span>
              <span>Machining Tolerances & Quality Standards</span>
            </h2>
            <p>
              Laser engraving, laser cutting, and CNC cutting are manufactured according to customer-supplied DXF, DWG, STEP, or vector drawing dimensions. Standard linear tolerances are maintained up to ±0.05 mm unless explicit custom tolerances are agreed upon in writing.
            </p>
          </section>

          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">04.</span>
              <span>Customer Artwork & Trademarks</span>
            </h2>
            <p>
              When requesting engraving or cutting of logos, brand emblems, or trademarked designs, the customer warrants that they possess lawful authorization or ownership of the intellectual property. Aanant Enterprises reserves the right to decline fabrication of unauthorized or unlawful materials.
            </p>
          </section>

          <section className="space-y-4 pt-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">05.</span>
              <span>Workshop Inquiries & Contact</span>
            </h2>
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.area}, {COMPANY_INFO.address.city} – {COMPANY_INFO.address.pincode}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-brand-blue-electric shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
