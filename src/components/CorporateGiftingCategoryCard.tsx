import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
import type { CorporateGiftingCategory } from '../data/corporateGiftingData';

interface CorporateGiftingCategoryCardProps {
  category: CorporateGiftingCategory;
  index: number;
  onNavigate: (route: string) => void;
}

export const CorporateGiftingCategoryCard: React.FC<CorporateGiftingCategoryCardProps> = ({
  category,
  index,
  onNavigate,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion || isOpening) return;
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

  const triggerOpen = () => {
    if (isOpening) return;

    if (prefersReducedMotion) {
      onNavigate(category.route);
      return;
    }

    setIsOpening(true);
    // 400ms transition time for animation to flourish before page view transition
    setTimeout(() => {
      onNavigate(category.route);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerOpen();
    }
  };

  // Distinctive animation transform classes based on openingAnimationType
  const getImageTransformClass = () => {
    if (!isOpening) return '';

    switch (category.openingAnimationType) {
      case 'pen-rotate':
        // Pen smoothly enlarges and rotates slightly into display position
        return 'scale-125 -rotate-12 translate-y-[-10px] duration-500 ease-out';
      case 'bag-expand':
        // Bag smoothly expands into a larger product showcase
        return 'scale-130 translate-y-[-6px] duration-500 ease-out';
      case 'diary-reveal':
        // Book-reveal / page-opening 3D flip effect
        return 'scale-120 rotate-y-[35deg] translate-x-2 duration-500 ease-out';
      case 'bottle-3d':
        // Bottle moves into centre with gentle 3D rotation
        return 'scale-125 rotate-6 translate-y-[-12px] duration-500 ease-out';
      case 'combo-unboxing':
        // Gift-box reveal / unboxing zoom
        return 'scale-125 translate-y-[-8px] filter brightness-110 duration-500 ease-out';
      case 'accessories-lift':
        // Desktop accessories slide and lift
        return 'scale-120 -translate-y-4 duration-500 ease-out';
      case 'giftbox-open':
        // Luxury box unboxing & lid lift
        return 'scale-125 -translate-y-3 rotate-2 duration-500 ease-out';
      case 'laser-shimmer':
        // Laser beam pulse & holographic shimmer
        return 'scale-125 filter brightness-125 drop-shadow-[0_0_25px_rgba(236,72,153,0.8)] duration-500 ease-out';
      default:
        return 'scale-120 duration-500 ease-out';
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={triggerOpen}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      aria-label={`${category.title} — Explore corporate gifting collection`}
      className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E1628]/95 transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange h-[500px] ${
        isOpening ? 'scale-[1.02] border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.35)]' : ''
      }`}
      style={{
        transform: prefersReducedMotion || isOpening
          ? undefined
          : `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        boxShadow: isHovered && !isOpening
          ? `0 24px 50px -12px rgba(0,0,0,0.8), 0 0 30px -4px ${category.accentColor}45`
          : undefined,
        borderColor: isHovered && !isOpening ? `${category.accentColor}80` : undefined,
      }}
    >
      {/* ── Top Visual Surface with Ambient Glow ── */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center p-6 border-b border-white/5 bg-gradient-to-br from-[#090E1A] via-[#0E1628] to-[#121A2D]">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />

        {/* Ambient Backlight Glow */}
        <div
          className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isHovered ? 'opacity-70 scale-125' : 'opacity-30'
          }`}
          style={{ backgroundColor: category.accentColor }}
        />

        {/* Ground Pedestal Shadow */}
        <div className="absolute bottom-4 inset-x-12 h-6 rounded-full bg-black/60 blur-md pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border"
            style={{
              backgroundColor: `${category.accentColor}25`,
              color: category.accentColor,
              borderColor: `${category.accentColor}50`,
            }}
          >
            {category.badge}
          </span>

          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            0{index + 1}
          </span>
        </div>

        {/* Product Image Area with Object-Contain & Custom Animation */}
        <div className="relative w-full h-full flex items-center justify-center z-10">
          <img
            src={category.primaryImage}
            alt={category.title}
            loading={index < 4 ? 'eager' : 'lazy'}
            className={`max-h-full max-w-full object-contain filter drop-shadow-[0_18px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105 ${getImageTransformClass()}`}
          />
        </div>

        {/* Opening Sparkle Ripple Effect */}
        {isOpening && (
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent animate-pulse pointer-events-none z-30 flex items-center justify-center">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-black/70 px-3 py-1 rounded-full border border-amber-400/40">
              Opening Showcase...
            </span>
          </div>
        )}
      </div>

      {/* ── Bottom Content & Action Area ── */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#0E1628]/95 to-[#0A0F1D]/95">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors flex items-center justify-between">
            <span>{category.title}</span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm shrink-0"
              style={{
                backgroundColor: `${category.accentColor}20`,
                color: category.accentColor,
                border: `1px solid ${category.accentColor}40`,
              }}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-light">
            {category.shortDescription}
          </p>
        </div>

        {/* Bottom Feature Badges & Action CTA */}
        <div className="space-y-3 pt-2 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {category.features.slice(0, 2).map((feat, i) => (
              <span
                key={i}
                className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10 truncate max-w-full"
              >
                ✓ {feat}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold pt-1">
            <span className="text-amber-300/90 font-mono text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Diwali 2026 Ready</span>
            </span>

            <span className="text-slate-300 group-hover:text-white flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider">
              <span>Explore Products</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
