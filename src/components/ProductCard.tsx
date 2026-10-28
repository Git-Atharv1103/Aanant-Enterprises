import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  Eye, Wrench, Layers, Cog, Sparkles, MessageCircle,
  CheckCircle2, Images, ArrowUpRight
} from 'lucide-react';
import type { ProductItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface ProductCardProps {
  product: ProductItem;
  onViewDetails: (product: ProductItem) => void;
  onRequestCustomisation?: (product: ProductItem) => void;
  onRequestQuote?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onRequestCustomisation,
  onRequestQuote,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);

  // Detect true hover/pointer support (desktop fine pointer vs touch mobile)
  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanHover(hasFinePointer && !prefersReducedMotion);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    // Subtle natural tilt (max ±9 degrees)
    const tiltX = (percentY - 0.5) * -16;
    const tiltY = (percentX - 0.5) * 16;

    setTilt({ x: tiltX, y: tiltY });
    setGlare({ x: percentX * 100, y: percentY * 100, opacity: 0.16 });
  }, [canHover]);

  const handlePointerEnter = useCallback(() => {
    if (canHover) setIsHovered(true);
  }, [canHover]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const handleCustomiseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRequestCustomisation) onRequestCustomisation(product);
    else if (onRequestQuote) onRequestQuote(product);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hello Aanant Enterprises, I am interested in customising "${product.name}" (${product.category}). Material: ${product.material}. Could you share feasibility and quotation?`
    );
    window.open(`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${msg}`, '_blank');
  };

  const photoCount = product.galleryImages?.length ?? 1;

  // Compute 3D transform & dynamic realistic shadow
  const cardTransform = canHover && isHovered
    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';

  const cardShadow = canHover && isHovered
    ? `${-tilt.y * 1.5}px ${tilt.x * 1.5 + 18}px 36px -4px rgba(0, 0, 0, 0.45), 0 0 24px -2px rgba(255, 107, 0, 0.2)`
    : '0 10px 30px -10px rgba(0, 0, 0, 0.3)';

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: cardTransform,
        boxShadow: cardShadow,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out' : 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
      }}
      className="relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/12 backdrop-blur-xl flex flex-col group overflow-hidden will-change-transform select-none cursor-pointer"
      onClick={() => onViewDetails(product)}
      role="article"
      aria-label={`Product card: ${product.name}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails(product);
        }
      }}
    >
      {/* Dynamic Specular Sheen / Glare Highlight */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 60%)`,
        }}
      />

      {/* Ambient Laser Edge Glow */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(255,107,0,0.3), rgba(52,120,246,0.25), rgba(255,181,71,0.2))',
          filter: 'blur(14px)',
        }}
      />

      {/* Layer 1: Image Frame with 3D Depth */}
      <div
        className="relative h-60 sm:h-64 overflow-hidden bg-black/60"
        style={{
          borderRadius: '24px 24px 0 0',
          transform: canHover && isHovered ? 'translateZ(20px)' : 'translateZ(0)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Laser Sweep Beam on Hover */}
        <div className="laser-sweep opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />

        {/* Gradient Shadow vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Badges with Layer 2 Elevation */}
        <div
          className="absolute top-3.5 left-3.5 z-20"
          style={{
            transform: canHover && isHovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider bg-black/75 text-white backdrop-blur-md border border-white/20 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            {product.category}
          </span>
        </div>

        <div
          className="absolute top-3.5 right-3.5 z-20"
          style={{
            transform: canHover && isHovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-orange to-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-glow-orange/40">
            <Sparkles className="w-3 h-3 animate-pulse" />
            Custom
          </span>
        </div>

        {/* Photo Gallery Indicator */}
        {photoCount > 1 && (
          <div className="absolute bottom-3 right-3 z-20">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 text-white text-[10px] font-mono font-semibold backdrop-blur-md border border-white/15">
              <Images className="w-3 h-3 text-brand-amber" />
              {photoCount} photos
            </span>
          </div>
        )}

        {/* Desktop Quick-View Inspection Pill */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 text-slate-900 font-bold text-xs shadow-2xl border border-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
            style={{
              transform: canHover && isHovered ? 'translateZ(35px)' : 'translateZ(0)',
            }}
          >
            <Eye className="w-4 h-4 text-brand-orange" />
            <span>Inspect Spec & Gallery</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Layer 2: Card Body Information */}
      <div
        className="flex-1 flex flex-col p-5 sm:p-6 space-y-4 text-slate-100"
        style={{
          transform: canHover && isHovered ? 'translateZ(14px)' : 'translateZ(0)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Title */}
        <h3
          className="text-base sm:text-lg font-black text-white leading-snug hover:text-brand-orange transition-colors line-clamp-2"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed flex-shrink-0 font-light">
          {product.shortDescription}
        </p>

        {/* Feature Highlights */}
        {product.keyFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {product.keyFeatures.slice(0, 2).map((feat, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate max-w-[140px]">{feat}</span>
              </span>
            ))}
          </div>
        )}

        {/* Spec Grid */}
        <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3.5">
          <div className="rounded-xl p-2.5 flex items-center gap-2 bg-white/[0.04] border border-white/8">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-brand-orange/15 text-brand-orange">
              <Cog className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] uppercase tracking-wider font-mono font-bold text-slate-400 leading-none mb-1">
                Method
              </div>
              <div className="text-xs font-bold text-white truncate">
                {product.manufacturingMethod}
              </div>
            </div>
          </div>

          <div className="rounded-xl p-2.5 flex items-center gap-2 bg-white/[0.04] border border-white/8">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-brand-blue-electric/15 text-brand-blue-electric">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] uppercase tracking-wider font-mono font-bold text-slate-400 leading-none mb-1">
                Material
              </div>
              <div className="text-xs font-bold text-white truncate">
                {product.material.split('(')[0].trim()}
              </div>
            </div>
          </div>
        </div>

        {/* Actions Deck with Layer 3 Elevation */}
        <div
          className="flex items-center gap-2 pt-2 border-t border-white/10 mt-auto"
          style={{
            transform: canHover && isHovered ? 'translateZ(26px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition-all active:scale-95 flex-shrink-0"
            title="Inspect full specifications & photos"
            aria-label="Inspect specifications"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Customise This — Primary CTA */}
          <button
            onClick={handleCustomiseClick}
            className="flex-1 py-3 px-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange/30 hover:shadow-glow-orange/70 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 relative overflow-hidden group/btn"
          >
            <Wrench className="w-3.5 h-3.5 shrink-0" />
            <span>Customise This</span>
          </button>

          {/* WhatsApp Quick Enquiry Button */}
          <button
            onClick={handleWhatsApp}
            className="p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-500 transition-all active:scale-95 flex-shrink-0"
            title={`Enquire about ${product.name} on WhatsApp`}
            aria-label="WhatsApp quick chat"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
