import React from 'react';
import { Shield, ArrowLeft, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Corporate Governance & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Privacy Policy
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
              <span>Introduction</span>
            </h2>
            <p>
              Aanant Enterprises ("we", "us", or "our"), operating from Krushiraj Building, Sinhgad Road, Pune – 411041, Maharashtra, India, is committed to safeguarding the privacy and confidentiality of personal and business information provided by visitors and prospective corporate clients who interact with our official website.
            </p>
            <p>
              This Privacy Policy explains how we collect, handle, store, and protect information in compliance with applicable Indian laws, including the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023.
            </p>
          </section>

          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">02.</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              We only collect information directly submitted by you when you use our business enquiry form, custom product configurator, or contact us via email, phone, or WhatsApp:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li><strong className="text-white">Contact Information:</strong> Full name, company name, email address, and mobile phone number.</li>
              <li><strong className="text-white">Manufacturing Specifics:</strong> Material choices, dimensional tolerances, quantity, process type, and technical drawings (DXF, DWG, STEP, PDF).</li>
              <li><strong className="text-white">Technical Metadata:</strong> Browser type and network timestamp to ensure secure submission integrity and prevent spam attacks.</li>
            </ul>
          </section>

          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">03.</span>
              <span>CAD Drawings & Intellectual Property Security</span>
            </h2>
            <p>
              All technical drawings, DXF/DWG vector files, and design specifications shared through our website are treated with strict industrial confidentiality. They are used exclusively by our engineering team for DFMA evaluation, machine toolpath generation, and price quotation. We never sell, license, or publish client proprietary designs.
            </p>
          </section>

          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">04.</span>
              <span>Direct WhatsApp & Third-Party Communication</span>
            </h2>
            <p>
              When initiating communication via our WhatsApp desk, your conversation is governed by WhatsApp's end-to-end encryption and terms. We do not transmit customer data to unvetted advertising third parties.
            </p>
          </section>

          <section className="space-y-4 pt-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-orange font-mono">05.</span>
              <span>Contact Our Privacy Desk</span>
            </h2>
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.landmark}, {COMPANY_INFO.address.city} – {COMPANY_INFO.address.pincode}</span>
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
