import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  icon: React.ElementType;
  fitMode: 'contain' | 'cover';
  accentColor: string;
}

const COLUMN_ONE_ITEMS: SliderItem[] = [
  {
    id: 'p-1',
    title: 'Planner Diary Model H3309',
    subtitle: 'Magnetic Lock • Executive 6-Ring Binder',
    badge: 'Corporate Gifting',
    image: '/images/planner-diary-h3309.jpg',
    icon: Sparkles,
    fitMode: 'contain',
    accentColor: '#FF6B00',
  },
  {
    id: 'p-2',
    title: 'A5 Stretchable Notebook H3302',
    subtitle: 'Soft PU Leather • Debossed Note Detail',
    badge: 'Corporate Gifting',
    image: '/images/notebook-diary-h3302.jpg',
    icon: Sparkles,
    fitMode: 'contain',
    accentColor: '#FFB547',
  },
  {
    id: 'p-3',
    title: 'Fiber Laser Marking Specimen',
    subtitle: 'Permanent Micro-Scale High-Contrast',
    badge: 'Industrial Labelling',
    image: '/images/laser-marking-action.jpg',
    icon: Zap,
    fitMode: 'cover',
    accentColor: '#3478F6',
  },
  {
    id: 'p-4',
    title: 'Office Planner Diary H1048',
    subtitle: 'Executive Belt Closure & Card Sleeves',
    badge: 'Corporate Gifting',
    image: '/images/office-planner-h1048.jpg',
    icon: ShieldCheck,
    fitMode: 'contain',
    accentColor: '#FF6B00',
  },
];

const COLUMN_TWO_ITEMS: SliderItem[] = [
  {
    id: 'p-5',
    title: 'Chesscrest A5 Diary H3310',
    subtitle: 'Stylish Flap & Checkered Pattern',
    badge: 'Corporate Gifting',
    image: '/images/chesscrest-diary-h3310.jpg',
    icon: Sparkles,
    fitMode: 'contain',
    accentColor: '#FF6B00',
  },
  {
    id: 'p-6',
    title: 'Office Planner Diary H1072',
    subtitle: 'Button Strap & Multi-Card Organizer',
    badge: 'Corporate Gifting',
    image: '/images/office-planner-h1072.jpg',
    icon: Zap,
    fitMode: 'contain',
    accentColor: '#FFB547',
  },
  {
    id: 'p-7',
    title: 'Executive Corporate Gifting Suite',
    subtitle: 'Vacuum Flasks, Luxury Pens & Gift Sets',
    badge: 'Corporate Gifting',
    image: '/images/corporate-gifting-flyer.jpg',
    icon: Sparkles,
    fitMode: 'contain',
    accentColor: '#3478F6',
  },
  {
    id: 'p-8',
    title: 'Aluminium Identification Plates',
    subtitle: 'Anodised High-Precision Machine Plates',
    badge: 'Industrial Labelling',
    image: '/images/industrial-labelling/aluminium-name-plates/IMG_7550.png',
    icon: ShieldCheck,
    fitMode: 'contain',
    accentColor: '#3478F6',
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxRotation = 3.5;
    const rotY = (x / (rect.width / 2)) * maxRotation;
    const rotX = -(y / (rect.height / 2)) * maxRotation;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const colOneCombined = [...COLUMN_ONE_ITEMS, ...COLUMN_ONE_ITEMS];
  const colTwoCombined = [...COLUMN_TWO_ITEMS, ...COLUMN_TWO_ITEMS];

  const mapBadgeToService = (badge: string): string => {
    if (badge.toLowerCase().includes('corporate')) return 'corporate-gifting';
    if (badge.toLowerCase().includes('industrial') || badge.toLowerCase().includes('marking')) return 'services/industrial-labelling';
    if (badge.toLowerCase().includes('acrylic') || badge.toLowerCase().includes('mdf')) return 'mdf-acrylic-cutouts';
    return 'personalised-gifting';
  };

  const renderSliderCard = (item: SliderItem, uniqueKey: string) => {
    const Icon = item.icon;
    return (
      <div
        key={uniqueKey}
        onClick={() => onCardClick && onCardClick(mapBadgeToService(item.badge))}
        className="group relative w-full h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shrink-0 border border-white/15 bg-[#0E1628]/95 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)] hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
      >
        {/* Large Product Showcase Stage (Takes ~82% of card height for prominent display) */}
        <div className="relative w-full h-[290px] sm:h-[330px] overflow-hidden flex items-center justify-center p-2 bg-gradient-to-br from-[#070B16] via-[#0E1628] to-[#141C30]">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 industrial-grid-dark opacity-15 pointer-events-none" />

          {/* Ambient backlight glow */}
          <div
            className="absolute w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-30 group-hover:opacity-75 transition-opacity"
            style={{ backgroundColor: item.accentColor }}
          />

          {/* Primary High-Resolution Product Image (Scaled up prominently) */}
          <img
            src={item.image}
            alt={item.title}
            className={`max-h-full max-w-full w-auto h-auto transition-transform duration-500 ease-out group-hover:scale-106 ${
              item.fitMode === 'contain'
                ? 'object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.75)]'
                : 'w-full h-full object-cover object-center'
            }`}
            loading="lazy"
          />

          {/* Top Classification Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm"
              style={{
                backgroundColor: `${item.accentColor}25`,
                borderColor: `${item.accentColor}50`,
                color: item.accentColor,
              }}
            >
              <Icon className="w-3 h-3" />
              <span>{item.badge}</span>
            </span>
          </div>

          {/* Laser scanning line on hover */}
          <div
            className="absolute inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 group-hover:animate-laser-scan pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)`,
            }}
          />
        </div>

        {/* Bottom Pinned Metadata Header */}
        <div className="p-3 bg-[#0B1020]/95 border-t border-white/10 space-y-0.5 z-10 flex flex-col justify-center">
          <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate group-hover:text-amber-200 transition-colors">
            {item.title}
          </h4>
          <p className="text-[10px] sm:text-[11px] text-slate-300 truncate font-light">
            {item.subtitle}
          </p>
        </div>

        {/* Bottom accent glow strip */}
        <div
          className="absolute bottom-0 inset-x-0 h-1 opacity-50 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: item.accentColor }}
        />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="slider-container relative w-full overflow-hidden select-none py-1"
      aria-label="Continuous Vertical Product Showcase"
    >
      {/* 3D Perspective Plane */}
      <div
        className="transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `perspective(1200px) rotateY(${-2.5 + rotate.y}deg) rotateX(${1.5 + rotate.x}deg) translateZ(0)`,
        }}
      >
        {/* Viewport Frame with Soft Vertical Fade Masks Top & Bottom */}
        <div className="relative h-[620px] sm:h-[700px] lg:h-[740px] overflow-hidden fade-edges-y">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 h-full">

            {/* Column 1: Vertical Slide Moving UPWARDS */}
            <div className="relative overflow-hidden flex flex-col">
              <div className="marquee-track-up gap-4 sm:gap-5 flex flex-col">
                {colOneCombined.map((item, index) =>
                  renderSliderCard(item, `col1-${item.id}-${index}`)
                )}
              </div>
            </div>

            {/* Column 2: Vertical Slide Moving DOWNWARDS */}
            <div className="relative overflow-hidden flex flex-col">
              <div className="marquee-track-down gap-4 sm:gap-5 flex flex-col">
                {colTwoCombined.map((item, index) =>
                  renderSliderCard(item, `col2-${item.id}-${index}`)
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
