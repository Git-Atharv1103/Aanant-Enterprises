import React, { useRef } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  MessageSquare,
  Award,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import {
  CORPORATE_GIFTING_CATEGORIES,
  CORPORATE_GIFTING_HERO,
} from '../data/corporateGiftingData';
import { CorporateGiftingCategoryCard } from '../components/CorporateGiftingCategoryCard';
import {
  RealisticDiya,
  HangingLantern,
  RangoliCornerPattern,
} from '../components/DiwaliFestiveDecor';
import { useScrollReveal } from '../utils/useScrollReveal';

interface CorporateGiftingPageProps {
  onNavigate: (route: string) => void;
}

export const CorporateGiftingPage: React.FC<CorporateGiftingPageProps> = ({
  onNavigate,
}) => {
  const pageRef = useRef<HTMLElement>(null);
  useScrollReveal(pageRef);

  const whatsappMessage = encodeURIComponent(
    'Hello Aanant Enterprises, I would like to inquire about Diwali 2026 Corporate Gifting solutions, bulk ordering, and custom laser branding.'
  );
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${whatsappMessage}`;

  return (
    <main
      ref={pageRef}
      className="bg-[#0B1020] text-white min-h-screen pt-28 pb-20 relative overflow-hidden select-none"
      role="main"
    >
      {/* ── Background Diwali Ambience & Radiant Festive Lighting ── */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none opacity-45"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.18) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-24 left-1/4 w-[650px] h-[650px] rounded-full pointer-events-none opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 107, 0, 0.22) 0%, rgba(245, 158, 11, 0.12) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/2 right-10 w-[550px] h-[550px] rounded-full pointer-events-none opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 70%)',
        }}
      />

      {/* Decorative Hanging Lanterns */}
      <HangingLantern className="hidden md:block absolute top-20 left-4 z-10" />
      <HangingLantern className="hidden md:block absolute top-20 right-4 z-10" />
      <RangoliCornerPattern className="hidden lg:block absolute bottom-0 right-0 z-0 rotate-90 opacity-40" />
      <RangoliCornerPattern className="hidden lg:block absolute bottom-0 left-0 z-0 opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── Breadcrumb & Back Navigation ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-mono text-slate-400"
          >
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-brand-orange transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-brand-orange transition-colors"
            >
              Our Services
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Corporate Gifting</span>
          </nav>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* ── Festive Diwali Hero Banner ── */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#0E1628]/95 via-[#131C35]/90 to-[#0A0F1D]/95 backdrop-blur-xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <RealisticDiya size={32} className="shrink-0 -mt-1 hidden sm:inline-flex" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-brand-orange/20 border border-brand-orange/40 text-brand-orange shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{CORPORATE_GIFTING_HERO.festiveTagline}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {CORPORATE_GIFTING_HERO.mainHeading}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              {CORPORATE_GIFTING_HERO.description}
            </p>

            {/* Value Highlights */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>8 Distinct Gifting Categories</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fiber Laser & Debossed Branding</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Truck className="w-3.5 h-3.5 text-brand-electric" />
                <span>PAN India Bulk Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Floating Ambient Diya */}
          <div className="absolute right-6 -bottom-6 opacity-30 lg:opacity-60 pointer-events-none">
            <RealisticDiya size={120} />
          </div>
        </div>

        {/* ── Category Cards Grid (The 8 requested categories) ── */}
        <section aria-label="Corporate Gifting Product Categories" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-brand-orange font-bold">
                Interactive Product Collections
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                Select a Category to Explore Products
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md font-light">
              Click any category card to trigger its dedicated opening animation and explore product specifications, images, and custom branding options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORPORATE_GIFTING_CATEGORIES.map((category, index) => (
              <CorporateGiftingCategoryCard
                key={category.id}
                category={category}
                index={index}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>

        {/* ── Diwali 2026 Bulk Order Assistance Banner ── */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#0E1628] to-brand-orange/10 backdrop-blur-xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-300 font-mono text-xs uppercase tracking-wider font-bold">
              <RealisticDiya size={22} className="shrink-0 -mt-0.5" />
              <span>Diwali 2026 Corporate Booking Desk</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Planning Bulk Festive Gifting for Your Team or Clients?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light leading-relaxed">
              Share your approximate quantity, preferred items, and delivery timeline. Our Pune team will prepare digital mockups with your logo and dispatch sample kits for review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors"
            >
              <span>Request Quotation</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};
