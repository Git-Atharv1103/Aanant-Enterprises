import React from 'react';
import { Cpu, Zap, CheckCircle2, ArrowRight, HelpCircle, FileSpreadsheet, Sparkles } from 'lucide-react';
import { CAPABILITIES_DATA } from '../data/companyData';
import { useScrollReveal } from '../utils/useScrollReveal';

interface ManufacturingCapabilitiesSectionProps {
  onNavigate: (page: string) => void;
}

export const ManufacturingCapabilitiesSection: React.FC<ManufacturingCapabilitiesSectionProps> = ({
  onNavigate,
}) => {
  const { cnc, laser } = CAPABILITIES_DATA;
  const headerReveal = useScrollReveal<HTMLDivElement>();
  const cardsReveal = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-gradient-to-b from-[#0a0f1d] via-[#070b14] to-[#0a0f1d] text-white relative overflow-hidden border-t border-white/10">
      {/* Industrial Grid & Ambient Light Orbs */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-blue-electric/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          ref={headerReveal.ref}
          className={`max-w-3xl mx-auto text-center space-y-4 mb-8 sm:mb-10 transition-all duration-700 ${
            headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-orange/30 text-brand-orange text-xs font-mono font-semibold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Machinery Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            High-Precision Subtractive & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-blue-electric">
              Thermal Laser Capabilities
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Operating industrial computer-controlled CNC routing centers and high-speed laser cutters with micro-step precision to convert raw metals, acrylics, and hardwoods into flawless components.
          </p>
        </div>

        {/* Two Dual-Engine Machinery Columns (CNC vs Laser) */}
        <div
          ref={cardsReveal.ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 transition-all duration-700 ${
            cardsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          
          {/* SECTION A: CNC MACHINING */}
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-7 sm:p-9 shadow-2xl flex flex-col justify-between relative group hover:border-brand-blue-electric/50 transition-all duration-500 hover:-translate-y-1">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-blue-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-blue-electric shadow-glow-blue/20 group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-brand-blue-electric font-bold">
                      Section 01 • Subtractive
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{cnc.title}</h3>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-slate-300">
                  3-Axis Milling
                </span>
              </div>

              {/* Machinery Image Preview */}
              <div className="rounded-2xl overflow-hidden h-52 border border-white/10 relative group-hover:border-brand-blue-electric/30 transition-colors">
                <img
                  src="/images/hero-cnc.jpg"
                  alt="Computer-Controlled CNC Machining Operations"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-white bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    High RPM Spindles & Multi-Flute Tooling
                  </span>
                  <span className="text-xs font-mono text-brand-blue-electric font-bold bg-brand-blue/30 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    ±0.05 mm
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {cnc.description}
              </p>

              {/* Confirmed Processes List */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Certified CNC Operations:
                </h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  {cnc.processes.map((proc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue-electric flex-shrink-0 mt-0.5" />
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Note Box */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-brand-blue-electric flex-shrink-0 mt-0.5" />
                <span>{cnc.materialsNote}</span>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={() => onNavigate('quote')}
                className="w-full py-3.5 px-5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-brand-blue border border-white/15 hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2 group/btn"
              >
                <span>Submit CNC Machining Specification</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* SECTION B: LASER CUTTING & ENGRAVING */}
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-7 sm:p-9 shadow-2xl flex flex-col justify-between relative group hover:border-brand-orange/50 transition-all duration-500 hover:-translate-y-1">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange shadow-glow-orange/20 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-brand-orange font-bold">
                      Section 02 • Thermal Precision
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{laser.title}</h3>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-slate-300">
                  CO₂ & Fiber
                </span>
              </div>

              {/* Machinery Image Preview */}
              <div className="rounded-2xl overflow-hidden h-52 border border-white/10 relative group-hover:border-brand-orange/30 transition-colors">
                <img
                  src="/images/laser-action.jpg"
                  alt="Industrial Laser Cutting in Operation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-white bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    Narrow Kerf & High-Resolution Etch
                  </span>
                  <span className="text-xs font-mono text-brand-orange font-bold bg-brand-orange/30 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    0.02 mm Kerf
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {laser.description}
              </p>

              {/* Confirmed Processes List */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Certified Laser Operations:
                </h4>
                <ul className="space-y-2 text-sm text-slate-200">
                  {laser.processes.map((proc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Note Box */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>{laser.materialsNote}</span>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={() => onNavigate('quote')}
                className="w-full py-3.5 px-5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all duration-200 flex items-center justify-center gap-2 group/btn active:scale-95"
              >
                <span>Discuss Laser Profiling Requirements</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

        {/* CAD & Drawings Consultation Strip */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-brand-blue-electric/[0.06] border border-white/15 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2.5">
              <FileSpreadsheet className="w-5 h-5 text-brand-orange" />
              <span>Have technical drawings, 2D vectors, or STEP solid models?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Send your DXF, DWG, PDF, or STEP files for automated toolpath review, nesting optimization, and firm industrial quotations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('quote')}
            className="flex-shrink-0 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all active:scale-95"
          >
            Request Technical Feasibility
          </button>
        </div>

      </div>
    </section>
  );
};
