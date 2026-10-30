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

  // Map openingAnimationType → CSS animation class (keyframe-driven, not Tailwind transforms)
  const getImageAnimClass = (): string => {
    if (!isOpening) return '';
    const map: Record<string, string> = {
      'pen-rotate':        'card-anim-pen-rotate',
      'bag-expand':        'card-anim-bag-expand',
      'diary-reveal':      'card-anim-diary-reveal',
      'bottle-3d':         'card-anim-bottle-3d',
      'combo-unboxing':    'card-anim-combo-unboxing',
      'accessories-lift':  'card-anim-accessories-lift',
      'giftbox-open':      'card-anim-giftbox-open',
      'laser-shimmer':     'card-anim-laser-shimmer',
    };
    return map[category.openingAnimationType] ?? 'card-anim-pen-rotate';
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
      className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E1628]/95 transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange h-[460px] sm:h-[480px] ${
        isOpening
          ? 'scale-[1.025] border-amber-400/80 shadow-[0_0_45px_rgba(245,158,11,0.40)] ring-2 ring-amber-400/60 ring-offset-2 ring-offset-transparent'
          : ''
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
            className={`max-h-[85%] max-w-[85%] object-contain filter drop-shadow-[0_18px_30px_rgba(0,0,0,0.7)] ${
              isOpening
                ? getImageAnimClass()
                : 'transition-transform duration-500 group-hover:scale-105'
            }`}
          />
        </div>

        {/* Opening Golden Shimmer Overlay */}
        {isOpening && (
          <div className="absolute inset-0 pointer-events-none z-30 flex flex-col items-center justify-center gap-2">
            {/* Radial golden burst from centre */}
            <div
              className="absolute inset-0 card-opening-shimmer"
              style={{
                background: `radial-gradient(ellipse at 50% 55%, ${category.accentColor}40 0%, ${category.accentColor}18 42%, transparent 70%)`,
              }}
            />
            {/* Top golden sweep */}
            <div className="absolute inset-0 card-opening-shimmer bg-gradient-to-t from-amber-500/25 via-transparent to-transparent" />
            {/* Status pill */}
            <span className="relative z-10 text-xs font-mono font-bold text-amber-200 uppercase tracking-widest bg-black/75 px-3 py-1 rounded-full border border-amber-400/50 shadow-lg mt-auto mb-4">
              Opening Showcase…
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

