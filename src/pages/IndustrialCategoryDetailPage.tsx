import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Mail,
  Phone,
  Sparkles,
  Camera,
  FolderOpen,
  ZoomIn,
  X,
  MessageCircle,
  Shield,
  Layers,
  Wrench,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';
import {
  getIndustrialCategoryBySlug,
  INDUSTRIAL_LABELLING_CATEGORIES,
  type IndustrialLabellingCategory,
} from '../data/industrialLabellingData';
import { COMPANY_INFO } from '../data/companyData';
import { RealisticDiya } from '../components/DiwaliFestiveDecor';

interface IndustrialCategoryDetailPageProps {
  categorySlug: string;
  onNavigate: (route: string) => void;
}

export const IndustrialCategoryDetailPage: React.FC<IndustrialCategoryDetailPageProps> = ({
  categorySlug,
  onNavigate,
}) => {
  // Normalize alias
  const normalizedSlug = categorySlug === 'trafolite-labelling' ? 'trafolite-plates' : categorySlug;
  const activeCategory: IndustrialLabellingCategory =
    getIndustrialCategoryBySlug(normalizedSlug) ||
    INDUSTRIAL_LABELLING_CATEGORIES[0];

  const images = activeCategory.images || [];

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  // Keyboard navigation for modal
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalIndex(null);
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setActiveModalIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setActiveModalIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, images.length]);

  // Other 4 categories for bottom quick switcher
  const otherCategories = INDUSTRIAL_LABELLING_CATEGORIES.filter(
    (c) => c.slug !== activeCategory.slug
  );

  const whatsappMessage = encodeURIComponent(
    `Hello Aanant Enterprises, I am interested in inquiring about ${activeCategory.title} for our industrial labelling requirements.`
  );
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${whatsappMessage}`;

  return (
    <main className="bg-transparent text-white min-h-screen pt-3 sm:pt-4 pb-12 relative overflow-hidden" role="main">
      {/* Background Ambience */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <div
        className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeCategory.accentColor}18 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">

        {/* ── Breadcrumb Navigation ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-brand-orange transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={() => onNavigate('services/industrial-labelling')}
              className="hover:text-brand-orange transition-colors"
            >
              Industrial Labelling
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold truncate">{activeCategory.title}</span>
          </nav>

          <button
            onClick={() => onNavigate('services/industrial-labelling')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 5 Categories</span>
          </button>
        </div>

        {/* ── Header Banner for the Category ── */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1628]/85 backdrop-blur-xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-5 max-w-3xl">
            <div className="flex items-center gap-3">
              <RealisticDiya size={30} className="shrink-0 -mt-1 hidden sm:inline-flex" />
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border shadow-sm"
                style={{
                  backgroundColor: `${activeCategory.accentColor}15`,
                  borderColor: `${activeCategory.accentColor}40`,
                  color: activeCategory.accentColor,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeCategory.badge}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              {activeCategory.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              {activeCategory.description}
            </p>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Quote%20Request%20-%20${encodeURIComponent(activeCategory.title)}`}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 transition-all flex items-center gap-2 shadow-glow-orange"
              >
                <Mail className="w-4 h-4" />
                <span>Request Custom Quote</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call Workshop</span>
              </a>
            </div>
          </div>

          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: activeCategory.accentColor }}
          />
        </div>

        {/* ── Technical Specifications & Engineering Properties ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Key Features */}
          <div className="p-6 rounded-2xl bg-[#0E1628]/70 border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-2 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-brand-orange" />
              <span>Durability & Resistance</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeCategory.features?.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials & Finishes */}
          <div className="p-6 rounded-2xl bg-[#0E1628]/70 border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-2 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-brand-orange" />
              <span>Materials & Substrates</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeCategory.materials?.map((m, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div className="p-6 rounded-2xl bg-[#0E1628]/70 border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-2 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
              <Wrench className="w-4 h-4 text-brand-orange" />
              <span>Fixation & Environments</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeCategory.applications?.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Product Photo Gallery (Actual Transparent Photographs) ── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: activeCategory.accentColor }}
                />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  High-Resolution Product Gallery
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeCategory.title} Specimen Gallery
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
                Click any specimen to inspect high-resolution details, engraving lines, and surface finish.
              </p>
            </div>

            <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 shrink-0">
              <FolderOpen className="w-3.5 h-3.5 text-brand-orange" />
              <span>{images.length} Verified Photos Active</span>
            </div>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((imgSrc, idx) => (
                <div
                  key={imgSrc}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E1628] transition-all duration-300 hover:border-white/30 hover:shadow-2xl flex flex-col cursor-pointer"
                  onClick={() => setActiveModalIndex(idx)}
                >
                  {/* Transparent Product Surface */}
                  <div className="relative h-64 w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#070B16] via-[#0A1020] to-[#0E1628] border-b border-white/5">
                    <div className="absolute inset-0 industrial-grid-dark opacity-15 pointer-events-none" />

                    {/* Soft backlight */}
                    <div
                      className="absolute w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"
                      style={{ backgroundColor: activeCategory.accentColor }}
                    />

                    <img
                      src={imgSrc}
                      alt={`${activeCategory.title} Specimen ${idx + 1}`}
                      className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Zoom Icon Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Specimen Index Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="font-mono text-[10px] text-white/70 bg-black/70 px-2 py-0.5 rounded border border-white/10">
                        #{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Label */}
                  <div className="p-4 flex items-center justify-between bg-[#0B1020]/80">
                    <span className="text-xs font-mono font-medium text-slate-200">
                      {activeCategory.title} Specimen
                    </span>
                    <span className="text-[10px] font-mono text-brand-orange">
                      Inspect
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#0E1628]/40 p-12 text-center space-y-3">
              <Camera className="w-10 h-10 text-brand-orange mx-auto opacity-70" />
              <h3 className="text-base font-semibold text-white">
                Photographs Being Updated
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Product images for this folder are currently being processed. You can still inquire with our workshop team.
              </p>
            </div>
          )}
        </section>

        {/* ── Switcher: Explore Other Categories ── */}
        <section className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Explore Other Industrial Labelling Categories
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {otherCategories.length} Categories Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCategories.map((other) => (
              <button
                key={other.id}
                onClick={() => {
                  onNavigate(other.route);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-brand-orange/40 transition-all text-left group"
              >
                <div className="text-[10px] font-mono font-bold text-brand-orange uppercase">
                  {other.badge}
                </div>
                <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5">
                  {other.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                  {other.images.length} photos available
                </div>
              </button>
            ))}
          </div>
        </section>

      </div>

      {/* ── High-Resolution Lightbox Modal ── */}
      {activeModalIndex !== null && images[activeModalIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
          onClick={() => setActiveModalIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button & Info */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <div>
                <span className="text-xs font-mono text-brand-orange uppercase font-bold">
                  {activeCategory.title}
                </span>
                <span className="ml-3 text-xs font-mono text-slate-400">
                  {activeModalIndex + 1} of {images.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalIndex(null)}
                aria-label="Close Preview"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview Container */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#070B16] to-[#0E1628] border border-white/15 overflow-hidden p-6 sm:p-10">
              <div className="absolute inset-0 industrial-grid-dark opacity-20 pointer-events-none" />
              <div
                className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-40"
                style={{ backgroundColor: activeCategory.accentColor }}
              />

              <img
                src={images[activeModalIndex]}
                alt={`${activeCategory.title} Specimen ${activeModalIndex + 1}`}
                className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
              />

              {/* Prev / Next Modal Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModalIndex((prev) =>
                        prev !== null ? (prev - 1 + images.length) % images.length : 0
                      )
                    }
                    aria-label="Previous Image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-brand-orange text-white flex items-center justify-center transition-all border border-white/20 shadow-xl z-20"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModalIndex((prev) =>
                        prev !== null ? (prev + 1) % images.length : 0
                      )
                    }
                    aria-label="Next Image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-brand-orange text-white flex items-center justify-center transition-all border border-white/20 shadow-xl z-20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Details Strip */}
            <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
              <span className="font-mono text-slate-400">
                Use arrow keys ← → or buttons to navigate • Press Esc to close
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Inquire About This Specimen</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
