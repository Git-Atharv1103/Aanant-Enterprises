import React, { useState } from 'react';
import {
  ArrowDown,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ExternalLink,
  Zap,
  Cpu,
  ChevronDown,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ProductMarqueeSlider } from './ProductMarqueeSlider';
import { RealisticDiya, HangingLantern, RangoliCornerPattern } from './DiwaliFestiveDecor';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [addressExpanded, setAddressExpanded] = useState(false);

  const handleExploreServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = (serviceId: string) => {
    onNavigate(serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex items-center bg-transparent text-white overflow-hidden pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-12"
      id="hero-section"
      aria-label="Aanant Enterprises Hero Section"
    >
      {/* Background Subtle Industrial Grid & Ambient Lighting */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
      <div className="hero-noise opacity-20 pointer-events-none" />

      {/* Ambient Diwali Radial Golden Lighting Glows & Rays */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.18) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, rgba(245, 158, 11, 0.1) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 -right-20 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.24) 0%, rgba(245, 158, 11, 0.12) 40%, transparent 70%)',
        }}
      />

      {/* Diwali Festive Decorative Elements */}
      <HangingLantern className="hidden md:block absolute top-0 left-6 z-10" />
      <HangingLantern className="hidden md:block absolute top-0 right-8 z-10" />
      <RangoliCornerPattern className="hidden lg:block absolute bottom-0 -left-6 z-0 opacity-40" />
      <RangoliCornerPattern className="hidden lg:block absolute bottom-0 -right-6 z-0 rotate-90 opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Spacious Two-Column Layout: Left (42-45%) | Right (55-58%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ══════════════════════════════════════════════════════════
              LEFT COLUMN — COMPANY INFORMATION (~42% on desktop)
             ══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-7 z-20">

            {/* Small Eyebrow Label with Festive Diya Glow */}
            <div className="flex items-center gap-3">
              <RealisticDiya size={34} className="shrink-0 -mt-1 hidden sm:inline-flex" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span>LASER ENGRAVING • INDUSTRIAL MARKING • DIWALI CORPORATE GIFTS</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Precision Meets <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-electric">
                  Creativity.
                </span>
              </h1>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-xl">
              Aanant Enterprises transforms ideas into personalised products and
              precision-marked components using CO2 laser cutting and fiber laser engraving technology.
            </p>

            {/* Machine Technology Capability Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/25 text-xs font-mono font-medium text-blue-300">
                <Cpu className="w-3.5 h-3.5 text-brand-electric" />
                <span>CO2 Laser Machine</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-xs font-mono font-medium text-amber-300">
                <Zap className="w-3.5 h-3.5 text-brand-orange" />
                <span>Fiber Laser Engraving Machine</span>
              </span>
            </div>

            {/* Contact Information & Identity Panel */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 backdrop-blur-md space-y-3.5 shadow-xl transition-all duration-300 hover:border-white/20">
              
              {/* Header inside Panel: Identity */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 p-1.5 border border-white/15 flex items-center justify-center shrink-0">
                    <img
                      src="/images/aanant-logo.png"
                      alt="Aanant Enterprises"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-white">Aanant Enterprises</div>
                    <div className="text-[10px] font-mono text-brand-orange uppercase font-bold tracking-wider">
                      {COMPANY_INFO.tagline}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Pune, MH
                </span>
              </div>

              {/* Contact Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Email Link */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-brand-orange/15 border border-white/5 hover:border-brand-orange/30 text-slate-200 hover:text-white transition-all group/item"
                  title={`Send email to ${COMPANY_INFO.email}`}
                >
                  <div className="w-6 h-6 rounded-lg bg-brand-orange/20 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-brand-orange" />
                  </div>
                  <span className="truncate font-mono">{COMPANY_INFO.email}</span>
                </a>

                {/* Primary Phone */}
                <a
                  href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-brand-electric/15 border border-white/5 hover:border-brand-electric/30 text-slate-200 hover:text-white transition-all group/item"
                  title={`Call ${COMPANY_INFO.phones[0]}`}
                >
                  <div className="w-6 h-6 rounded-lg bg-brand-electric/20 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-brand-electric" />
                  </div>
                  <span className="font-mono">{COMPANY_INFO.phones[0]}</span>
                </a>

                {/* Secondary Phone */}
                <a
                  href={`tel:${COMPANY_INFO.phones[1].replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-brand-electric/15 border border-white/5 hover:border-brand-electric/30 text-slate-200 hover:text-white transition-all group/item sm:col-span-1"
                  title={`Call ${COMPANY_INFO.phones[1]}`}
                >
                  <div className="w-6 h-6 rounded-lg bg-brand-electric/20 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-brand-electric" />
                  </div>
                  <span className="font-mono">{COMPANY_INFO.phones[1]}</span>
                </a>

                {/* Google Maps Search Link */}
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-500/30 text-slate-200 hover:text-white transition-all group/item sm:col-span-1"
                  title="View Aanant Enterprises on Google Maps"
                >
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="truncate">Nanded Phata, Pune</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-emerald-400 shrink-0 ml-1" />
                </a>
              </div>

              {/* Expandable Address Detail Card */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setAddressExpanded(!addressExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-black/30 hover:bg-black/50 text-[11px] text-slate-400 hover:text-slate-200 border border-white/5 transition-colors text-left"
                  aria-expanded={addressExpanded}
                >
                  <span className="truncate">
                    <strong>Workshop:</strong> Sinhgad Road, Opp. Ganesh Mangal Karyalay
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-brand-orange shrink-0 ml-2 transition-transform duration-200 ${
                      addressExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {addressExpanded && (
                  <div className="mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] text-slate-300 leading-relaxed font-light space-y-1.5 animate-fadeIn">
                    <p>{COMPANY_INFO.address.fullFormatted}</p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">
                        GSTIN: {COMPANY_INFO.gstin}
                      </span>
                      <a
                        href={COMPANY_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-brand-orange hover:text-amber-300 font-bold flex items-center gap-1"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary: Explore Our Services */}
              <button
                onClick={handleExploreServices}
                className="px-6 sm:px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange hover:shadow-[0_8px_32px_rgba(255,107,0,0.6)] transition-all duration-200 flex items-center gap-2 group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                id="hero-explore-services-btn"
              >
                <span>Explore Our Services</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              {/* Secondary: Contact Us */}
              <button
                onClick={handleContactClick}
                className="px-5 sm:px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200 flex items-center gap-2 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                id="hero-contact-us-btn"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN — CONTINUOUS PRODUCT IMAGE SLIDER (~58%)
             ══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 relative z-10 w-full overflow-hidden">
            {/* Ambient Back Glow for Right Gallery */}
            <div
              className="absolute -inset-2 rounded-3xl pointer-events-none opacity-60"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(52,120,246,0.18) 0%, transparent 70%)',
              }}
            />

            {/* Continuous Marquee Slider */}
            <ProductMarqueeSlider onCardClick={handleCardClick} />
          </div>

        </div>

        {/* Bottom Scroll Anchor Hint */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          <button
            onClick={handleExploreServices}
            className="flex flex-col items-center gap-1 text-[11px] uppercase tracking-widest text-slate-400 font-mono hover:text-brand-orange transition-colors"
          >
            <span>Scroll to Our Services</span>
            <ChevronDown className="w-4 h-4 text-brand-orange animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
