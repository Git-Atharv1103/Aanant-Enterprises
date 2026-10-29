import React, { useRef, useState } from 'react';
import { Building2, ZoomIn, X, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';

interface ClientItem {
  name: string;
  category: string;
  badgeColor: string;
}

const VERIFIED_CLIENTS: ClientItem[] = [
  { name: 'Tata', category: 'Conglomerate & Automotive', badgeColor: '#3478F6' },
  { name: 'Bajaj Finance', category: 'Banking & Financial', badgeColor: '#3478F6' },
  { name: 'Bridgestone', category: 'Automotive & Tyres', badgeColor: '#EF4444' },
  { name: 'Brembo', category: 'High-Performance Braking', badgeColor: '#EF4444' },
  { name: 'Lear Corporation', category: 'Automotive Systems', badgeColor: '#EF4444' },
  { name: 'Atlas Copco Group', category: 'Industrial Equipment', badgeColor: '#00E5FF' },
  { name: 'Kirloskar', category: 'Heavy Engineering', badgeColor: '#10B981' },
  { name: 'Cognex', category: 'Industrial Machine Vision', badgeColor: '#EAB308' },
  { name: 'Stanley Engineered Fastening', category: 'Engineered Fasteners', badgeColor: '#EAB308' },
  { name: 'Persistent Systems', category: 'IT & Digital Engineering', badgeColor: '#FF6B00' },
  { name: 'Bajaj Broking', category: 'Financial Securities', badgeColor: '#3478F6' },
  { name: 'Swasthey Pharma', category: 'Healthcare & Pharma', badgeColor: '#10B981' },
  { name: 'Edifice', category: 'Design & Construction', badgeColor: '#38BDF8' },
  { name: 'B.G. Shirke', category: 'Infrastructure & Construction', badgeColor: '#EF4444' },
  { name: 'ARaymond', category: 'Fastening Solutions', badgeColor: '#3478F6' },
  { name: 'Universal', category: 'Industrial & Gifting', badgeColor: '#00E5FF' },
  { name: 'Edgemate', category: 'Powering Edge Solutions', badgeColor: '#10B981' },
  { name: 'Micro Lifts', category: 'Elevators & Engineering', badgeColor: '#EF4444' },
  { name: 'Samarth Glotech', category: 'Automation Solutions', badgeColor: '#FF6B00' },
  { name: 'Kidzee', category: 'Education & Early Learning', badgeColor: '#A855F7' },
  { name: 'Yojak', category: 'Social Action & Knowledge', badgeColor: '#F43F5E' },
  { name: 'Sahyadri Infrastructure', category: 'Civil & Real Estate', badgeColor: '#38BDF8' },
  { name: 'Manbhari Sadi', category: 'Retail & Fashion', badgeColor: '#EC4899' },
  { name: 'Daily Greens', category: 'Organic & Food Products', badgeColor: '#10B981' },
  { name: 'SS Electricals', category: 'Industrial Electricals', badgeColor: '#EAB308' },
];

export const ClienteleSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="clientele"
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#090D18] via-[#0E1628] to-[#090D18] text-slate-100 border-t border-white/10"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Trusted By Our Clientele</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Brands That Count On{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-brand-electric bg-clip-text text-transparent">
              Aanant Enterprises
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            From India's largest conglomerates and automotive leaders to cutting-edge tech startups,
            we are proud to deliver bespoke corporate gifting and industrial identification solutions.
          </p>
        </div>

        {/* ── Split Layout: Client Grid + Corporate Profile Sheet Feature ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Column: 25 Verified Client Cards in 3-col on desktop / 2-col on mobile */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5 reveal-left">
            {VERIFIED_CLIENTS.map((client, idx) => (
              <div
                key={client.name}
                className="group rounded-2xl p-4 bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.07] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-24 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: client.badgeColor }}
                  />
                  <span className="text-[10px] font-mono text-slate-500">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                    {client.name}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                    {client.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Verified Clientele Showcase Card with Lightbox */}
          <div className="lg:col-span-4 reveal-right space-y-4">
            <div
              className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 hover:border-brand-orange/40 backdrop-blur-xl shadow-2xl space-y-4 group cursor-pointer transition-all duration-300"
              onClick={() => setIsSheetModalOpen(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                    Official Corporate Portfolio
                  </span>
                </div>
                <span className="p-1.5 rounded-lg bg-white/10 text-white/70 group-hover:text-white group-hover:bg-brand-orange transition-all">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              {/* Thumbnail of actual Clientele Page */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white shadow-inner aspect-[3/4] flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform">
                <img
                  src="/images/clientele-sheet.png"
                  alt="Aanant Enterprises Clientele Sheet — Tata, Bajaj, Bridgestone, Lear, Brembo, Kirloskar"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute bottom-2 inset-x-2 p-2 rounded-xl bg-black/80 backdrop-blur-md text-white text-[11px] font-mono text-center flex items-center justify-center gap-1.5 opacity-90">
                  <ZoomIn className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Click to Inspect All 27 Logos</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-light">
                Documented from our official corporate profile. Includes premier global OEMs,
                infrastructure giants, educational networks, and institutions.
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-xl font-black text-brand-orange">25+</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Enterprise Clients</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-xl font-black text-brand-electric">100%</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Custom Branded</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── Lightbox Modal for Clientele Sheet ── */}
      {isSheetModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsSheetModalOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSheetModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close clientele sheet"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-4 sm:p-6 rounded-3xl w-full flex items-center justify-center bg-white shadow-2xl overflow-auto max-h-[80vh]">
              <img
                src="/images/clientele-sheet.png"
                alt="Aanant Enterprises Corporate Clientele Portfolio"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="mt-4 text-center space-y-1">
              <div className="text-sm font-bold text-white">
                Aanant Enterprises — Verified Corporate Clientele
              </div>
              <div className="text-xs font-mono text-slate-400">
                Tata • Bajaj Finance • Bridgestone • Brembo • Lear • Atlas Copco • Kirloskar • Cognex
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
