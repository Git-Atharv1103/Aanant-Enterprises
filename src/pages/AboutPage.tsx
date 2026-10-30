import React from 'react';
import { Target, Cpu, Sliders, Building2, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { ABOUT_SECTIONS } from '../data/companyData';
import { TiltCard } from '../components/TiltCard';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const iconMap: Record<string, React.ElementType> = {
    Building2,
    Cpu,
    Sliders,
    Target
  };

  const pillarGlows = [
    'rgba(255, 107, 0, 0.25)',
    'rgba(52, 120, 246, 0.25)',
    'rgba(0, 210, 106, 0.25)',
    'rgba(255, 181, 71, 0.25)',
  ];

  return (
    <div className="pt-4 sm:pt-6 pb-12 bg-gradient-to-b from-[#090d16] via-[#0d1322] to-[#070a10] min-h-screen text-slate-100">
      
      {/* Hero Header */}
      <div className="relative py-8 sm:py-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Heritage & Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Turning Ideas Into Custom Creations
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Aanant Enterprises operates high-precision laser and CNC machinery to support custom cutting, engraving, marking, and bespoke product development requirements in Pune.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Core Pillars 3D Grid */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Our Custom Manufacturing Approach
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 font-light">
              We focus on practical execution, design feasibility, and authentic collaboration with individuals, architects, contractors, and corporate clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {ABOUT_SECTIONS.map((sec, index) => {
              const Icon = iconMap[sec.iconName] || Cpu;
              const glow = pillarGlows[index % pillarGlows.length];

              return (
                <TiltCard
                  key={index}
                  maxTilt={8}
                  perspective={1000}
                  glareOpacity={0.2}
                  glareColor={glow}
                  className="rounded-3xl p-7 sm:p-9 bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between group hover:border-brand-orange/40 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="space-y-4" style={{ transform: 'translateZ(18px)' }}>
                    <div className="flex items-center justify-between">
                      <div className="w-13 h-13 p-3 rounded-2xl bg-white/10 text-brand-orange flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-white/10">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-black/40 text-slate-300 border border-white/10">
                        Pillar 0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors">
                      {sec.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {sec.description}
                    </p>
                  </div>

                  <div
                    className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400"
                    style={{ transform: 'translateZ(12px)' }}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Industrial Standard Verification</span>
                    </div>
                    <span className="text-white/60 font-semibold">Active Process</span>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Visual Showcase: Personalised Craftsmanship with 3D Tilt */}
        <TiltCard
          maxTilt={6}
          perspective={1100}
          glareOpacity={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <div className="rounded-2xl overflow-hidden h-72 sm:h-80 relative group border border-white/15 bg-black/40 shadow-inner" style={{ transform: 'translateZ(15px)' }}>
            <img
              src="/images/custom-nameplate.jpg"
              alt="Custom Nameplates and Desk Accessories"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono text-white bg-black/70 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                Custom Nameplates & Desk Accessories
              </span>
            </div>
          </div>

          <div className="space-y-4" style={{ transform: 'translateZ(20px)' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase">
              <span>Personalised Engineering</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Every Piece Made to Client Specification
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              We do not mass produce generic stock off the shelf. Every order begins with your vector drawing, dimension sheet, sketch, or personal vision.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('custom-request')}
                className="px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Discuss a Custom Requirement</span>
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-2"
              >
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </TiltCard>

      </div>
    </div>
  );
};
