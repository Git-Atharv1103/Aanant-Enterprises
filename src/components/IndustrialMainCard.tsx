import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, Tag, Lock, Shield } from 'lucide-react';
import type { IndustrialLabellingMainCard } from '../data/industrialLabellingData';

interface IndustrialMainCardProps {
  card: IndustrialLabellingMainCard;
  index: number;
  onNavigate: (route: string) => void;
}

const cardIcons: Record<string, React.ElementType> = {
  'card-1-nameplates': Shield,
  'card-2-labels-plates': Tag,
  'card-3-door-locks': Lock,
};

export const IndustrialMainCard: React.FC<IndustrialMainCardProps> = ({
  card,
  index,
  onNavigate,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const images = card.allImages;
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;
  const IconComponent = cardIcons[card.id] || Sparkles;

  // ── Continuous Sliding / Cycling Effect ──
  useEffect(() => {
    if (!hasMultipleImages) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // Slow down or pause when hovered
    const intervalTime = isHovered ? 4500 : 2800;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [hasMultipleImages, images.length, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate(card.route);
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onNavigate(card.route)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E1628] transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange h-[480px]"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        boxShadow: isHovered
          ? `0 28px 56px -12px rgba(0,0,0,0.8), 0 0 30px -4px ${card.accentColor}45`
          : '0 16px 36px -10px rgba(0,0,0,0.6)',
        borderColor: isHovered ? `${card.accentColor}80` : undefined,
      }}
      aria-label={`${card.title} — Click to inspect category details and product gallery`}
    >
      {/* ── TOP IMAGE SHOWCASE AREA with Continuous Sliding Background ── */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#070B16] via-[#0A1020] to-[#0E1628] border-b border-white/5">
        
        {/* Subtle grid pattern inside image area */}
        <div className="absolute inset-0 industrial-grid-dark opacity-20 pointer-events-none z-0" />

        {/* Ambient Backlight Glow behind transparent product */}
        <div
          className="absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-75 z-0"
          style={{ backgroundColor: card.accentColor }}
        />

        {/* ── SLIDING IMAGES CONTAINER ── */}
        {hasImages ? (
          <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
            {images.map((imgSrc, idx) => {
              const isActive = idx === currentImageIndex;
              return (
                <div
                  key={imgSrc}
                  className={`absolute inset-0 p-6 flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={`${card.title} showcase item ${idx + 1}`}
                    className={`max-h-full max-w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Clean industrial state when awaiting uploads */
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 shadow-lg"
              style={{
                backgroundColor: `${card.accentColor}18`,
                borderColor: `${card.accentColor}40`,
                color: card.accentColor,
              }}
            >
              <IconComponent className="w-7 h-7" />
            </div>
            <div className="text-sm font-mono text-slate-200 font-semibold">
              {card.title}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: card.accentColor }} />
              <span>Awaiting uploaded photographs</span>
            </div>
          </div>
        )}

        {/* ── Dark Gradient Scrim to ensure text separation ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1628] via-transparent to-transparent opacity-80 pointer-events-none z-10" />

        {/* ── Top Left: Card Sequence Number ── */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="font-mono text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg bg-black/75 text-white/90 backdrop-blur-md border border-white/10 shadow-md">
            CARD 0{index + 1}
          </span>
        </div>

        {/* ── Top Right: Badge & Sliding Image Counter ── */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {hasMultipleImages && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/70 text-slate-300 border border-white/10 backdrop-blur-md">
              {currentImageIndex + 1} / {images.length}
            </span>
          )}

          <span
            className="text-[11px] font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md border shadow-md"
            style={{
              backgroundColor: `${card.accentColor}20`,
              borderColor: `${card.accentColor}50`,
              color: card.accentColor,
            }}
          >
            {card.badge}
          </span>
        </div>

        {/* ── Bottom Mini-Ticker Indicator of Active Slide ── */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 inset-x-0 z-20 flex justify-center items-center gap-1.5 pointer-events-none">
            {images.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  dotIdx === currentImageIndex
                    ? 'w-5 bg-white shadow-sm'
                    : 'w-1.5 bg-white/30'
                }`}
                style={{
                  backgroundColor: dotIdx === currentImageIndex ? card.accentColor : undefined,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── CARD INFORMATION BODY ── */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-[#0E1628]">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
            {card.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light line-clamp-2">
            {card.shortDescription}
          </p>

          {/* Subcategories Inclusion Chips */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {card.subcategories.map((sub) => (
              <span
                key={sub.id}
                className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: card.accentColor }}
                />
                <span>{sub.title}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Strip */}
        <div className="pt-3 flex items-center justify-between border-t border-white/10">
          <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors flex items-center gap-1.5">
            <span>Explore Subcategories & Gallery</span>
          </span>

          <div
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-brand-orange group-hover:text-white shadow-md"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.15)',
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
          background: `linear-gradient(90deg, transparent 0%, ${card.accentColor} 50%, transparent 100%)`,
        }}
      />
    </div>
  );
};
