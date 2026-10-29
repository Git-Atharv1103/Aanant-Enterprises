import React, { useRef } from 'react';
import {
  Sparkles,
  Palette,
  Layers,
  CheckCircle2,
  Zap,
  Sliders,
  ShieldCheck,
  Truck,
  Handshake,
  Shield,
  Award,
} from 'lucide-react';
import { WHY_CHOOSE_US_POINTS } from '../data/companyData';
import { useScrollReveal } from '../utils/useScrollReveal';
import { TiltCard } from './TiltCard';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Palette,
  Layers,
  CheckCircle2,
  Zap,
  Sliders,
  ShieldCheck,
  Truck,
  Handshake,
};

export const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0B1020] via-[#0E1628] to-[#0B1020] text-slate-100 border-t border-white/10"
    >
      {/* Decorative Grids and Light Orbs */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-brand-electric/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <div className="reveal space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-electric/15 border border-brand-electric/30 text-brand-electric text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Choose Aanant Enterprises</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Quality, Customisation &{' '}
              <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
                Service You Can Rely On
              </span>
            </h2>
          </div>

          <div className="reveal delay-100">
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Driven by innovation, quality craftsmanship, competitive pricing, and quick turnaround times,
              we strive to become your trusted partner for all corporate gifting, industrial labelling,
              and branding needs.
            </p>
          </div>
        </div>

        {/* 9 Why Choose Us 3D Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {WHY_CHOOSE_US_POINTS.map((point, i) => {
            const Icon = iconMap[point.iconName] || Award;

            return (
              <div key={i} className={`reveal delay-${(i % 3) * 100 + 100} h-full`}>
                <TiltCard
                  maxTilt={9}
                  perspective={1000}
                  glareOpacity={0.2}
                  glareColor={`${point.accent}33`}
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
                    {/* Top Row: Icon + Badge Tag */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-13 h-13 p-3 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
                        style={{
                          background: `radial-gradient(circle, ${point.accent}25 0%, rgba(255,255,255,0.03) 100%)`,
                          border: `1px solid ${point.accent}55`,
                        }}
                      >
                        <Icon className="w-6 h-6 transition-colors" style={{ color: point.accent }} />
                      </div>

                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {point.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors mb-2">
                        {point.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Accent Indicator */}
                  <div
                    className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400"
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: point.accent }} />
                      <span className="text-slate-300 text-[11px]">Advantage 0{i + 1}</span>
                    </div>
                    <span className="text-white/60 font-semibold">100% Guaranteed</span>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Authenticity & Client Trust Box */}
        <div className="reveal delay-200">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-glow-sm">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-sm text-slate-300 space-y-1">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Commitment to Authenticity & Reliable Quality</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-normal">
                    Verified Production
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Every product undergoes rigorous visual and dimensional checks before safe packaging and dispatch.
                  We serve startups, SMEs, multinational corporations, and government institutions with equal dedication.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-center">
                PAN India Delivery • Zero Compromise Quality
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
