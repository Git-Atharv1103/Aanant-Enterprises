import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FLAGSHIP_SERVICES } from '../data/companyData';
import { InteractiveServiceCard } from './InteractiveServiceCard';
import { RealisticDiya } from './DiwaliFestiveDecor';

interface ServicesSectionProps {
  onNavigate: (route: string) => void;
  isStandalonePage?: boolean;
  onSelectServiceForEnquiry?: (service: any) => void;
}

const timings = [4200, 4900, 5500, 4600];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="services"
      className="py-12 lg:py-16 bg-[#0B1020] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Aanant Enterprises Our Services"
    >
      {/* Background Decorative Patterns with Radiant Diwali Golden Warmth & Lighting */}
      <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />
      <div
        className="absolute top-0 inset-x-0 h-40 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.22) 0%, rgba(245, 158, 11, 0.1) 40%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-2.5">
            <RealisticDiya size={26} className="shrink-0 -mt-1 hidden sm:inline-flex" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR SERVICES • DIWALI 2026</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Precision Solutions.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-electric">
              Endless Possibilities.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            From personalised gifts to precision industrial marking, discover solutions designed around your ideas.
          </p>
        </div>

        {/* Four Interactive Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {FLAGSHIP_SERVICES.map((service, index) => (
            <InteractiveServiceCard
              key={service.id}
              service={service}
              index={index}
              timing={timings[index] || 4500}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Footer Note & Guidance */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <span className="text-slate-400 text-center sm:text-left">
            * Images shown are representative visual examples of laser engraving, cutting, and marking capabilities.
          </span>
          <span className="text-brand-orange font-semibold flex items-center gap-1.5">
            <span>Click any card to view service details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </section>
  );
};
