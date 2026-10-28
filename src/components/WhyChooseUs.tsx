import React, { useRef } from 'react';
import { Cog, Layers, CheckCircle2, MessageSquare, ShieldCheck, Handshake, Sparkles, Shield } from 'lucide-react';
import { BUSINESS_APPROACH_POINTS } from '../data/companyData';
import { useScrollReveal } from '../utils/useScrollReveal';
import { TiltCard } from './TiltCard';

const iconMap: Record<string, React.ElementType> = {
  Cog,
  Layers,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Handshake,
};

const pillarAccents = [
  { color: '#3478F6', glow: 'rgba(52,120,246,0.3)', tag: 'CAD / DXF Feasibility' },
  { color: '#FF6B00', glow: 'rgba(255,107,0,0.3)', tag: 'Prototypes & Batches' },
  { color: '#00D26A', glow: 'rgba(0,210,106,0.3)', tag: '±0.05mm Repeatability' },
  { color: '#FFB547', glow: 'rgba(255,181,71,0.3)', tag: 'Transparent Pricing' },
  { color: '#9B51E0', glow: 'rgba(155,81,224,0.3)', tag: 'IP & File Security' },
  { color: '#00C9A7', glow: 'rgba(0,201,167,0.3)', tag: 'Direct Pune Workshop' },
];

export const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0B1020] via-[#0E1628] to-[#0B1020] text-slate-100 border-t border-white/10"
    >
      {/* Decorative Grids and Light Orbs */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-brand-electric/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16">
          <div className="reveal space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-electric/15 border border-brand-electric/30 text-brand-electric text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Business Approach</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Where Engineering
              <br />
              Meets{' '}
              <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
                Creativity
              </span>
            </h2>
          </div>

          <div className="reveal delay-100">
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Aanant Enterprises focuses on grounded manufacturing execution, rigorous drawing
              evaluations, and dependable long-term relationships for Pune and pan-India clients.
            </p>
          </div>
        </div>

        {/* 6 Pillars 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {BUSINESS_APPROACH_POINTS.map((point, i) => {
            const Icon = iconMap[point.iconName] || Cog;
            const accent = pillarAccents[i] || pillarAccents[0];

            return (
              <div key={i} className={`reveal delay-${(i % 3) * 100 + 100} h-full`}>
                <TiltCard
                  maxTilt={10}
                  perspective={1000}
                  glareOpacity={0.2}
                  glareColor={accent.glow}
                  className="h-full rounded-3xl p-7 bg-white/[0.04] border border-white/10 hover:border-white/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between group transition-all duration-300 hover:bg-white/[0.08]"
                >
                  {/* Large 3D Ghost Number */}
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-2 text-7xl font-black font-mono select-none pointer-events-none text-white/[0.04] group-hover:text-white/[0.09] transition-colors"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="space-y-4" style={{ transform: 'translateZ(20px)' }}>
                    {/* Icon with glowing backdrop */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-13 h-13 p-3 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
                        style={{
                          background: `radial-gradient(circle, ${accent.glow} 0%, rgba(255,255,255,0.03) 100%)`,
                          border: `1px solid ${accent.color}55`,
                        }}
                      >
                        <Icon className="w-6 h-6 transition-colors" style={{ color: accent.color }} />
                      </div>

                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {accent.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors mb-2">
                        {point.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent indicator */}
                  <div
                    className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400"
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent.color }} />
                      <span className="text-slate-300 text-[11px]">Industrial Standard</span>
                    </div>
                    <span className="text-white/60 font-semibold">Pillar 0{i + 1}</span>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Authenticity Box */}
        <div className="mt-14 reveal delay-200">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-glow-sm">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-sm text-slate-300 space-y-1">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Commitment to Authenticity & Quality</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-normal">
                    Verified
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  All cutting tolerances, laser marks, machine setups, and production timelines are confirmed
                  directly with our clients based on verifiable CAD drawings and material feasibility tests.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-center">
                Zero Misrepresentation • Direct Fabrication
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
