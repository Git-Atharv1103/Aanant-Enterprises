import React from 'react';
import { InteractiveCustomStudio } from '../components/InteractiveCustomStudio';
import { Sparkles, ShieldCheck, Phone, MessageCircle, CheckCircle2, Cpu } from 'lucide-react';
import type { ProductItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface CustomProductPageProps {
  initialProduct?: ProductItem | null;
}

export const CustomProductPage: React.FC<CustomProductPageProps> = ({ initialProduct }) => {
  return (
    <div className="pt-24 pb-24 bg-gradient-to-b from-[#090d16] via-[#0d1322] to-[#070a10] min-h-screen text-slate-100">
      
      {/* Editorial Page Header */}
      <div className="relative py-16 sm:py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Custom Product Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Configure Your Custom Product
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Tell us exactly what you want fabricated. Share your dimensions, substrates, vector logos, or engineering drawing files (DXF, DWG, STEP) for rapid quotation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Interactive Studio Deck (8 cols) */}
          <div className="lg:col-span-8">
            <InteractiveCustomStudio initialProduct={initialProduct} />
          </div>

          {/* Right Guidance & Technical Telemetry Deck (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Engineering Capability Scope */}
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Fabrication Scope</h3>
                  <p className="text-xs text-brand-orange font-mono uppercase tracking-wider">In-House Machines</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>Laser Engraving & Marking:</strong> Names, company branding, serial numbers, and micro-artwork on metals, hardwoods, and acrylics.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>Laser Cutting:</strong> Architectural screens, custom letters, stencils, and geometric profiles from DXF/AI vectors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>CNC Cutting & Milling:</strong> Solid wood, ACP, non-ferrous components with strict dimensional repeatability.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>Prototypes to Production:</strong> From 1-off prototypes to repeat commercial orders.</span>
                </li>
              </ul>
            </div>

            {/* Strict Confidentiality Guarantee */}
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">CAD & Drawing Privacy</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                All drawings, vector assets, and customer CAD files are strictly confidential. We never share, distribute, or repurpose proprietary client geometry.
              </p>
            </div>

            {/* Direct Workshop Contacts Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-orange/20 to-brand-blue-electric/15 border border-white/15 backdrop-blur-xl shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-white">Need Real-Time Technical Advice?</h3>
              <p className="text-xs text-slate-200 leading-relaxed font-light">
                Unsure about material thickness, kerf allowances, or toolpath feasibility? Speak directly with our workshop engineers:
              </p>

              <div className="space-y-2 pt-1 text-sm font-semibold">
                <a
                  href={`tel:${COMPANY_INFO.phones[0]}`}
                  className="flex items-center gap-2.5 text-slate-200 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>+91 {COMPANY_INFO.phones[0]}</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phones[1]}`}
                  className="flex items-center gap-2.5 text-slate-200 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>+91 {COMPANY_INFO.phones[1]}</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${encodeURIComponent(
                    'Hello Aanant Enterprises, I would like to discuss a custom product requirement.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Workshop Desk</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
