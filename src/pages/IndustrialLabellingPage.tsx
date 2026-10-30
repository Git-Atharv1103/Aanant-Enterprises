import React from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Mail,
  Phone,
  Shield,
  Zap,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import {
  INDUSTRIAL_LABELLING_CATEGORIES,
  INDUSTRIAL_LABELLING_HERO,
} from '../data/industrialLabellingData';
import { IndustrialCategoryCard } from '../components/IndustrialCategoryCard';
import { COMPANY_INFO } from '../data/companyData';
import { RealisticDiya, HangingLantern, RangoliCornerPattern } from '../components/DiwaliFestiveDecor';

interface IndustrialLabellingPageProps {
  onNavigate: (route: string) => void;
}

export const IndustrialLabellingPage: React.FC<IndustrialLabellingPageProps> = ({ onNavigate }) => {
  const handleBackToServices = () => {
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const totalImages = INDUSTRIAL_LABELLING_CATEGORIES.reduce(
    (acc, cat) => acc + (cat.images ? cat.images.length : 0),
    0
  );

  return (
    <main className="bg-transparent text-white min-h-screen pt-28 pb-24 relative overflow-hidden" role="main">
      {/* Background Ambience */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <div
        className="absolute top-24 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,120,246,0.12) 0%, transparent 70%)',
        }}
      />
      {/* Decorative Diwali Accents */}
      <HangingLantern className="hidden md:block absolute top-20 left-4 z-10" />
      <HangingLantern className="hidden md:block absolute top-20 right-4 z-10" />
      <RangoliCornerPattern className="hidden lg:block absolute bottom-0 right-0 z-0 rotate-90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── Breadcrumb & Back Navigation ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-brand-orange transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={handleBackToServices}
              className="hover:text-brand-orange transition-colors"
            >
              Our Services
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Industrial Labelling</span>
          </nav>

          <button
            onClick={handleBackToServices}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services</span>
          </button>
        </div>

        {/* ── Page Hero Banner (Split Industrial Layout) ── */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1628]/85 backdrop-blur-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <RealisticDiya size={30} className="shrink-0 -mt-1 hidden sm:inline-flex" />
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{INDUSTRIAL_LABELLING_HERO.sectionTitle}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
                {INDUSTRIAL_LABELLING_HERO.mainHeading}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                {INDUSTRIAL_LABELLING_HERO.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300">
                  <Zap className="w-3.5 h-3.5 text-brand-electric" />
                  <span>Fiber Laser Marking</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Permanent High-Contrast Marking</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sublimation & Trafolite Engraving</span>
                </span>
              </div>
            </div>

            {/* Right Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl h-56 sm:h-64 lg:h-72 group">
                <img
                  src={INDUSTRIAL_LABELLING_HERO.heroImage}
                  alt="Industrial Labelling and Laser Marking in action"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/90 via-[#0B1020]/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">Fiber Laser Micro-Marking</span>
                  <span className="text-brand-orange font-bold">Pune Workshop</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Section Title for the EXACTLY FIVE Product Cards ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-orange font-bold uppercase tracking-wider">
            <span>Core Product Classifications</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industrial Labelling Products
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-3xl leading-relaxed">
            Explore our five specialized industrial labelling categories below. Each card features continuous
            sliding showcases of actual workshop photographs with background-removed clarity. Click any card to
            open its full gallery with high-resolution image inspection.
          </p>
        </div>

        {/* ── RESPONSIVE GRID LAYOUT FOR EXACTLY 5 PRODUCT CARDS ── */}
        {/* Desktop (lg): Row 1 has 3 cards, Row 2 has 2 cards neatly centered horizontally */}
        <div className="hidden lg:flex lg:flex-col lg:gap-8">
          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-3 gap-8">
            {INDUSTRIAL_LABELLING_CATEGORIES.slice(0, 3).map((category, index) => (
              <IndustrialCategoryCard
                key={category.id}
                category={category}
                index={index}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {/* Row 2: 2 cards centered horizontally */}
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            {INDUSTRIAL_LABELLING_CATEGORIES.slice(3, 5).map((category, index) => (
              <IndustrialCategoryCard
                key={category.id}
                category={category}
                index={index + 3}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>

        {/* Tablet (md) and Mobile: 2 per row on tablet, 1 per row on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
          {INDUSTRIAL_LABELLING_CATEGORIES.map((category, index) => (
            <IndustrialCategoryCard
              key={category.id}
              category={category}
              index={index}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* ── Dynamic Photo Inventory Banner ── */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-4 h-4 text-brand-orange shrink-0" />
            <span>
              Dynamic product photography engine: background-removed transparent PNGs cycle smoothly across all 5 cards.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-slate-300 font-bold">5 Specialized Categories</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-400">{totalImages} Processed Photos Active</span>
          </div>
        </div>

        {/* ── Direct Contact & Commercial Consultation ── */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1628]/70 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-brand-orange uppercase tracking-wider font-bold">
                Aanant Enterprises • Industrial Identification Desk
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Have custom drawings or technical plate requirements?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Share your artwork, vector files, or dimensional details for immediate review.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Industrial%20Labelling%20Inquiry`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 transition-all flex items-center gap-2 shadow-glow-orange"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Drawing</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                <span>Call Workshop</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};
