import React, { useMemo } from 'react';
import { RealisticDiya, HangingLantern, RangoliCornerPattern } from './DiwaliFestiveDecor';
import { DiwaliCrackerBlastCanvas } from './DiwaliCrackerBlastCanvas';

/**
 * ── Hanging Festive Fairy String Lights (Diwali Ladi Garland) ──
 * Drapes elegantly across the top of the viewport with glowing golden/amber bulbs
 */
export const DiwaliFairyStringLights: React.FC<{ className?: string }> = ({ className = '' }) => {
  const bulbCount = 28;
  const bulbs = useMemo(() => {
    const colors = [
      { fill: '#FDE047', glow: 'rgba(253, 224, 71, 0.9)' },  // Golden yellow
      { fill: '#F59E0B', glow: 'rgba(245, 158, 11, 0.95)' }, // Warm amber
      { fill: '#FB923C', glow: 'rgba(251, 146, 60, 0.9)' },  // Warm orange
      { fill: '#F43F5E', glow: 'rgba(244, 63, 94, 0.85)' },  // Festive ruby
    ];

    return Array.from({ length: bulbCount }, (_, i) => {
      const color = colors[i % colors.length];
      const delay = (i % 5) * 0.45;
      const xPercent = (i / (bulbCount - 1)) * 100;
      const loopIdx = i % 4;
      const yOffset = Math.sin((loopIdx / 3) * Math.PI) * 16 + 6;

      return {
        id: i,
        xPercent,
        yOffset,
        fill: color.fill,
        glow: color.glow,
        delay,
      };
    });
  }, [bulbCount]);

  return (
    <div
      className={`absolute top-0 inset-x-0 h-16 pointer-events-none overflow-hidden select-none z-20 ${className}`}
      aria-hidden="true"
    >
      {/* Decorative Golden Wire */}
      <svg
        className="w-full h-12 overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 1000 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 4 Q 125 24, 250 4 T 500 4 T 750 4 T 1000 4"
          stroke="rgba(245, 158, 11, 0.45)"
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />
      </svg>

      {/* Bulbs with soft glow halos */}
      {bulbs.map((b) => (
        <div
          key={b.id}
          className="absolute -translate-x-1/2"
          style={{
            left: `${b.xPercent}%`,
            top: `${b.yOffset}px`,
          }}
        >
          {/* Outer Light Glow Halo */}
          <div
            className="w-5 h-5 -ml-1 -mt-1 rounded-full animate-festive-twinkle pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${b.glow} 0%, transparent 75%)`,
              animationDelay: `${b.delay}s`,
            }}
          />

          {/* Inner Glowing Bulb */}
          <div
            className="absolute top-1 left-1 w-2.5 h-3.5 rounded-full shadow-lg"
            style={{
              backgroundColor: b.fill,
              boxShadow: `0 0 10px 2px ${b.glow}, 0 2px 4px rgba(0,0,0,0.5)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * ── Floating Golden Light Particles / Diwali Sparkles ──
 * Ambient golden fireflies/embers floating gently in background
 */
export const DiwaliSparkleParticles: React.FC = () => {
  const particles = useMemo(() => {
    return [
      { id: 1, top: '8%', left: '12%', size: 6, delay: 0 },
      { id: 2, top: '15%', left: '85%', size: 8, delay: 1.2 },
      { id: 3, top: '22%', left: '42%', size: 5, delay: 2.1 },
      { id: 4, top: '30%', left: '7%', size: 7, delay: 0.8 },
      { id: 5, top: '38%', left: '92%', size: 6, delay: 2.8 },
      { id: 6, top: '45%', left: '25%', size: 8, delay: 1.6 },
      { id: 7, top: '52%', left: '78%', size: 5, delay: 3.2 },
      { id: 8, top: '60%', left: '18%', size: 7, delay: 0.5 },
      { id: 9, top: '68%', left: '60%', size: 6, delay: 2.4 },
      { id: 10, top: '75%', left: '88%', size: 8, delay: 1.9 },
      { id: 11, top: '82%', left: '10%', size: 5, delay: 3.5 },
      { id: 12, top: '90%', left: '48%', size: 7, delay: 0.9 },
      { id: 13, top: '12%', left: '68%', size: 6, delay: 2.7 },
      { id: 14, top: '35%', left: '55%', size: 7, delay: 1.4 },
      { id: 15, top: '65%', left: '38%', size: 5, delay: 3.1 },
      { id: 16, top: '88%', left: '80%', size: 8, delay: 2.2 },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-festive-float"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle, #FDE047 0%, #F59E0B 60%, transparent 100%)',
            boxShadow: '0 0 12px 3px rgba(251, 191, 36, 0.8)',
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Page-Specific Diwali Background Theme Definition
 */
interface PageDiwaliTheme {
  name: string;
  topLightCone: string;
  leftAura: string;
  rightAura: string;
  pedestalGlow: string;
  badgeText: string;
}

const getPageDiwaliTheme = (route: string = ''): PageDiwaliTheme => {
  const norm = route.toLowerCase();

  // 1. Corporate Gifting: Pens
  if (norm.includes('pens')) {
    return {
      name: 'Royal Executive Gold Sparkle Theme',
      topLightCone:
        'radial-gradient(ellipse at 50% 12%, rgba(251, 191, 36, 0.42) 0%, rgba(245, 158, 11, 0.22) 40%, transparent 80%)',
      leftAura:
        'radial-gradient(circle, rgba(251, 191, 36, 0.32) 0%, rgba(245, 158, 11, 0.14) 50%, transparent 70%)',
      rightAura:
        'radial-gradient(circle, rgba(255, 181, 71, 0.3) 0%, rgba(251, 191, 36, 0.12) 45%, transparent 70%)',
      pedestalGlow:
        'radial-gradient(ellipse at 50% 100%, rgba(251, 191, 36, 0.35) 0%, transparent 80%)',
      badgeText: '✨ Royal Gold Diwali Suite',
    };
  }

  // 2. Corporate Gifting: Bottles & Drinkware
  if (norm.includes('bottles')) {
    return {
      name: 'Arctic Sapphire & Laser Gold Theme',
      topLightCone:
        'radial-gradient(ellipse at 50% 12%, rgba(0, 229, 255, 0.36) 0%, rgba(52, 120, 246, 0.22) 40%, transparent 80%)',
      leftAura:
        'radial-gradient(circle, rgba(0, 229, 255, 0.28) 0%, rgba(52, 120, 246, 0.12) 50%, transparent 70%)',
      rightAura:
        'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(0, 229, 255, 0.12) 45%, transparent 70%)',
      pedestalGlow:
        'radial-gradient(ellipse at 50% 100%, rgba(0, 229, 255, 0.28) 0%, transparent 80%)',
      badgeText: '❄️ Sapphire & Gold Diwali Suite',
    };
  }

  // 3. Corporate Gifting: Diaries & Notebooks
  if (norm.includes('diaries')) {
    return {
      name: 'Saffron Heritage & Gold Leaf Theme',
      topLightCone:
        'radial-gradient(ellipse at 50% 12%, rgba(255, 107, 0, 0.38) 0%, rgba(245, 158, 11, 0.24) 40%, transparent 80%)',
      leftAura:
        'radial-gradient(circle, rgba(255, 107, 0, 0.3) 0%, rgba(245, 158, 11, 0.14) 50%, transparent 70%)',
      rightAura:
        'radial-gradient(circle, rgba(251, 191, 36, 0.32) 0%, rgba(255, 107, 0, 0.14) 45%, transparent 70%)',
      pedestalGlow:
        'radial-gradient(ellipse at 50% 100%, rgba(255, 107, 0, 0.32) 0%, transparent 80%)',
      badgeText: '📖 Saffron Heritage Diwali Suite',
    };
  }

  // 4. Main Corporate Gifting Hub
  if (norm.includes('corporate-gifting') || norm.includes('gifting')) {
    return {
      name: 'Shahi Uphaar (Royal Purple & Golden Amber Festive Suite)',
      topLightCone:
        'radial-gradient(ellipse at 50% 12%, rgba(168, 85, 247, 0.38) 0%, rgba(245, 158, 11, 0.24) 45%, transparent 80%)',
      leftAura:
        'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(217, 119, 6, 0.15) 50%, transparent 70%)',
      rightAura:
        'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(168, 85, 247, 0.14) 45%, transparent 70%)',
      pedestalGlow:
        'radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.35) 0%, transparent 80%)',
      badgeText: '🎁 Shahi Corporate Gifting Suite',
    };
  }

  // 5. Industrial Labelling Suite
  if (norm.includes('industrial') || norm.includes('plate') || norm.includes('lock')) {
    return {
      name: 'Karkhana Deepotsav (Industrial Fiber Laser & Brass Theme)',
      topLightCone:
        'radial-gradient(ellipse at 50% 12%, rgba(52, 120, 246, 0.36) 0%, rgba(245, 158, 11, 0.22) 45%, transparent 80%)',
      leftAura:
        'radial-gradient(circle, rgba(52, 120, 246, 0.32) 0%, rgba(0, 229, 255, 0.14) 50%, transparent 70%)',
      rightAura:
        'radial-gradient(circle, rgba(245, 158, 11, 0.32) 0%, rgba(52, 120, 246, 0.15) 45%, transparent 70%)',
      pedestalGlow:
        'radial-gradient(ellipse at 50% 100%, rgba(52, 120, 246, 0.3) 0%, transparent 80%)',
      badgeText: '⚙️ Industrial Deepotsav Suite',
    };
  }

  // 6. About Us
  if (norm === 'about') {
    return {
      name: 'Parampara (Traditional Temple Gold & Crimson Theme)',
      topLightCone:
        'radial-gradient(ellipse at 50% 12%, rgba(244, 63, 94, 0.34) 0%, rgba(251, 191, 36, 0.25) 45%, transparent 80%)',
      leftAura:
        'radial-gradient(circle, rgba(244, 63, 94, 0.26) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)',
      rightAura:
        'radial-gradient(circle, rgba(251, 191, 36, 0.34) 0%, rgba(244, 63, 94, 0.14) 45%, transparent 70%)',
      pedestalGlow:
        'radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.35) 0%, transparent 80%)',
      badgeText: '🪔 Parampara Heritage Theme',
    };
  }

  // 7. Contact Us
  if (norm === 'contact') {
    return {
      name: 'Shubh Aarambh (Auspicious Emerald & Golden Glow)',
      topLightCone:
        'radial-gradient(ellipse at 50% 12%, rgba(16, 185, 129, 0.36) 0%, rgba(251, 191, 36, 0.24) 45%, transparent 80%)',
      leftAura:
        'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)',
      rightAura:
        'radial-gradient(circle, rgba(251, 191, 36, 0.34) 0%, rgba(16, 185, 129, 0.12) 45%, transparent 70%)',
      pedestalGlow:
        'radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.3) 0%, transparent 80%)',
      badgeText: '🌿 Auspicious Shubh Aarambh Theme',
    };
  }

  // 8. Default Homepage Grand Diwali Illumination
  return {
    name: 'Grand Deepavali 2026 Illumination',
    topLightCone:
      'radial-gradient(ellipse at 50% 12%, rgba(251, 191, 36, 0.42) 0%, rgba(245, 158, 11, 0.24) 40%, rgba(255, 107, 0, 0.12) 60%, transparent 80%)',
    leftAura:
      'radial-gradient(circle, rgba(251, 191, 36, 0.32) 0%, rgba(245, 158, 11, 0.15) 45%, transparent 70%)',
    rightAura:
      'radial-gradient(circle, rgba(255, 107, 0, 0.32) 0%, rgba(245, 158, 11, 0.15) 45%, transparent 70%)',
    pedestalGlow:
      'radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.35) 0%, rgba(255, 107, 0, 0.15) 50%, transparent 80%)',
    badgeText: '✨ Grand Deepavali 2026',
  };
};

/**
 * ── Unified Full-Page Diwali Background Theme ──
 * Renders page-specific celebratory lighting, live cracker blasts, ambient golden sunbeams,
 * hanging fairy lights, corner rangolis, and traditional lanterns without interfering with page content.
 */
export const DiwaliBackgroundDecor: React.FC<{ currentPage?: string }> = ({
  currentPage = 'home',
}) => {
  const theme = useMemo(() => getPageDiwaliTheme(currentPage), [currentPage]);

  return (
    <>
      {/* ── Live Cracker Blast & Fireworks Canvas ── */}
      <DiwaliCrackerBlastCanvas isEnabled={true} />

      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* ── 1. Page-Specific Top Radiant Warm Light Cone ── */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1150px] h-[550px] pointer-events-none opacity-45 animate-aura-pulse transition-all duration-700"
          style={{ background: theme.topLightCone }}
        />

        {/* ── 2. Page-Specific Left Side Warm Golden Ambient Aura ── */}
        <div
          className="absolute top-1/3 -left-48 w-[680px] h-[680px] rounded-full pointer-events-none opacity-35 transition-all duration-700"
          style={{ background: theme.leftAura }}
        />

        {/* ── 3. Page-Specific Right Side Warm Amber & Orange Aura ── */}
        <div
          className="absolute top-2/3 -right-48 w-[680px] h-[680px] rounded-full pointer-events-none opacity-35 transition-all duration-700"
          style={{ background: theme.rightAura }}
        />

        {/* ── 4. Floating Diwali Sparkle Particles ── */}
        <DiwaliSparkleParticles />

        {/* ── 5. Hanging Traditional Lanterns (Kandils) at Screen Edges (Desktop) ── */}
        <div className="hidden xl:block absolute top-28 left-6 z-10">
          <HangingLantern />
        </div>
        <div className="hidden xl:block absolute top-28 right-6 z-10">
          <HangingLantern />
        </div>

        {/* ── 6. Bottom Corner Ornate Rangolis & Glowing Diyas ── */}
        <div className="hidden lg:flex items-center absolute bottom-4 left-6 z-10 gap-3">
          <RangoliCornerPattern className="opacity-35" />
          <RealisticDiya size={44} className="opacity-80" />
        </div>
        <div className="hidden lg:flex items-center absolute bottom-4 right-6 z-10 gap-3">
          <RealisticDiya size={44} className="opacity-80" />
          <RangoliCornerPattern className="opacity-35 rotate-90" />
        </div>

        {/* ── 7. Page-Specific Golden Ground Pedestal Reflections ── */}
        <div
          className="absolute bottom-0 inset-x-0 h-36 pointer-events-none opacity-30 transition-all duration-700"
          style={{ background: theme.pedestalGlow }}
        />
      </div>
    </>
  );
};
