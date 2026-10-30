import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  FolderOpen,
  Info,
  Maximize2,
  X,
  ChevronLeft,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import {
  CORPORATE_GIFTING_CATEGORIES,
  getCorporateGiftingCategoryBySlug,
  type CorporateGiftingCategory,
} from '../data/corporateGiftingData';
import {
  RealisticDiya,
} from '../components/DiwaliFestiveDecor';

interface CorporateGiftingCategoryDetailPageProps {
  categorySlug: string;
  onNavigate: (route: string) => void;
}

export const CorporateGiftingCategoryDetailPage: React.FC<
  CorporateGiftingCategoryDetailPageProps
> = ({ categorySlug, onNavigate }) => {
  const category: CorporateGiftingCategory =
    getCorporateGiftingCategoryBySlug(categorySlug) ||
    CORPORATE_GIFTING_CATEGORIES[0];

  const images = category.images && category.images.length > 0 ? category.images : [category.primaryImage];

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [pageReady, setPageReady] = useState<boolean>(false);

  // Trigger entrance animation shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setActiveImageIdx((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  const otherCategories = CORPORATE_GIFTING_CATEGORIES.filter(
    (c) => c.slug !== category.slug
  );

  const whatsappMessage = encodeURIComponent(
    `Hello Aanant Enterprises, I would like to inquire about Diwali 2026 Corporate Gifting solutions for "${category.title}".`
  );
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${whatsappMessage}`;

  return (
    <main
      className="bg-transparent text-white min-h-screen pt-3 sm:pt-4 pb-12 relative overflow-hidden select-none"
      role="main"
    >
      {/* ── Background Diwali Ambience & Radiant Lighting ── */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[850px] h-[350px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.16) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-24 right-1/4 w-[650px] h-[650px] rounded-full pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle, ${category.accentColor}25 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)`,
        }}
      />
      <div
        className="absolute top-1/2 left-10 w-[550px] h-[550px] rounded-full pointer-events-none opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, rgba(255, 107, 0, 0.1) 45%, transparent 70%)',
        }}
      />

      <div
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 transition-all duration-500 ${
          pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >

        {/* ── Breadcrumb & Navigation ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
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
              onClick={() => onNavigate('service-corporate-gifting')}
              className="hover:text-brand-orange transition-colors"
            >
              Corporate Gifting
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold truncate">
              {category.title}
            </span>
          </nav>

          <button
            onClick={() => onNavigate('service-corporate-gifting')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Corporate Gifting</span>
          </button>
        </div>

        {/* ── Header Banner with Diwali Festive Accents ── */}
        <div className="rounded-3xl border border-amber-500/30 bg-[#0E1628]/90 backdrop-blur-xl p-5 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <RealisticDiya size={32} className="shrink-0 -mt-1 hidden sm:inline-flex" />
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border shadow-sm"
                style={{
                  backgroundColor: `${category.accentColor}20`,
                  borderColor: `${category.accentColor}50`,
                  color: category.accentColor,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{category.badge} • Diwali 2026 Collection</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {category.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              {category.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire About {category.title}</span>
              </a>

              <span className="text-xs font-mono text-slate-400">
                Custom laser branding • Samples available on request
              </span>
            </div>
          </div>

          <div className="absolute right-6 -bottom-6 opacity-30 lg:opacity-60 pointer-events-none">
            <RealisticDiya size={110} />
          </div>
        </div>

        {/* ── Product Showcase Gallery & Details Split Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (7 cols): Main Product Image Showcase with Lightbox */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className="relative h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#090E1A] via-[#0E1628] to-[#121A2D] flex items-center justify-center p-6 group cursor-pointer shadow-2xl"
              onClick={() => setIsLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsLightboxOpen(true);
              }}
              aria-label="Click to enlarge product image"
            >
              {/* Radial backlight */}
              <div
                className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ backgroundColor: category.accentColor }}
              />

              {/* Pedestal Shadow */}
              <div className="absolute bottom-6 inset-x-16 h-8 rounded-full bg-black/70 blur-md pointer-events-none" />

              <img
                src={images[activeImageIdx]}
                alt={`${category.title} Specimen ${activeImageIdx + 1}`}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
              />

              {/* Click to Enlarge Badge */}
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-300 opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Click to Enlarge</span>
              </div>
            </div>

            {/* Thumbnail Row if Multiple Images Exist */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border p-2 bg-[#0E1628] shrink-0 transition-all ${
                      idx === activeImageIdx
                        ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Features, Customization & In-House Production ── */}
          <div className="lg:col-span-5 space-y-6">

            {/* Key Features */}
            <div className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Specifications & Highlights</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {category.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customization Options */}
            <div className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>Branding & Customization Capabilities</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.customizationOptions.map((opt, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-electric" />
                <span>Recommended Applications</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.applications.map((app, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-brand-electric/10 border border-brand-electric/25 text-brand-electric"
                  >
                    • {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Asset Configuration Note (per client instruction) */}
            <div className="rounded-2xl p-4 bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-mono font-bold text-amber-300">
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Catalog Asset Location</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                Directory: <code className="text-amber-200">{category.assetConfig.folder}</code><br />
                Dimensions: <span className="text-slate-200">{category.assetConfig.recommendedDimensions}</span><br />
                {category.assetConfig.notes}
              </p>
            </div>

          </div>
        </div>

        {/* ── Browse Other Corporate Gifting Categories ── */}
        <section className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Explore More Corporate Gifting Categories
            </h3>
            <button
              onClick={() => onNavigate('service-corporate-gifting')}
              className="text-xs font-mono text-brand-orange hover:underline flex items-center gap-1"
            >
              <span>View All 8 Categories</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {otherCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => onNavigate(c.route)}
                className="p-3 rounded-2xl border border-white/10 hover:border-amber-400/50 bg-[#0E1628] hover:bg-[#131C35] transition-all text-left group flex flex-col justify-between h-36"
              >
                <div className="h-16 w-full flex items-center justify-center p-1">
                  <img
                    src={c.primaryImage}
                    alt={c.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white group-hover:text-amber-200 truncate">
                    {c.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">
                    {c.badge}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

      </div>

      {/* ── Lightbox Modal for Full-Screen Product Viewing ── */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev/Next buttons if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length)
                  }
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev + 1) % images.length)}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Modal Image */}
            <div className="max-h-[75vh] w-full flex items-center justify-center p-4">
              <img
                src={images[activeImageIdx]}
                alt={`${category.title} Specimen ${activeImageIdx + 1}`}
                className="max-h-[70vh] max-w-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Caption */}
            <div className="text-center mt-3 text-xs font-mono text-slate-300">
              <span className="font-bold text-white">{category.title}</span> — Image {activeImageIdx + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

