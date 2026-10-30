import React, { useRef } from 'react';
import {
  MessageSquare,
  PackageCheck,
  Palette,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Gift,
  Truck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { EIGHT_STEP_PROCESS } from '../data/companyData';
import { useScrollReveal } from '../utils/useScrollReveal';
import { TiltCard } from './TiltCard';
import { RealisticDiya } from './DiwaliFestiveDecor';

interface ProcessTimelineProps {
  onNavigate: (page: string) => void;
}

const stepIcons = [
  MessageSquare,
  PackageCheck,
  Palette,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Gift,
  Truck,
];

const stepAccents = [
  { accent: '#FF6B00', glow: 'rgba(255,107,0,0.3)', badge: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30' },
  { accent: '#3478F6', glow: 'rgba(52,120,246,0.3)', badge: 'bg-brand-electric/15 text-brand-electric border-brand-electric/30' },
  { accent: '#00E5FF', glow: 'rgba(0,229,255,0.3)', badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
  { accent: '#FFB547', glow: 'rgba(255,181,71,0.3)', badge: 'bg-amber-400/15 text-amber-300 border-amber-400/30' },
  { accent: '#10B981', glow: 'rgba(16,185,129,0.3)', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  { accent: '#818CF8', glow: 'rgba(129,140,248,0.3)', badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' },
  { accent: '#F43F5E', glow: 'rgba(244,63,94,0.3)', badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30' },
  { accent: '#38BDF8', glow: 'rgba(56,189,248,0.3)', badge: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="our-process"
      className="py-12 lg:py-16 bg-gradient-to-b from-[#090D18]/60 via-[#0E1628]/50 to-[#090D18]/60 text-slate-100 overflow-hidden relative border-y border-white/10"
    >
      {/* Background Engineering Grids and Ambient Lights */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-electric/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 reveal">
          <div className="flex items-center justify-center gap-2.5">
            <RealisticDiya size={26} className="shrink-0 -mt-1 hidden sm:inline-flex" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our 8-Step Process</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
            From Your Idea to the{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
              Final Product
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Our systematic, 8-stage manufacturing and customization process ensures every corporate gift,
            branded item, and industrial label meets exact specifications and arrives on time.
          </p>
        </div>

        {/* 8-Step Interactive 3D Cards Grid (4 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EIGHT_STEP_PROCESS.map((item, i) => {
            const Icon = stepIcons[i] || MessageSquare;
            const accent = stepAccents[i] || stepAccents[0];

            return (
              <div key={i} className={`reveal delay-${(i % 4) * 100 + 100} h-full`}>
                <TiltCard
                  maxTilt={8}
                  perspective={1000}
                  glareOpacity={0.2}
                  glareColor={accent.glow}
                  className="h-full rounded-3xl p-6 bg-white/[0.04] border border-white/10 hover:border-white/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between group transition-all duration-300 hover:bg-white/[0.08]"
                >
                  {/* Ghost 3D Step Number */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 -right-2 text-7xl font-mono font-black select-none pointer-events-none text-white/[0.04] group-hover:text-white/[0.09] transition-colors"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {item.step}
                  </div>

                  <div className="space-y-4" style={{ transform: 'translateZ(20px)' }}>
                    {/* Top: Step Badge + Glow Icon */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${accent.badge}`}>
                        Phase {item.step}
                      </span>

                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
                        style={{
                          background: `radial-gradient(circle, ${accent.glow} 0%, rgba(255,255,255,0.03) 100%)`,
                          border: `1px solid ${accent.accent}55`,
                        }}
                      >
                        <Icon className="w-5 h-5 transition-colors" style={{ color: accent.accent }} />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors tracking-tight">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer Progress Bar */}
                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent.accent }} />
                      <span className="text-[11px] text-slate-300">Stage {item.step} of 08</span>
                    </div>
                    <span className="text-white/60 font-semibold text-[11px]">Strict QA</span>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* CTA Action Banner */}
        <div className="reveal delay-200">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-brand-orange font-bold">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span>Ready to Begin Step 1?</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                Share your requirements, budget, or design mockups
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
                Our Pune team provides prompt technical feedback, product recommendations,
                and transparent pricing for orders of any volume.
              </p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all duration-300 flex items-center gap-2 shrink-0 group hover:scale-[1.02]"
            >
              <span>Discuss Requirements</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
