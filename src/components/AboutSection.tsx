import React, { useRef } from 'react';
import { Target, Cpu, Sliders, Building2, ArrowRight, MapPin, Phone, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { ABOUT_SECTIONS, COMPANY_INFO } from '../data/companyData';
import { useScrollReveal } from '../utils/useScrollReveal';
import { TiltCard } from './TiltCard';

interface AboutSectionProps {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, React.ElementType> = { Building2, Cpu, Sliders, Target };

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-[#090D18] via-[#0E1628] to-[#090D18] text-slate-100 overflow-hidden relative border-t border-white/10"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 -left-36 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editorial Headline */}
        <div className="mb-16 reveal space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Aanant Enterprises</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight max-w-4xl">
            We don't just cut material.{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
              We bring your ideas to life.
            </span>
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left Column: Visual Showcase + Facility Card with 3D Tilt */}
          <div className="lg:col-span-5 space-y-6 reveal-left delay-100">

            {/* 3D Visual Card */}
            <TiltCard
              maxTilt={8}
              perspective={1100}
              glareOpacity={0.25}
              className="rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl group"
            >
              <div className="relative h-[380px] sm:h-[420px] overflow-hidden">
                <img
                  src="/images/custom-nameplate.jpg"
                  alt="Custom laser engraving and CNC product development at Aanant Enterprises, Pune"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Laser Sweep Beam */}
                <div className="laser-sweep opacity-0 group-hover:opacity-70 transition-opacity" />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-[#090D18]/30 to-transparent" />

                {/* Floating 3D HUD Badges */}
                <div className="absolute top-4 left-4" style={{ transform: 'translateZ(25px)' }}>
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-amber-300 border border-amber-400/30 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Pune Fabrication Facility
                  </span>
                </div>

                <div className="absolute top-4 right-4" style={{ transform: 'translateZ(25px)' }}>
                  <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-slate-200 border border-white/15 shadow-lg">
                    ±0.05mm Precision
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white" style={{ transform: 'translateZ(20px)' }}>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-brand-orange font-bold">
                    Custom Craftsmanship
                  </span>
                  <h4 className="text-lg font-black mt-1 text-white">
                    Personalised Engraving & Precision CNC
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-light">
                    Transforming customer CAD files, personal sketches, and dimensions into finished industrial-grade products.
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Quick Contact & Workshop Facility Card */}
            <TiltCard
              maxTilt={6}
              perspective={1000}
              glareOpacity={0.15}
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between" style={{ transform: 'translateZ(15px)' }}>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  <span>Workshop Facility — Pune</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  Active Facility
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light" style={{ transform: 'translateZ(10px)' }}>
                {COMPANY_INFO.address.fullFormatted}
              </p>

              <div className="h-px bg-white/10" />

              <div className="grid grid-cols-1 gap-2.5 text-xs" style={{ transform: 'translateZ(15px)' }}>
                <a
                  href={`tel:${COMPANY_INFO.phones[0]}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span className="font-mono">{COMPANY_INFO.phones[0]}</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phones[1]}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span className="font-mono">{COMPANY_INFO.phones[1]}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-brand-orange transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Narrative + 4 3D Pillar Cards */}
          <div className="lg:col-span-7 space-y-8 reveal-right delay-200">

            {/* Intro Paragraph */}
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
              Aanant Enterprises operates high-accuracy fiber laser, CO2 laser, and CNC routing technology
              to execute customer-specific product development. From initial vector traces to precision-milled
              components, we engineer practical, durable, and aesthetically stunning results.
            </p>

            {/* 4 Pillars in 3D Cards */}
            <div className="space-y-4">
              {ABOUT_SECTIONS.map((item, i) => {
                const Icon = iconMap[item.iconName] || Cpu;
                return (
                  <TiltCard
                    key={i}
                    maxTilt={7}
                    perspective={1000}
                    glareOpacity={0.16}
                    className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-brand-orange/40 hover:bg-white/[0.07] transition-all duration-300 flex items-start gap-4 group shadow-lg"
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-brand-orange transition-all duration-300 group-hover:scale-110 shadow-md"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, rgba(255,255,255,0.03) 100%)',
                        border: '1px solid rgba(255,107,0,0.3)',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white group-hover:text-brand-orange transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          0{i + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </TiltCard>
                );
              })}
            </div>

            {/* Value Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-lg font-black text-brand-orange">100%</div>
                <div className="text-[11px] text-slate-300 font-light">Custom Fabricated</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-lg font-black text-brand-electric">±0.05 mm</div>
                <div className="text-[11px] text-slate-300 font-light">Laser & CNC Accuracy</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center col-span-2 sm:col-span-1">
                <div className="text-lg font-black text-amber-400">Direct</div>
                <div className="text-[11px] text-slate-300 font-light">Pune Factory Support</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 rounded-2xl text-xs font-mono uppercase tracking-wider font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-2 group"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('custom-request')}
                className="px-6 py-3.5 rounded-2xl text-xs font-mono uppercase tracking-wider font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all flex items-center gap-2 group"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Discuss a Project</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
