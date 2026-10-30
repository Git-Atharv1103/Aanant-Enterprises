import React, { useRef, useState } from 'react';
import { ExternalLink, Play, Pause, Eye } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { INSTAGRAM_REELS, type InstagramReel } from '../data/instagramReels';
import { useScrollReveal } from '../utils/useScrollReveal';

// Custom Instagram SVG icon
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ReelCard: React.FC<{ reel: InstagramReel }> = ({ reel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-[270px] mx-auto rounded-3xl overflow-hidden border border-white/10 hover:border-[#E1306C]/60 bg-[#0E1628] shadow-2xl transition-all duration-300 hover:-translate-y-2 select-none flex flex-col"
      style={{
        boxShadow: isHovered
          ? '0 24px 48px -12px rgba(225, 48, 108, 0.35), 0 0 24px rgba(193, 53, 132, 0.2)'
          : undefined,
      }}
    >
      {/* 9:16 Video Container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={reel.videoSrc}
          poster={reel.posterSrc}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-black/60 pointer-events-none" />

        {/* Top Header: Instagram Reel Tag & View count */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white shadow-sm">
            <InstagramIcon className="w-3 h-3 text-[#E1306C]" />
            <span>Reel</span>
          </span>

          {reel.views && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
              <Eye className="w-3 h-3 text-brand-orange" />
              <span>{reel.views}</span>
            </span>
          )}
        </div>

        {/* Center Play/Pause Floating Controller */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Reel' : 'Play Reel'}
          className={`absolute w-12 h-12 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center z-20 transition-all duration-300 shadow-xl ${
            isPlaying ? 'opacity-0 group-hover:opacity-100 scale-90' : 'opacity-100 scale-100 group-hover:bg-[#E1306C]'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
          )}
        </button>

        {/* Bottom Content Area */}
        <div className="absolute bottom-3 inset-x-3 z-20 space-y-2">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 drop-shadow-md">
              {reel.title}
            </h3>
            <p className="text-[11px] text-slate-300 font-light line-clamp-2 mt-0.5 drop-shadow-sm">
              {reel.description}
            </p>
          </div>

          {/* Action CTA */}
          <a
            href={reel.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] hover:opacity-95 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md transition-transform group-hover:scale-[1.02]"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Watch on Instagram</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const InstagramReelsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#090D18] via-[#0E1628] to-[#090D18] text-slate-100 border-t border-white/10"
      aria-label="Aanant Enterprises Instagram Reels"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#E1306C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1306C]/15 border border-[#E1306C]/30 text-[#E1306C] text-xs font-mono font-bold tracking-wider uppercase">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Follow Us on Instagram</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            See Our Work{' '}
            <span className="bg-gradient-to-r from-[#E1306C] via-amber-300 to-brand-electric bg-clip-text text-transparent">
              in Action
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
            Explore live workshop demonstrations of laser engraving, Trafolite switchgear plate cutting, and industrial marking from our Pune facility.
          </p>

          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] hover:opacity-90 transition-opacity shadow-lg shadow-[#E1306C]/25"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @aanantenterprises03</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* ── 4 Balanced 9:16 Reel Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {INSTAGRAM_REELS.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center text-xs font-mono text-slate-400">
          <span>
            Hover or tap any card to play the workshop reel preview • Real clips from Aanant Enterprises Pune workshop
          </span>
        </div>

      </div>
    </section>
  );
};
