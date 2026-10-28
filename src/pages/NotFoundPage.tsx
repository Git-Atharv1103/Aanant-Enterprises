import React from 'react';
import { Home, Package, FileText } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-36 pb-24 bg-gradient-to-b from-[#090d16] via-[#0d1322] to-[#070a10] min-h-[80vh] flex items-center justify-center text-slate-100">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-brand-orange/15 text-brand-orange flex items-center justify-center mx-auto border border-brand-orange/30 shadow-glow-orange/20">
          <span className="text-4xl font-mono font-black tracking-wider">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Component Not Found</h1>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            The requested design path does not exist or has been restructured. Use the navigation links below to explore our laser & CNC capabilities.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => {
              onNavigate('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-all hover:text-white"
          >
            <Package className="w-4 h-4 text-brand-orange" />
            <span>Browse Products</span>
          </button>

          <button
            onClick={() => {
              onNavigate('custom-request');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-all hover:text-white"
          >
            <FileText className="w-4 h-4 text-brand-blue-electric" />
            <span>Custom Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
