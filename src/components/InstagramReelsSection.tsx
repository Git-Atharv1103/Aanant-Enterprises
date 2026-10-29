import React, { useRef } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { INSTAGRAM_REELS } from '../data/instagramReels';
import { useScrollReveal } from '../utils/useScrollReveal';

// Custom Instagram SVG (lucide-react version in this project doesn't export it)
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

export const InstagramReelsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const activeReels = INSTAGRAM_REELS.filter((r) => !r.isPlaceholder && r.url);

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#090D18] via-[#0E1628] to-[#090D18] text-slate-100 border-t border-white/10"
    >
      {/* Background */}
      <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Follow Us on Instagram</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            See Our Work{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
              in Action
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
            Watch our laser engraving and cutting process, finished products, and customisation
            work on our official Instagram channel.
          </p>

          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] hover:opacity-90 transition-opacity shadow-lg"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @aanantenterprises03</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Reels Grid or Empty State */}
        {activeReels.length === 0 ? (
          /* ── Empty State ── */
          <div className="reveal delay-100">
            <div className="max-w-lg mx-auto rounded-3xl border border-dashed border-white/20 bg-white/[0.03] backdrop-blur-xl p-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E1306C]/20 to-[#833AB4]/20 border border-white/10 flex items-center justify-center mx-auto">
                <InstagramIcon className="w-8 h-8 text-[#E1306C]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Instagram Reels Coming Soon</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Visit our Instagram profile to see our latest laser engraving and cutting work,
                  product videos, and behind-the-scenes content.
                </p>
              </div>
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#E1306C] to-[#833AB4] hover:opacity-90 transition-opacity"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Visit Our Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
              <p className="text-[11px] font-mono text-slate-500">
                To display Reels here, add URLs to{' '}
                <code className="text-brand-orange">src/data/instagramReels.ts</code>
              </p>
            </div>
          </div>
        ) : (
          /* ── Reels Grid ── */
          <div className="reveal delay-100">
            {/* Horizontally scrollable on mobile, grid on desktop */}
            <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
              {activeReels.map((reel, i) => (
                <a
                  key={reel.id}
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-60 md:w-auto rounded-2xl overflow-hidden border border-white/10 bg-black/40 hover:border-brand-orange/40 transition-all duration-300 hover:scale-[1.02]"
                  style={{ aspectRatio: '9/16' }}
                  aria-label={reel.title || `Instagram Reel ${i + 1}`}
                >
                  {/* Thumbnail or gradient placeholder */}
                  {reel.thumbnailPath ? (
                    <img
                      src={reel.thumbnailPath}
                      alt={reel.title || 'Instagram Reel'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E1306C]/20 via-[#C13584]/10 to-[#833AB4]/20" />
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Instagram badge */}
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-mono font-bold text-white bg-black/60 backdrop-blur-sm border border-white/15">
                      <InstagramIcon className="w-3 h-3" />
                      Reel
                    </span>
                  </div>

                  {/* Bottom info */}
                  {reel.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-bold text-white line-clamp-2">{reel.title}</p>
                      {reel.description && (
                        <p className="text-[11px] text-slate-300 font-light mt-0.5 line-clamp-2">
                          {reel.description}
                        </p>
                      )}
                    </div>
                  )}
                </a>
              ))}
            </div>

            {/* Footer link */}
            <div className="mt-10 text-center reveal delay-200">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-brand-orange hover:text-amber-400 font-mono font-bold transition-colors"
              >
                <span>View all posts on Instagram</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
