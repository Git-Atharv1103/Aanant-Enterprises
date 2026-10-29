import React, { useRef } from 'react';
import {
  Target,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Printer,
  HeartHandshake,
} from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';
import { TiltCard } from './TiltCard';

interface AboutSectionProps {
  onNavigate?: (page: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 bg-gradient-to-b from-[#090D18] via-[#0E1628] to-[#090D18] text-slate-100 overflow-hidden relative border-t border-white/10"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/3 -left-36 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ── 1. Editorial Header ── */}
        <div className="reveal space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Aanant Enterprises • Pune</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight">
            Thoughtful Gifts.{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
              Lasting Impressions.
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
            Aanant Enterprises is a Pune-based company specializing in premium customized gifts,
            corporate branding solutions, industrial labels, and precision laser engraving services.
            We are committed to helping businesses strengthen their brand identity through innovative,
            high-quality, and customized products that leave a lasting impression.
          </p>
        </div>

        {/* ── 2. Split Showcase Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: 3D Visual Showcase featuring uploaded Corporate Gifting Flyer */}
          <div className="lg:col-span-5 reveal-left">
            <TiltCard
              maxTilt={8}
              perspective={1100}
              glareOpacity={0.25}
              className="rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl group"
            >
              <div className="relative h-[480px] sm:h-[540px] overflow-hidden">
                <img
                  src="/images/corporate-gifting-flyer.jpg"
                  alt="Aanant Enterprises Corporate Gifting Solutions — Branded flasks, notebooks, mugs, and presentation boxes"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Laser Sweep Beam */}
                <div className="laser-sweep opacity-0 group-hover:opacity-70 transition-opacity" />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-[#090D18]/40 to-transparent" />

                {/* Floating 3D HUD Badges */}
                <div className="absolute top-4 left-4" style={{ transform: 'translateZ(25px)' }}>
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/30 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Infinite Solutions
                  </span>
                </div>

                <div className="absolute top-4 right-4" style={{ transform: 'translateZ(25px)' }}>
                  <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-slate-200 border border-white/15 shadow-lg">
                    Pune Facility
                  </span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white" style={{ transform: 'translateZ(20px)' }}>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-brand-orange font-bold">
                    Executive Suite
                  </span>
                  <h4 className="text-xl font-black mt-1 text-white">
                    Corporate Gifting Solutions
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-light">
                    Laser-marked thermal flasks, executive leatherette notebooks, branded ceramic mugs,
                    metallic cardholders, and luxury presentation packaging.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Rich Corporate Narrative & Value Pillars */}
          <div className="lg:col-span-7 space-y-6 reveal-right">
            
            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              With a customer-centric approach and a strong focus on quality, we cater to organizations
              of all sizes—from startups and SMEs to large corporations, educational institutions,
              manufacturing companies, healthcare organizations, and government sectors.
            </p>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Whether it’s employee welcome kits, promotional merchandise, festive gifting, awards &
              recognition products, industrial labels, or personalized branding solutions, we deliver
              products that perfectly reflect your brand’s identity and values.
            </p>

            {/* End-to-End Capabilities 4-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-brand-orange text-xs font-mono font-bold uppercase">
                  <Layers className="w-4 h-4" />
                  <span>End-to-End Solutions</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Product selection, creative design support, branding consultation, precision engraving, customized printing, quality inspection, and premium packaging.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-brand-electric text-xs font-mono font-bold uppercase">
                  <Printer className="w-4 h-4" />
                  <span>Advanced Technology</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Equipped with fiber laser engraving, CO2 laser cutting, UV printing, sublimation transfer, industrial labeling, and acrylic fabrication.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                  <Shield className="w-4 h-4" />
                  <span>Quality Craftsmanship</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Every project is handled with meticulous attention to detail, ensuring dimensional consistency, durable bonding, and exceptional finish.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Meaningful Connections</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  We believe every gift is an opportunity to enhance brand visibility and build lasting relationships with employees, customers, and partners.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('services');
                  }
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl text-xs font-mono uppercase tracking-wider font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all flex items-center gap-2 group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl text-xs font-mono uppercase tracking-wider font-bold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                <span>Contact Engineering Desk</span>
              </button>
            </div>

          </div>
        </div>

        {/* ── 3. VISION & MISSION (Two Distinct 3D Cards) ── */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-brand-orange font-bold uppercase tracking-wider">
              Strategic Foundation
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Our Vision & Mission
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* ── Vision Card ── */}
            <TiltCard
              maxTilt={7}
              perspective={1000}
              glareOpacity={0.2}
              glareColor="rgba(52,120,246,0.3)"
              className="p-8 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-brand-electric/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: '#3478F6' }}
              />

              <div className="space-y-5 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-brand-electric/15 border border-brand-electric/30 flex items-center justify-center text-brand-electric shadow-lg group-hover:scale-110 transition-transform">
                    <Eye className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-electric/10 text-brand-electric border border-brand-electric/30">
                    OUR VISION
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Inspiring Relationships & Strengthening Brand Identity
                </h4>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  "To become one of India’s most trusted corporate gifting and branding solution providers
                  by delivering innovative, premium-quality products that inspire lasting relationships
                  and strengthen brand identity."
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-brand-electric animate-pulse" />
                  <span>Trusted Nationwide Brand Partner</span>
                </div>
              </div>
            </TiltCard>

            {/* ── Mission Card ── */}
            <TiltCard
              maxTilt={7}
              perspective={1000}
              glareOpacity={0.2}
              glareColor="rgba(255,107,0,0.3)"
              className="p-8 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-brand-orange/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: '#FF6B00' }}
              />

              <div className="space-y-5 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange shadow-lg group-hover:scale-110 transition-transform">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/30">
                    OUR MISSION
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Advanced Manufacturing & Exceeding Expectations
                </h4>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  "To provide customized, high-quality corporate gifting and branding solutions through
                  innovative designs, advanced manufacturing, exceptional service, and timely delivery,
                  while consistently exceeding customer expectations."
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                  <span>Consistent Quality • Timely Delivery</span>
                </div>
              </div>
            </TiltCard>

          </div>
        </div>

      </div>
    </section>
  );
};
