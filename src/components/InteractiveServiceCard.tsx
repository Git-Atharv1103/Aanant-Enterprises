import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, Zap, Layers, Gift } from 'lucide-react';
import type { FlagshipService } from '../types';

interface InteractiveServiceCardProps {
  service: FlagshipService;
  index: number;
  timing: number;
  onNavigate: (route: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  corporate: Gift,
  industrial: Zap,
  'mdf-acrylic': Layers,
  personalised: Sparkles,
};

export const InteractiveServiceCard: React.FC<InteractiveServiceCardProps> = ({
  service,
  index,
  timing,
  onNavigate,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Timed image transition
  useEffect(() => {
    if (prefersReducedMotion || service.images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
    }, timing);

    return () => clearInterval(interval);
  }, [service.images.length, timing, prefersReducedMotion, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
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
      onNavigate(service.route);
    }
  };

  const IconComponent = iconMap[service.hoverType] || Sparkles;

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onNavigate(service.route)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E1628]/95 transition-all duration-300 cursor-pointer shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange h-[480px] flex flex-col justify-between text-left select-none"
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        boxShadow: isHovered
          ? `0 24px 48px -12px rgba(0,0,0,0.8), 0 0 24px -4px ${service.accentColor}40`
          : undefined,
        borderColor: isHovered ? `${service.accentColor}70` : undefined,
      }}
      aria-label={`${service.title} — Click to view service details`}
    >
      {/* ── UPPER DEDICATED IMAGE SHOWCASE ZONE (Aligned fixed height h-56) ── */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#090E1A] to-[#121A2D] border-b border-white/5">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 industrial-grid-dark opacity-20 pointer-events-none" />

        {/* Ambient Backlight Behind Product */}
        <div
          className="absolute w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 opacity-25 group-hover:opacity-70"
          style={{ backgroundColor: service.accentColor }}
        />

        {/* Images Sliding with Crossfade */}
        {service.images.map((imgUrl, imgIdx) => (
          <div
            key={`${service.id}-img-${imgIdx}`}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              imgIdx === currentImageIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
            }`}
          >
            <img
              src={imgUrl}
              alt={`${service.title} specimen ${imgIdx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Subtle Gradient Shade at bottom of image zone */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1628] via-transparent to-black/30 pointer-events-none z-10" />

        {/* Top Header Strip: Index & Classification Badge */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between">
          <span className="font-mono text-[11px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-md bg-black/70 text-white/90 backdrop-blur-md border border-white/10 shadow-sm">
            0{index + 1}
          </span>

          <span
            className="text-[11px] px-2.5 py-0.5 rounded-full backdrop-blur-md font-bold border transition-colors shadow-sm"
            style={{
              backgroundColor: `${service.accentColor}20`,
              borderColor: `${service.accentColor}50`,
              color: service.accentColor,
            }}
          >
            {service.badge}
          </span>
        </div>

        {/* Slide Progress Dots */}
        {service.images.length > 1 && (
          <div className="absolute bottom-3 left-4 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
            {service.images.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  dotIdx === currentImageIndex ? 'w-4 bg-brand-orange' : 'w-1 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── LOWER CONTENT BODY (Aligned Headings, Description & CTA) ── */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-3 z-10">
        <div className="space-y-2">
          {/* Service Title with Icon */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${service.accentColor}20`,
                borderColor: `${service.accentColor}40`,
                color: service.accentColor,
              }}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
              {service.title}
            </h3>
          </div>

          {/* Description with fixed clamp for alignment */}
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Bottom Pinned Action Strip */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-slate-300 group-hover:text-white transition-colors flex items-center gap-1">
            <span>Explore Service</span>
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
          background: `linear-gradient(90deg, transparent 0%, ${service.accentColor} 50%, transparent 100%)`,
        }}
      />
    </div>
  );
};
