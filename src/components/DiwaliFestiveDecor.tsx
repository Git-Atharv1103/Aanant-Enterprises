import React from 'react';
import { Sparkles, Gift } from 'lucide-react';

/**
 * 3D-styled Diya SVG with glowing flickering flame
 */
export const RealisticDiya: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 0.8 }}
      aria-label="Festive Diwali Diya"
    >
      {/* Golden Aura Glow behind the flame */}
      <div
        className="absolute -top-3 w-8 h-8 rounded-full blur-md pointer-events-none animate-diya-glow"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.4) 50%, transparent 80%)',
        }}
      />

      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]"
      >
        <defs>
          {/* Flame Gradient */}
          <linearGradient id="flameInner" x1="50" y1="5" x2="50" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          {/* Diya Clay/Brass Metallic Gradient */}
          <linearGradient id="brassBowl" x1="10" y1="35" x2="90" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="25%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Diya Rim Highlight */}
          <linearGradient id="rimHighlight" x1="10" y1="36" x2="90" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Flickering Outer Flame */}
        <g className="animate-flame-flicker origin-bottom" style={{ transformOrigin: '50px 38px' }}>
          <path
            d="M50 4 C43 18 38 26 42 36 C44 39 47 41 50 41 C53 41 56 39 58 36 C62 26 57 18 50 4 Z"
            fill="url(#flameInner)"
            opacity="0.95"
          />
          {/* Inner White Flame Core */}
          <path
            d="M50 12 C46 22 44 28 46 35 C48 37 50 38 50 38 C50 38 52 37 54 35 C56 28 54 22 50 12 Z"
            fill="#FFFFFF"
            opacity="0.85"
          />
        </g>

        {/* Diya Wick */}
        <path d="M49 35 C49 33 50 30 50 28 C50 30 51 33 51 35 Z" fill="#451A03" />

        {/* Diya Brass Body */}
        <path
          d="M12 38 C12 38 18 68 50 68 C82 68 88 38 88 38 C88 38 72 44 50 44 C28 44 12 38 12 38 Z"
          fill="url(#brassBowl)"
        />

        {/* Diya Rim Oval */}
        <ellipse cx="50" cy="38" rx="38" ry="6" fill="url(#rimHighlight)" />
        <ellipse cx="50" cy="38.5" rx="34" ry="4.5" fill="#78350F" opacity="0.6" />

        {/* Ornate Base Pedestal */}
        <path
          d="M40 68 C40 68 42 74 38 76 C44 76 56 76 62 76 C58 74 60 68 60 68 Z"
          fill="url(#brassBowl)"
        />
      </svg>
    </div>
  );
};

/**
 * Hanging Traditional Diwali Lantern (Kandil)
 */
export const HangingLantern: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 60 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-24 sm:w-16 sm:h-32 drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)] animate-lantern-swing origin-top"
      >
        {/* Hanging Thread */}
        <line x1="30" y1="0" x2="30" y2="25" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Top Cap */}
        <polygon points="22,25 38,25 42,32 18,32" fill="#D97706" />

        {/* Central Diamond Body */}
        <polygon points="30,32 52,55 30,78 8,55" fill="#EA580C" opacity="0.9" />
        <polygon points="30,38 46,55 30,72 14,55" fill="#FBBF24" opacity="0.9" />
        <polygon points="30,44 40,55 30,66 20,55" fill="#FEF08A" />

        {/* Glow Core */}
        <circle cx="30" cy="55" r="5" fill="#FFFFFF" />

        {/* Bottom Tassels */}
        <line x1="20" y1="78" x2="16" y2="110" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="25" y1="78" x2="23" y2="115" stroke="#F97316" strokeWidth="1.5" />
        <line x1="30" y1="78" x2="30" y2="118" stroke="#FBBF24" strokeWidth="2" />
        <line x1="35" y1="78" x2="37" y2="115" stroke="#F97316" strokeWidth="1.5" />
        <line x1="40" y1="78" x2="44" y2="110" stroke="#F59E0B" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

/**
 * Geometric Rangoli Corner Decorative Motif
 */
export const RangoliCornerPattern: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none opacity-20 ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="110" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="0" cy="0" r="90" stroke="#F97316" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="70" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="0" cy="0" r="50" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="30" stroke="#FDE047" strokeWidth="1" />
        <line x1="0" y1="0" x2="80" y2="80" stroke="#F59E0B" strokeWidth="1" />
        <line x1="0" y1="0" x2="105" y2="40" stroke="#F59E0B" strokeWidth="0.8" />
        <line x1="0" y1="0" x2="40" y2="105" stroke="#F59E0B" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

/**
 * Diwali Festive Announcement Banner
 */
export const DiwaliTopBanner: React.FC<{ onExploreDiwaliGifts?: () => void }> = ({
  onExploreDiwaliGifts,
}) => {
  return (
    <div className="relative bg-gradient-to-r from-[#1A0B2E] via-[#2D124D] to-[#1A0B2E] text-white border-b border-amber-500/30 overflow-hidden z-30 select-none shadow-md">
      {/* Decorative Gold Light Ray */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Festive Greeting + Diya */}
        <div className="flex items-center gap-2.5">
          <RealisticDiya size={28} className="shrink-0 -mt-1" />
          <div className="flex items-center gap-2 font-mono">
            <span className="font-extrabold text-amber-300 tracking-wider uppercase text-[11px] sm:text-xs">
              ✨ Shubh Diwali 2026 Special
            </span>
            <span className="hidden md:inline text-amber-400/50">•</span>
            <span className="hidden md:inline text-slate-200">
              Exclusive Corporate Gifting & Festive Mementos with Custom Laser Branding
            </span>
          </div>
        </div>

        {/* Right: Quick Action Button */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Bulk Orders Open</span>
          </span>

          <button
            type="button"
            onClick={onExploreDiwaliGifts}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-brand-orange text-slate-950 font-bold hover:brightness-110 transition-all shadow-sm text-[11px]"
          >
            <Gift className="w-3.5 h-3.5 text-slate-950" />
            <span>Explore Diwali Gifts</span>
          </button>
        </div>

      </div>
    </div>
  );
};

