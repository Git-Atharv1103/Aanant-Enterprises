import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, Sparkles,
  CheckCircle2, ShieldCheck, Target, Zap, Clock, ChevronDown, Wrench, MessageCircle
} from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';
import { COMPANY_INFO } from '../data/companyData';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { icon: Target, value: '±0.05mm', label: 'Laser Tolerance', accent: 'text-brand-orange' },
  { icon: Zap, value: '100%', label: 'Custom Sized', accent: 'text-brand-blue-electric' },
  { icon: Clock, value: '24-48h', label: 'Feasibility Review', accent: 'text-amber-400' },
];

const highlights = [
  { icon: CheckCircle2, text: 'Custom laser engraved nameplates & corporate gifts' },
  { icon: CheckCircle2, text: 'Laser cutting for decorative screens & metal parts' },
  { icon: CheckCircle2, text: 'Precision CNC cutting from DXF, DWG & CAD files' },
  { icon: ShieldCheck, text: 'Single prototype validation to volume batch runs' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [canParallax, setCanParallax] = useState(false);

  useScrollReveal(sectionRef);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanParallax(hasFinePointer && !prefersReduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!canParallax || !visualRef.current) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const x = ((clientX - centerX) / centerX) * 8; // subtle max 8px
    const y = ((clientY - centerY) / centerY) * 8;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center text-white overflow-hidden bg-gradient-to-br from-[#0B1020] via-[#0E1628] to-[#14264D]"
      id="hero-section"
    >
      {/* Precision Industrial Grid & Ambient Lighting Layers */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <div className="hero-noise opacity-40 pointer-events-none" />

      {/* Controlled Radial Ambient Glows — Navy & Orange */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(52,120,246,0.14) 0%, transparent 68%)' }}
      />
      <div
        className="absolute top-1/3 right-4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,107,0,0.12) 0%, transparent 68%)' }}
      />
      <div
        className="absolute bottom-6 left-1/4 w-[500px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,181,71,0.07) 0%, transparent 70%)' }}
      />

      {/* Main Content Grid */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Column (7 cols) — Typography & Action */}
          <div className="lg:col-span-7 space-y-7">

            {/* Precision Eyebrow Badge */}
            <div className="reveal">
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/6 border border-white/12 text-xs font-mono font-semibold tracking-wider text-brand-orange uppercase backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span>Custom Manufacturing Studio · Pune</span>
              </span>
            </div>

            {/* Main Heading — Exact Requested Copy */}
            <div className="reveal delay-100">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-white">
                YOUR IDEA.{' '}
                <br />
                OUR PRECISION.{' '}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-blue-electric">
                  INFINITE POSSIBILITIES.
                </span>
              </h1>
            </div>

            {/* Supporting Text — Exact Requested Scope */}
            <div className="reveal delay-200">
              <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-xl font-light">
                <strong className="text-white font-semibold">Custom Laser Engraving, Laser Cutting & CNC Solutions.</strong>{' '}
                Bring your drawings, logos, or ideas — fabricated to exact dimensions using computer-controlled machine accuracy.
              </p>
            </div>

            {/* Telemetry Metrics Row */}
            <div className="reveal delay-300">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1 max-w-lg">
                {stats.map(({ icon: Icon, value, label, accent }) => (
                  <div
                    key={label}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <Icon className={`w-4 h-4 mx-auto mb-1.5 ${accent}`} />
                    <div className={`text-base sm:text-xl font-mono font-black ${accent}`}>{value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Capabilities Checklist */}
            <div className="reveal delay-400">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                {highlights.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                    <Icon className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Conversion CTA Buttons */}
            <div className="reveal delay-500">
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                {/* Primary CTA */}
                <button
                  onClick={() => onNavigate('custom-request')}
                  className="px-7 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange hover:shadow-glow-orange/80 transition-all duration-200 flex items-center gap-2 group active:scale-95"
                  id="hero-create-product-btn"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Create Your Custom Product</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-white/6 hover:bg-white/12 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200 active:scale-95"
                  id="hero-explore-work-btn"
                >
                  <span>Explore Product Gallery</span>
                </button>

                {/* Direct WhatsApp Action */}
                <a
                  href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${encodeURIComponent('Hello Aanant Enterprises, I would like to discuss a custom laser/CNC requirement.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold text-emerald-300 bg-emerald-500/12 border border-emerald-500/25 hover:bg-emerald-500/20 hover:text-emerald-200 transition-all active:scale-95"
                  id="hero-whatsapp-btn"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Direct Desk</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols) — Layered Industrial Product Showcase */}
          <div
            ref={visualRef}
            className="lg:col-span-5 relative reveal-right delay-200"
            style={{
              transform: canParallax ? `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)` : 'none',
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Ambient Card Glow */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(52,120,246,0.22) 0%, transparent 70%)' }}
            />

            <div className="relative space-y-4">

              {/* Main Finished Manufactured Piece Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group bg-black/40">
                <img
                  src="/images/custom-nameplate.jpg"
                  alt="Custom laser engraved acrylic and metallic nameplate by Aanant Enterprises, Pune"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Laser Sweep Highlight */}
                <div className="laser-sweep opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Contrast Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/95 via-[#0B1020]/25 to-transparent pointer-events-none" />

                {/* Top Badge: Quality Proof */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/15 text-white text-xs font-mono font-medium backdrop-blur-md shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>In-House Production Quality</span>
                  </div>
                </div>

                {/* Bottom Floating Telemetry Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br from-brand-orange to-amber-500 shadow-glow-orange/30">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-brand-orange uppercase tracking-widest font-extrabold">
                          Finished Article
                        </div>
                        <div className="text-sm font-bold text-white">
                          Laser Engraved & CNC Profiled
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-white/10 text-brand-amber border border-white/10">
                      PUNE
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Layered Supporting Visuals (Fiber Marking & Cut Screen) */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    src: '/images/laser-marking-action.jpg',
                    label: 'Fiber Laser Marking',
                    alt: 'Precision fiber laser marking on metals in operation',
                  },
                  {
                    src: '/images/decorative-panel.jpg',
                    label: 'CNC & Laser Cut Panels',
                    alt: 'Decorative laser cut architectural panel',
                  },
                ].map(({ src, label, alt }) => (
                  <div
                    key={label}
                    className="relative rounded-2xl overflow-hidden border border-white/12 h-32 group/thumb bg-black/40 shadow-lg"
                  >
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[11px] font-mono font-medium text-white bg-black/60 px-2 py-0.5 rounded-lg backdrop-blur-sm border border-white/10">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Clean Scroll Indicator */}
        <div className="mt-8 flex flex-col items-center justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
            Scroll to Discover
          </span>
          <ChevronDown className="w-4 h-4 text-brand-orange animate-bounce" />
        </div>

      </div>
    </section>
  );
};
