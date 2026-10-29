import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  icon: React.ElementType;
}

const COLUMN_ONE_ITEMS: SliderItem[] = [
  {
    id: 'p-1',
    title: 'Planner Diary Model-H3309',
    subtitle: 'Magnetic Lock • 6-Ring Binder',
    badge: 'Corporate Gifting',
    image: '/images/planner-diary-h3309.jpg',
    icon: Sparkles,
  },
  {
    id: 'p-2',
    title: 'A5 Stretchable Notebook H-3302',
    subtitle: 'Soft PU Leather • Debossed Note',
    badge: 'Corporate Gifting',
    image: '/images/notebook-diary-h3302.jpg',
    icon: Sparkles,
  },
  {
    id: 'p-3',
    title: 'Fiber Laser Marked Plates',
    subtitle: 'Permanent Industrial Marking',
    badge: 'Industrial Labelling',
    image: '/images/laser-marking-action.jpg',
    icon: Zap,
  },
  {
    id: 'p-4',
    title: 'Office Planner Diary H-1048',
    subtitle: 'Executive Belt Closure & Pockets',
    badge: 'Corporate Gifting',
    image: '/images/office-planner-h1048.jpg',
    icon: ShieldCheck,
  },
];

const COLUMN_TWO_ITEMS: SliderItem[] = [
  {
    id: 'p-5',
    title: 'Chesscrest A5 Diary H-3310',
    subtitle: 'Stylish Flap & Checkered Pattern',
    badge: 'Corporate Gifting',
    image: '/images/chesscrest-diary-h3310.jpg',
    icon: Sparkles,
  },
  {
    id: 'p-6',
    title: 'Office Planner Diary H-1072',
    subtitle: 'Button Strap & Card Organizer',
    badge: 'Corporate Gifting',
    image: '/images/office-planner-h1072.jpg',
    icon: Zap,
  },
  {
    id: 'p-7',
    title: 'Executive Corporate Gifting Suite',
    subtitle: 'Laser Marked Flasks, Pens & Sets',
    badge: 'Corporate Gifting',
    image: '/images/corporate-gifting-flyer.jpg',
    icon: Sparkles,
  },
  {
    id: 'p-8',
    title: 'Aluminium Identification Plates',
    subtitle: 'Fiber Laser Micro-Marking',
    badge: 'Industrial Labelling',
    image: '/images/industrial-labelling/aluminium-name-plates/IMG_7550.png',
    icon: ShieldCheck,
  },
];

interface ProductMarqueeSliderProps {
  onCardClick?: (serviceId: string) => void;
}

export const ProductMarqueeSlider: React.FC<ProductMarqueeSliderProps> = ({ onCardClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // 3D Parallax tilt on mouse hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxRotation = 4;
    const rotY = (x / (rect.width / 2)) * maxRotation;
    const rotX = -(y / (rect.height / 2)) * maxRotation;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // We duplicate each array to create seamless infinite vertical loop
  const colOneCombined = [...COLUMN_ONE_ITEMS, ...COLUMN_ONE_ITEMS];
  const colTwoCombined = [...COLUMN_TWO_ITEMS, ...COLUMN_TWO_ITEMS];

  const mapBadgeToService = (badge: string): string => {
    if (badge.toLowerCase().includes('corporate')) return 'corporate-gifting';
    if (badge.toLowerCase().includes('industrial') || badge.toLowerCase().includes('marking')) return 'services/industrial-labelling';
    if (badge.toLowerCase().includes('acrylic') || badge.toLowerCase().includes('mdf')) return 'mdf-acrylic-cutouts';
    return 'personalised-gifting';
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="slider-container relative w-full overflow-hidden select-none py-2"
      aria-label="Continuous Vertical Product Showcase"
    >
      {/* 3D Perspective Plane */}
      <div
        className="transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `perspective(1200px) rotateY(${-3 + rotate.y}deg) rotateX(${2 + rotate.x}deg) translateZ(0)`,
        }}
      >
        {/* Viewport Frame with Soft Vertical Fade Masks Top & Bottom */}
        <div className="relative h-[500px] sm:h-[560px] lg:h-[600px] overflow-hidden fade-edges-y">
          
          <div className="grid grid-cols-2 gap-4 sm:gap-5 h-full">

            {/* ── Column 1: Vertical Slide Moving UPWARDS ── */}
            <div className="relative overflow-hidden flex flex-col">
              <div className="marquee-track-up gap-4 sm:gap-5 flex flex-col">
                {colOneCombined.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`col1-${item.id}-${index}`}
                      onClick={() => onCardClick && onCardClick(mapBadgeToService(item.badge))}
                      className="group relative w-full h-60 sm:h-64 md:h-72 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-[#0E1628] backdrop-blur-md shadow-xl transition-all duration-300 hover:border-brand-orange/60 hover:shadow-[0_16px_36px_rgba(255,107,0,0.3)] hover:scale-[1.02] cursor-pointer"
                    >
                      {/* Background Product Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        loading={index < 4 ? 'eager' : 'lazy'}
                      />

                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/95 via-[#0B1020]/35 to-black/30 pointer-events-none" />

                      {/* Top Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-300 shadow-sm">
                          <Icon className="w-3 h-3 text-brand-orange" />
                          <span>{item.badge}</span>
                        </span>
                      </div>

                      {/* Laser scanning line on hover */}
                      <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-laser-scan pointer-events-none" />

                      {/* Bottom Metadata */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate drop-shadow-sm group-hover:text-amber-200 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-300 truncate font-light">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Column 2: Vertical Slide Moving DOWNWARDS ── */}
            <div className="relative overflow-hidden flex flex-col">
              <div className="marquee-track-down gap-4 sm:gap-5 flex flex-col">
                {colTwoCombined.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`col2-${item.id}-${index}`}
                      onClick={() => onCardClick && onCardClick(mapBadgeToService(item.badge))}
                      className="group relative w-full h-60 sm:h-64 md:h-72 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-[#0E1628] backdrop-blur-md shadow-xl transition-all duration-300 hover:border-brand-electric/60 hover:shadow-[0_16px_36px_rgba(52,120,246,0.3)] hover:scale-[1.02] cursor-pointer"
                    >
                      {/* Background Product Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        loading={index < 4 ? 'eager' : 'lazy'}
                      />

                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/95 via-[#0B1020]/35 to-black/30 pointer-events-none" />

                      {/* Top Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-300 shadow-sm">
                          <Icon className="w-3 h-3 text-brand-electric" />
                          <span>{item.badge}</span>
                        </span>
                      </div>

                      {/* Laser scanning line on hover */}
                      <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-laser-scan pointer-events-none" />

                      {/* Bottom Metadata */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate drop-shadow-sm group-hover:text-cyan-200 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-300 truncate font-light">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Interactive Hover Hint */}
      <div className="mt-3 flex items-center justify-between px-2 text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span>Vertical Showcase • Hover to pause</span>
        </span>
        <span className="hidden sm:inline-block text-slate-500">
          Executive Gifting & Industrial Products
        </span>
      </div>
    </div>
  );
};
