import React from 'react';
import { ArrowRight, Phone, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface BusinessEnquiryCTAProps {
  onNavigate: (page: string) => void;
}

export const BusinessEnquiryCTA: React.FC<BusinessEnquiryCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#0a0f1d] via-[#10182b] to-[#080c18] text-white border-y border-white/10">
      
      {/* Precision Industrial Ambient Grid and Glows */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-orange/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-brand-blue-electric/15 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/15 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Laser Line sweep accent at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-80" />

          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-orange/30 text-brand-orange text-xs font-mono font-semibold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              <span>Commercial & Industrial Partnership</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to Engineer Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-blue-electric">
                Next Custom Production Run?
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Whether you need single prototype validation, batch industrial signage, architectural partitions, or ongoing contract CNC milling, our engineers are ready with rapid quotation and DFMA guidance.
            </p>

            {/* Quick Action Matrix */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  onNavigate('custom-request');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 rounded-xl shadow-glow-orange hover:shadow-glow-orange/80 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-95"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${encodeURIComponent('Hello Aanant Enterprises, I would like to discuss an industrial fabrication project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl border border-white/15 transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Desk</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phones[0]}`}
                className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl border border-white/15 transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-brand-blue-electric" />
                <span>Direct Workshop Call</span>
              </a>
            </div>

            {/* Guarantees */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Dimensional Accuracy</span>
              </span>
              <span className="text-white/20">•</span>
              <span>Fast 24-48h Quote Turnaround</span>
              <span className="text-white/20">•</span>
              <span>Direct In-House Factory Machinery</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
