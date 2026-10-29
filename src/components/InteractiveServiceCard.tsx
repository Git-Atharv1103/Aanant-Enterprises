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

  // Check reduced motion preference listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Timed image transition / moving slideshow inside card
  useEffect(() => {
    if (prefersReducedMotion || service.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
    }, timing);

    return () => clearInterval(interval);
  }, [service.images.length, timing, prefersReducedMotion]);

  // 3D Card Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const ry = (x / (rect.width / 2)) * 6; // max 6deg
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
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E1628] transition-all duration-300 cursor-pointer shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange h-[420px] sm:h-[460px] flex flex-col justify-end text-left select-none"
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        boxShadow: isHovered
          ? `0 24px 48px -12px rgba(0,0,0,0.7), 0 0 24px -4px ${service.accentColor}40`
          : undefined,
        borderColor: isHovered ? `${service.accentColor}60` : undefined,
      }}
      aria-label={`${service.title} — Click to view service details`}
    >
      {/* ── Slideshow Background Images (Smooth Crossfade) ── */}
      <div className="absolute inset-0 overflow-hidden">
        {service.images.map((imgUrl, imgIdx) => (
          <img
            key={`${service.id}-img-${imgIdx}`}
            src={imgUrl}
            alt={`${service.title} visual sample ${imgIdx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              imgIdx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${
              /* Card 1 & 4 Image Zoom on Hover */
              service.hoverType === 'corporate'
                ? 'group-hover:scale-110'
                : service.hoverType === 'personalised'
                ? 'group-hover:scale-108'
                : 'group-hover:scale-105'
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}

        {/* Multi-Stop High-Contrast Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-[#0B1020]/75 to-black/35 pointer-events-none" />
      </div>

      {/* ── CARD 2 SPECIFIC HOVER: Industrial Laser Scan Highlight ── */}
      {service.hoverType === 'industrial' && (
        <div
          className="absolute inset-x-0 h-1 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:animate-laser-scan z-20"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #3478F6 30%, #60A5FA 50%, #3478F6 70%, transparent 100%)',
            boxShadow: '0 0 16px 2px rgba(52, 120, 246, 0.8)',
          }}
        />
      )}

      {/* ── CARD 3 SPECIFIC HOVER: MDF & Acrylic Layered Cutout Plate Effect ── */}
      {service.hoverType === 'mdf-acrylic' && (
        <div
          className="absolute inset-3 rounded-2xl border border-cyan-400/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 z-10"
          style={{
            boxShadow: 'inset 0 0 16px rgba(0, 229, 255, 0.1)',
          }}
        />
      )}

      {/* ── Top Header Strip: Index & Badge ── */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <span className="font-mono text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/60 text-white/80 backdrop-blur-md border border-white/10 shadow-sm">
          0{index + 1}
        </span>

        <span
          className="text-xs px-3 py-1 rounded-full backdrop-blur-md font-bold border transition-colors shadow-sm"
          style={{
            backgroundColor: `${service.accentColor}18`,
            borderColor: `${service.accentColor}40`,
            color: service.accentColor,
          }}
        >
          {service.badge}
        </span>
      </div>

      {/* ── Slide Progress Indicator Dots ── */}
      <div className="absolute top-14 left-4 z-20 flex items-center gap-1.5">
        {service.images.map((_, dotIdx) => (
          <span
            key={dotIdx}
            className={`h-1 rounded-full transition-all duration-500 ${
              dotIdx === currentImageIndex
                ? 'w-5 bg-white'
                : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* ── Card Content Body (Title, Description, CTA) ── */}
      <div className="relative z-20 p-6 sm:p-7 space-y-3.5">
        {/* Service Title & Icon with specific hover movement */}
        <div
          className={`flex items-start justify-between gap-3 transition-transform duration-300 ${
            service.hoverType === 'corporate'
              ? 'group-hover:-translate-y-1'
              : ''
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${service.accentColor}20`,
                borderColor: `${service.accentColor}40`,
                color: service.accentColor,
              }}
            >
              <IconComponent className="w-4 h-4" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Short, Clear Description */}
        <p className="text-sm text-slate-300 leading-relaxed font-light line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Bottom Navigation Indicator Strip */}
        <div className="pt-2 flex items-center justify-between border-t border-white/10">
          <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-1">
            <span>Explore Service</span>
          </span>

          {/* Small Arrow Icon */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
              service.hoverType === 'personalised'
                ? 'opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white'
                : service.hoverType === 'corporate'
                ? 'group-hover:-translate-y-1 group-hover:translate-x-1'
                : 'group-hover:translate-x-1 group-hover:-translate-y-1'
            }`}
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
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
