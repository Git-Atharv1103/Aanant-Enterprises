import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { Sparkles, ArrowRight, Wrench } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-24 bg-gradient-to-b from-[#090d16] via-[#0d1322] to-[#070a10] min-h-screen text-slate-100">
      
      {/* Page Header */}
      <div className="relative py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Showcase & Photo Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our Work & Custom Creations
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Explore authentic workshop photographs of laser engraved nameplates, personalised artifacts, architectural decorative screens, and custom CNC milled components.
          </p>
        </div>
      </div>

      {/* Main Gallery Section with Lightbox */}
      <GallerySection onNavigate={onNavigate} showTitle={false} />

      {/* Bottom CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white tracking-tight">
              Have a custom design or project drawing in mind?
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl font-light">
              Share your concept, dimensions, or CAD drawing file. Our Pune team will review feasibility and evaluate optimal laser or CNC setups.
            </p>
          </div>
          <button
            onClick={() => onNavigate('custom-request')}
            className="flex-shrink-0 px-7 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all flex items-center gap-2 active:scale-95"
          >
            <Wrench className="w-4 h-4" />
            <span>Configure Custom Piece</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
