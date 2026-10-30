import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Clock, Building2, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { EnquiryForm } from './EnquiryForm';
import { RealisticDiya, RangoliCornerPattern } from './DiwaliFestiveDecor';

interface ContactSectionProps {
  initialSubject?: string;
  initialType?: string;
  isStandalonePage?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialSubject,
  initialType,
  isStandalonePage = false
}) => {
  return (
    <section className={`py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-[#090d16]/70 via-[#0d1322]/50 to-[#070a10]/70 text-slate-100 border-t border-white/10 relative overflow-hidden ${isStandalonePage ? 'pt-8 sm:pt-10' : ''}`} id="contact-section">
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <RangoliCornerPattern className="hidden lg:block absolute bottom-0 left-0 z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2.5">
            <RealisticDiya size={26} className="shrink-0 -mt-1 hidden sm:inline-flex" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Workshop Connect • Diwali 2026</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Aanant Enterprises
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Reach out directly for quotations, feasibility reviews, or technical drawing consultation. Our Pune engineering desk is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* SECTION A: Company Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl p-6 sm:p-8 bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
              
              <div className="border-b border-white/10 pb-5">
                <h3 className="text-xl font-bold text-white">Workshop & Office Coordinates</h3>
                <p className="text-xs text-brand-orange font-mono font-bold uppercase tracking-wider mt-0.5">
                  Aanant Enterprises — {COMPANY_INFO.tagline}
                </p>
              </div>

              {/* Business Address Card */}
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-bold text-white mb-1">Registered & Operational Workshop</h4>
                    <p className="text-slate-300 font-light leading-relaxed">
                      {COMPANY_INFO.address.line1},<br />
                      {COMPANY_INFO.address.line2},<br />
                      {COMPANY_INFO.address.landmark}, {COMPANY_INFO.address.area},<br />
                      {COMPANY_INFO.address.city} – {COMPANY_INFO.address.pincode},<br />
                      {COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}.
                    </p>

                    <a
                      href={COMPANY_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/10 hover:bg-white/20 transition-all border border-white/15"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-brand-orange" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Phone Numbers */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-electric/15 border border-brand-blue-electric/30 flex items-center justify-center text-brand-blue-electric shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-bold text-white mb-1">Direct Helplines</h4>
                    <div className="flex flex-col gap-1">
                      <a
                        href={`tel:${COMPANY_INFO.phones[0]}`}
                        className="font-mono text-slate-200 hover:text-brand-orange transition-colors"
                      >
                        +91 {COMPANY_INFO.phones[0]}
                      </a>
                      <a
                        href={`tel:${COMPANY_INFO.phones[1]}`}
                        className="font-mono text-slate-200 hover:text-brand-orange transition-colors"
                      >
                        +91 {COMPANY_INFO.phones[1]}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-bold text-white mb-1">Official Engineering Email</h4>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="font-mono text-slate-200 hover:text-brand-orange transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* GST Identification */}
              <div className="pt-4 border-t border-white/10">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-xs font-mono">
                    <span className="text-slate-400 block text-[10px]">GSTIN Verified Enterprise</span>
                    <span className="text-white font-bold text-sm tracking-wider">{COMPANY_INFO.gstin}</span>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="pt-2 flex items-start gap-3 text-xs text-slate-400 font-light">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>
                  Hours: Monday – Saturday (9:30 AM to 6:30 PM IST). Submissions received outside hours are evaluated next business morning.
                </span>
              </div>

            </div>

            {/* Industrial Hub Badge Card */}
            <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-orange shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Pandurang Industrial Area Hub</p>
                <p className="text-slate-400 font-light">Directly accessible via Sinhgad Road & Nanded Phata, Pune, Maharashtra.</p>
              </div>
            </div>

          </div>

          {/* SECTION B: Business Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm
              initialSubject={initialSubject}
              initialType={initialType}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
