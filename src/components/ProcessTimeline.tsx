import React, { useRef } from 'react';
import { Lightbulb, Wrench, MessageSquareCheck, Cog, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { FOUR_STEP_PROCESS } from '../data/companyData';
import { useScrollReveal } from '../utils/useScrollReveal';
import { TiltCard } from './TiltCard';

interface ProcessTimelineProps {
  onNavigate: (page: string) => void;
}

const stepIcons = [Lightbulb, Wrench, MessageSquareCheck, Cog];
const stepHighlights = [
  ['Sketches & CAD Files', 'Vector / DXF / PDF / AI', 'Online Portal or WhatsApp'],
  ['Fiber Laser Engraving', 'Precision CO2 Laser Cutting', 'High-Speed CNC Milling'],
  ['Feasibility & Tolerances', 'Material Spec Confirmation', 'Itemised Quote & Lead Time'],
  ['Micro-Precision Run', 'Deburring & Quality Audit', 'Protective Pack & Dispatch'],
];

const stepColors = [
  { accent: '#FF6B00', badge: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30', glow: 'rgba(255,107,0,0.3)' },
  { accent: '#3478F6', badge: 'bg-brand-electric/15 text-brand-electric border-brand-electric/30', glow: 'rgba(52,120,246,0.3)' },
  { accent: '#00D26A', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', glow: 'rgba(0,210,106,0.3)' },
  { accent: '#FFB547', badge: 'bg-amber-400/15 text-amber-300 border-amber-400/30', glow: 'rgba(255,181,71,0.3)' },
];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-[#090D18] via-[#0E1628] to-[#090D18] text-slate-100 overflow-hidden relative border-y border-white/10"
    >
      {/* Background Engineering Grids and Ambient Lights */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-electric/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Ordering Process</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            From Initial Concept to{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
              Precision Product
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            A transparent, 4-step engineering workflow engineered to turn customer drawings,
            sketches, and custom dimensions into physical high-precision reality.
          </p>
        </div>

        {/* 4-Step Interactive 3D Cards */}
        <div className="relative">
          {/* Animated Laser Connector Beam on Desktop */}
          <div
            className="hidden lg:block absolute top-28 left-[8%] right-[8%] h-0.5 pointer-events-none z-0"
            style={{
              background: 'linear-gradient(90deg, rgba(255,107,0,0.1), rgba(52,120,246,0.6) 50%, rgba(255,181,71,0.2))',
              boxShadow: '0 0 12px rgba(52,120,246,0.5)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {FOUR_STEP_PROCESS.map((item, i) => {
              const Icon = stepIcons[i] || Lightbulb;
              const color = stepColors[i] || stepColors[0];
              const highlights = stepHighlights[i] || [];

              return (
                <div key={i} className={`reveal delay-${(i + 1) * 100} h-full`}>
                  <TiltCard
                    maxTilt={9}
                    perspective={1100}
                    glareOpacity={0.22}
                    glareColor={color.glow}
                    className="h-full rounded-3xl p-7 bg-white/[0.04] border border-white/10 hover:border-white/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between group transition-all duration-300 hover:bg-white/[0.08]"
                  >
                    {/* Ghost 3D Step Number */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-3 -right-2 text-7xl font-mono font-black select-none pointer-events-none text-white/[0.04] group-hover:text-white/[0.09] transition-colors"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {item.step}
                    </div>

                    <div className="space-y-5" style={{ transform: 'translateZ(20px)' }}>
                      {/* Top Header: Badge + Icon */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${color.badge}`}>
                          Step {item.step}
                        </span>

                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
                          style={{
                            background: `radial-gradient(circle, ${color.glow} 0%, rgba(255,255,255,0.03) 100%)`,
                            border: `1px solid ${color.accent}55`,
                          }}
                        >
                          <Icon className="w-6 h-6 transition-colors" style={{ color: color.accent }} />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-lg font-black text-white group-hover:text-brand-orange transition-colors tracking-tight">
                        {item.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Step Deliverable Highlights */}
                      <div className="pt-3 border-t border-white/10 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Key Deliverables:
                        </div>
                        <ul className="space-y-1.5">
                          {highlights.map((h, hIdx) => (
                            <li key={hIdx} className="flex items-center gap-2 text-xs text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: color.accent }} />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer Progress Bar */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color.accent }} />
                        <span className="text-[11px] text-slate-300">Phase {i + 1} of 4</span>
                      </div>
                      <span className="text-white/60 font-semibold">100% Verified</span>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note + CTA Action Banner */}
        <div className="mt-16 reveal delay-200">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-brand-orange font-bold">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span>Ready for Custom Production</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                Have an idea, blueprint, or DXF drawing ready?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
                Every customized order is reviewed directly by our Pune engineering workshop
                for material suitability, dimensional tolerances, and optimal pricing.
              </p>
            </div>

            <button
              onClick={() => onNavigate('custom-request')}
              className="px-7 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all duration-300 flex items-center gap-2 shrink-0 group hover:scale-[1.02]"
            >
              <span>Start Step 1 — Share Idea</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
