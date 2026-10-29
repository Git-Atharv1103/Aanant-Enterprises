import React, { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { CUSTOMER_REVIEWS } from '../data/customerReviews';
import { useScrollReveal } from '../utils/useScrollReveal';

// Custom Instagram SVG (lucide-react version in this project doesn't export Instagram)
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

export const CustomerReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = CUSTOMER_REVIEWS.filter((r) => !r.isPlaceholder);

  const prev = () => setActiveIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setActiveIndex((i) => (i + 1) % reviews.length);

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600 fill-slate-600'}`}
        />
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0B1020] via-[#0E1628] to-[#0B1020] text-slate-100 border-t border-white/10"
    >
      {/* Background */}
      <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-electric/15 border border-brand-electric/30 text-brand-electric text-xs font-mono font-bold tracking-wider uppercase">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Customer Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            What Our{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            We share only verified feedback from our genuine customers. No fabricated reviews or artificial ratings.
          </p>
        </div>

        {/* Reviews or Empty State */}
        {reviews.length === 0 ? (
          /* ── Empty State ── */
          <div className="reveal delay-100">
            <div className="max-w-lg mx-auto rounded-3xl border border-dashed border-white/20 bg-white/[0.03] backdrop-blur-xl p-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-brand-electric" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Genuine Reviews Coming Soon</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  We only display verified customer feedback. Check our Instagram profile for
                  genuine customer interactions, comments, and reactions to our work.
                </p>
              </div>
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>See Customer Interactions on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
              <p className="text-[11px] font-mono text-slate-500">
                To add reviews, edit{' '}
                <code className="text-brand-orange">src/data/customerReviews.ts</code>
              </p>
            </div>
          </div>
        ) : reviews.length <= 3 ? (
          /* ── Small Grid (≤3 reviews) ── */
          <div
            className={`grid grid-cols-1 ${
              reviews.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            } gap-6 reveal delay-100`}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-3xl p-6 sm:p-7 bg-white/[0.04] border border-white/10 hover:border-brand-orange/30 hover:bg-white/[0.07] backdrop-blur-xl shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-brand-orange/40" />
                  {review.rating && renderStars(review.rating)}
                  <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed italic">
                    "{review.reviewText}"
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{review.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {review.source && (
                        <span className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                          via {review.source}
                        </span>
                      )}
                      {review.date && (
                        <span className="text-[11px] font-mono text-slate-500">{review.date}</span>
                      )}
                    </div>
                  </div>
                  {review.reviewUrl && (
                    <a
                      href={review.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-brand-orange transition-colors"
                      aria-label="View original review"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── Carousel (>3 reviews) ── */
          <div className="reveal delay-100">
            <div className="relative max-w-3xl mx-auto">
              {/* Card */}
              <div className="rounded-3xl p-8 sm:p-10 bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl min-h-[280px] flex flex-col justify-between">
                <div className="space-y-4">
                  <Quote className="w-10 h-10 text-brand-orange/40" />
                  {reviews[activeIndex].rating && renderStars(reviews[activeIndex].rating!)}
                  <p className="text-base sm:text-xl text-slate-200 font-light leading-relaxed italic">
                    "{reviews[activeIndex].reviewText}"
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{reviews[activeIndex].name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {reviews[activeIndex].source && (
                        <span className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                          via {reviews[activeIndex].source}
                        </span>
                      )}
                      {reviews[activeIndex].date && (
                        <span className="text-[11px] font-mono text-slate-500">
                          {reviews[activeIndex].date}
                        </span>
                      )}
                    </div>
                  </div>
                  {reviews[activeIndex].reviewUrl && (
                    <a
                      href={reviews[activeIndex].reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-brand-orange transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  aria-label="Previous review"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-300" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Go to review ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === activeIndex ? 'bg-brand-orange w-5' : 'bg-white/20 w-2'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next review"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
