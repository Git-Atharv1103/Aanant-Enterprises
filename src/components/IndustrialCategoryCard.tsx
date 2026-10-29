import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import type { IndustrialLabellingCategory } from '../data/industrialLabellingData';

interface IndustrialCategoryCardProps {
  category: IndustrialLabellingCategory;
  index: number;
  onNavigate: (route: string) => void;
}

export const IndustrialCategoryCard: React.FC<IndustrialCategoryCardProps> = ({
  category,
  index,
  onNavigate,
}) => {
  const images = category.images && category.images.length > 0 ? category.images : [];
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Continuous auto-sliding through all category images
  useEffect(() => {
    if (images.length <= 1 || prefersReducedMotion || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3400);

    return () => clearInterval(timer);
  }, [images.length, prefersReducedMotion, isHovered]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const ry = (x / (rect.width / 2)) * 6;
    const rx = -(y / (rect.height / 2)) * 6;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setIsHovered(false);
  };

  const handleCardClick = () => {
    onNavigate(category.route);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate(category.route);
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      aria-label={`${category.title} — Explore industrial labelling products`}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E1628]/95 transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange h-[520px]"
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        boxShadow: isHovered
          ? `0 24px 50px -12px rgba(0,0,0,0.8), 0 0 30px -4px ${category.accentColor}45`
          : undefined,
        borderColor: isHovered ? `${category.accentColor}80` : undefined,
      }}
    >
      {/* ── Top Ambient Lighting Surface with Continuous Image Showcase ── */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center p-6 border-b border-white/5 bg-gradient-to-br from-[#090E1A] via-[#0E1628] to-[#121A2D]">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />

        {/* Ambient Backlight Glow behind transparent product */}
        <div
          className="absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-30 group-hover:opacity-75 group-hover:scale-110"
          style={{ backgroundColor: category.accentColor }}
        />

        {/* Soft ground pedestal glow */}
        <div className="absolute bottom-4 inset-x-12 h-6 rounded-full bg-black/60 blur-md pointer-events-none" />

        {/* Images Sliding Area */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.length > 0 ? (
            images.map((imgSrc, imgIndex) => {
              const isActive = imgIndex === currentIdx;
              return (
                <div
                  key={imgSrc}
                  className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-700 ease-out ${
                    isActive
                      ? 'opacity-100 scale-100 translate-x-0 z-10'
                      : 'opacity-0 scale-95 translate-x-4 pointer-events-none z-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={imgSrc}
                    alt={`${category.title} Specimen ${imgIndex + 1}`}
                    loading={imgIndex === 0 ? 'eager' : 'lazy'}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_18px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4 space-y-2 z-10">
              <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
              <span className="text-xs font-mono text-slate-300">Specimen In Preparation</span>
            </div>
          )}
        </div>

        {/* Top Badges: Index Number & Classification */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="font-mono text-[11px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md bg-black/70 text-white/90 backdrop-blur-md border border-white/10 shadow-sm">
            0{index + 1}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Industrial Grade</span>
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <span
            className="text-[11px] font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md border shadow-md flex items-center gap-1.5"
            style={{
              backgroundColor: `${category.accentColor}20`,
              borderColor: `${category.accentColor}50`,
              color: category.accentColor,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: category.accentColor }}
            />
            {category.badge}
          </span>
        </div>

        {/* Bottom Slide Indicators & Controls (if multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
            {/* Interactive Dots */}
            <div className="flex items-center gap-1.5 pointer-events-auto bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIdx(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIdx
                      ? 'w-5 bg-brand-orange'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Counter Badge */}
            <div className="flex items-center gap-1">
              {/* Optional Prev/Next Mini Controls visible on hover */}
              <div
                className={`flex items-center gap-1 transition-opacity duration-200 pointer-events-auto ${
                  isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0'
                }`}
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="w-6 h-6 rounded-full bg-black/70 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="w-6 h-6 rounded-full bg-black/70 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="font-mono text-[10px] text-slate-300 font-bold bg-black/70 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-md">
                {currentIdx + 1} / {images.length}
              </span>
            </div>
          </div>
        )}

        {/* Single Image Badge (e.g. Panel Door Locks) */}
        {images.length === 1 && (
          <div className="absolute bottom-3 right-4 z-20">
            <span className="font-mono text-[10px] text-slate-400 bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
              1 Specimen Photo
            </span>
          </div>
        )}
      </div>

      {/* ── Stable Card Information Body ── */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
            {category.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light line-clamp-3">
            {category.shortDescription}
          </p>

          {/* Quick Technical Highlight Chips */}
          {category.features && category.features.length > 0 && (
            <div className="pt-1 flex flex-wrap gap-1.5">
              {category.features.slice(0, 2).map((feat, fi) => (
                <span
                  key={fi}
                  className="inline-flex items-center text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-orange mr-1.5" />
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Bottom Fixed Action Button Strip (Stable, never slides) ── */}
        <div className="pt-3 flex items-center justify-between border-t border-white/10">
          <span className="text-xs font-mono font-semibold text-slate-300 group-hover:text-white transition-colors flex items-center gap-1">
            <span>Explore Products</span>
            <span className="text-brand-orange font-bold">({images.length} {images.length === 1 ? 'item' : 'items'})</span>
          </span>

          <div
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-brand-orange group-hover:text-white shadow-md"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.18)',
              color: '#FFFFFF',
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Bottom Accent Glow Line */}
      <div
        className="absolute bottom-0 inset-x-0 h-1 transition-all duration-300 opacity-60 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${category.accentColor} 50%, transparent 100%)`,
        }}
      />
    </div>
  );
};
