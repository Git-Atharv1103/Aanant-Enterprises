import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MarqueeCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  route: string;
  badgeColor: string;
  isTransparentProduct?: boolean;
}

const MARQUEE_PRODUCTS: MarqueeCard[] = [
  {
    id: 'hm-1',
    title: 'Planner Diary Model H3309',
    subtitle: 'Magnetic Lock • Executive 6-Ring',
    category: 'Corporate Gifting',
    image: '/images/planner-diary-h3309.jpg',
    route: 'service-corporate-gifting',
    badgeColor: '#FF6B00',
  },
  {
    id: 'hm-2',
    title: 'Aluminium Nameplate Specimen',
    subtitle: 'Fiber Laser Micro-Marking',
    category: 'Industrial Labelling',
    image: '/images/industrial-labelling/aluminium-name-plates/IMG_7550.png',
    route: 'services/industrial-labelling/aluminium-name-plates',
    badgeColor: '#3478F6',
    isTransparentProduct: true,
  },
  {
    id: 'hm-3',
    title: 'A5 Stretchable Notebook H3302',
    subtitle: 'Soft Leatherette • Pen Loop',
    category: 'Corporate Gifting',
    image: '/images/notebook-diary-h3302.jpg',
    route: 'service-corporate-gifting',
    badgeColor: '#FF6B00',
  },
  {
    id: 'hm-4',
    title: 'Trafolite Engraved Plate',
    subtitle: 'Contrasting Dual-Layer Acrylic',
    category: 'Industrial Labelling',
    image: '/images/industrial-labelling/trafolite-plates/IMG_7561.png',
    route: 'services/industrial-labelling/trafolite-plates',
    badgeColor: '#F59E0B',
    isTransparentProduct: true,
  },
  {
    id: 'hm-5',
    title: 'Chesscrest Notebook H3310',
    subtitle: 'Checkered Pattern • Stylish Flap',
    category: 'Corporate Gifting',
    image: '/images/chesscrest-diary-h3310.jpg',
    route: 'service-corporate-gifting',
    badgeColor: '#FF6B00',
  },
  {
    id: 'hm-6',
    title: 'Sublimation Full-Colour Plate',
    subtitle: 'Infused CMYK Metallic Graphic',
    category: 'Industrial Labelling',
    image: '/images/industrial-labelling/sublimation-plates/IMG_7568.png',
    route: 'services/industrial-labelling/sublimation-plates',
    badgeColor: '#10B981',
    isTransparentProduct: true,
  },
  {
    id: 'hm-7',
    title: 'Office Planner Diary H1048',
    subtitle: 'Document Sleeve & Card Holder',
    category: 'Corporate Gifting',
    image: '/images/office-planner-h1048.jpg',
    route: 'service-corporate-gifting',
    badgeColor: '#FF6B00',
  },
  {
    id: 'hm-8',
    title: 'Industrial Heavy-Duty Sticker',
    subtitle: 'Aggressive High-Tack Adhesive',
    category: 'Industrial Labelling',
    image: '/images/industrial-labelling/industrial-stickers/IMG_7578.png',
    route: 'services/industrial-labelling/industrial-stickers',
    badgeColor: '#10B981',
    isTransparentProduct: true,
  },
  {
    id: 'hm-9',
    title: 'Office Planner Diary H1072',
    subtitle: 'Multi-Compartment Organizer',
    category: 'Corporate Gifting',
    image: '/images/office-planner-h1072.jpg',
    route: 'service-corporate-gifting',
    badgeColor: '#FF6B00',
  },
  {
    id: 'hm-10',
    title: 'Panel Door Lock Hardware',
    subtitle: 'IP65 Quarter-Turn Mechanism',
    category: 'Industrial Labelling',
    image: '/images/industrial-labelling/panel-door-locks/IMG_7584.png',
    route: 'services/industrial-labelling/panel-door-locks',
    badgeColor: '#818CF8',
    isTransparentProduct: true,
  },
];

interface HorizontalProductMarqueeProps {
  onNavigate: (route: string) => void;
}

export const HorizontalProductMarquee: React.FC<HorizontalProductMarqueeProps> = ({ onNavigate }) => {
  // Duplicate list twice for a completely seamless, jump-free loop
  const duplicatedProducts = [...MARQUEE_PRODUCTS, ...MARQUEE_PRODUCTS];

  return (
    <section
      className="py-10 bg-[#090E1A] border-y border-white/10 relative overflow-hidden select-none"
      aria-label="Continuous Horizontal Product Showcase"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 industrial-grid-dark opacity-15 pointer-events-none" />

      {/* Header Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>Continuous Product Reel • Laser Engraving & Industrial Fabrication</span>
          </span>
        </div>

        <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
          Hover to pause • Click card to inspect
        </span>
      </div>

      {/* Infinite Horizontal Running Track with Left & Right Gradient Fade */}
      <div className="relative w-full overflow-hidden fade-edges-x">
        <div className="marquee-track-horizontal gap-4 sm:gap-6 py-2 px-4">
          {duplicatedProducts.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => onNavigate(item.route)}
              className="group relative w-64 sm:w-72 h-44 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-[#0E1628]/95 hover:border-brand-orange/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between p-3.5"
            >
              {/* Product Visual Area */}
              <div className="relative w-full h-24 rounded-xl overflow-hidden bg-gradient-to-br from-[#070B16] to-[#121A2D] flex items-center justify-center p-2 border border-white/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 ${
                    item.isTransparentProduct
                      ? 'object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]'
                      : 'object-cover'
                  }`}
                  loading="lazy"
                />

                {/* Category Micro Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full backdrop-blur-md border shadow-sm"
                    style={{
                      backgroundColor: `${item.badgeColor}25`,
                      borderColor: `${item.badgeColor}50`,
                      color: item.badgeColor,
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="pt-2 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5 font-light">
                    {item.subtitle}
                  </p>
                </div>

                <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-brand-orange text-white flex items-center justify-center shrink-0 border border-white/10 transition-colors">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Bottom Subtle Highlight */}
              <div
                className="absolute bottom-0 inset-x-0 h-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: item.badgeColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
