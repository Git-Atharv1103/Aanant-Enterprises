import React, { useRef } from 'react';
import { Sparkles, Zap, Cpu, Layers, CheckCircle2, ArrowRight, AlertCircle, MoveRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';
import { useScrollReveal } from '../utils/useScrollReveal';
import type { ServiceItem } from '../types';

interface ServicesSectionProps {
  onNavigate: (page: string) => void;
  isStandalonePage?: boolean;
  onSelectServiceForEnquiry?: (service: ServiceItem) => void;
}

const iconMap: Record<string, React.ElementType> = { Sparkles, Zap, Cpu, Layers };

const serviceImages = [
  '/images/laser-marking-action.jpg',
  '/images/laser-parts.jpg',
  '/images/cnc-parts.jpg',
  '/images/personalized-gifts.jpg',
];

const accentColors = [
  { bg: 'rgba(255,107,0,0.15)', border: 'rgba(255,107,0,0.4)', text: '#FF6B00', light: 'rgba(255,107,0,0.08)' },
  { bg: 'rgba(52,120,246,0.15)', border: 'rgba(52,120,246,0.4)', text: '#3478F6', light: 'rgba(52,120,246,0.08)' },
  { bg: 'rgba(52,120,246,0.15)', border: 'rgba(52,120,246,0.4)', text: '#3478F6', light: 'rgba(52,120,246,0.08)' },
  { bg: 'rgba(255,181,71,0.15)', border: 'rgba(255,181,71,0.4)', text: '#FFB547', light: 'rgba(255,181,71,0.08)' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigate,
  isStandalonePage = false,
  onSelectServiceForEnquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`py-24 lg:py-32 relative overflow-hidden ${isStandalonePage ? 'pt-36' : ''}`}
      style={{ background: 'linear-gradient(180deg, #0B1020 0%, #0e1628 50%, #0B1020 100%)' }}
      id="services-section"
    >
      {/* Background */}
      <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(52,120,246,0.08) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(255,107,0,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20 space-y-5 reveal">
          <div className="section-eyebrow bg-brand-orange/15 border border-brand-orange/25 text-brand-orange">
            What Can We Create For You?
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            Our Core Precision <br className="hidden sm:block" />
            <span style={{
              background: 'linear-gradient(90deg, #3478F6, #60a5fa)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Cutting & Customisation</span> Services
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            From individual name engraving and corporate branding to precision laser
            profiling and CNC cutting — we transform customer designs into finished products.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => {
            const Icon = iconMap[service.iconName] || Sparkles;
            const accent = accentColors[index];
            const image = serviceImages[index];
            const isLast = index === SERVICES_DATA.length - 1;

            return (
              <div
                key={service.id}
                className={`reveal ${index % 2 === 0 ? '' : 'delay-200'} group relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-default`}
                style={{
                  background: 'linear-gradient(135deg, rgba(20,38,77,0.7) 0%, rgba(11,16,32,0.6) 100%)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = accent.border;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 48px rgba(0,0,0,0.3), 0 0 0 1px ${accent.border}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                {/* Image Strip */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-brand-midnight/95" />

                  {/* Laser sweep on hover */}
                  <div className="laser-sweep opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Number Label */}
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/50 text-white/70 backdrop-blur-sm border border-white/10">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-2.5 py-1 rounded-full backdrop-blur-md font-bold" style={{ background: accent.bg, color: accent.text, border: `1px solid ${accent.border}` }}>
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-5">

                  {/* Icon + Title */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.text }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight group-hover:opacity-90 transition-opacity">
                        {service.title}
                      </h3>
                      <p className="text-xs text-white/50 font-mono mt-0.5 uppercase tracking-wider">{service.category}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/65 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Applications */}
                  <div className="space-y-2.5 pt-2 border-t border-white/8">
                    <h4 className="text-2xs uppercase tracking-widest font-bold text-white/40">Applications</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {service.applications.slice(0, 4).map((app, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent.text }} />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Material Note */}
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl text-xs text-white/50" style={{ background: accent.light }}>
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent.text }} />
                    <span>{service.materialNote}</span>
                  </div>

                  {/* CTA */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (onSelectServiceForEnquiry) onSelectServiceForEnquiry(service);
                        onNavigate('custom-request');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group/btn ${
                        isLast
                          ? 'btn-primary'
                          : 'text-white border border-white/15 hover:border-white/30 hover:bg-white/8'
                      }`}
                    >
                      <span>{isLast ? 'Discuss Your Design' : 'Request Customisation'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <span className="text-2xs text-white/30 font-mono">Per customer drawings</span>
                  </div>

                </div>

                {/* Bottom accent line */}
                <div className="service-card-line" style={{ background: `linear-gradient(90deg, ${accent.text}, transparent)` }} />
              </div>
            );
          })}
        </div>

        {/* Global CTA Banner */}
        <div className="mt-12 reveal delay-200">
          <div className="rounded-3xl border border-white/10 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(52,120,246,0.12) 0%, rgba(255,107,0,0.08) 100%)' }}>
            {/* Subtle grid inside */}
            <div className="absolute inset-0 industrial-grid-dark opacity-40 pointer-events-none" />

            <div className="relative text-center sm:text-left space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Have a unique product idea?
              </h3>
              <p className="text-sm text-white/60">
                Share your sketches, vector logos, artwork, or drawing files. Our Pune team will
                review feasibility and discuss suitable laser or CNC solutions.
              </p>
            </div>
            <button
              onClick={() => onNavigate('custom-request')}
              className="btn-primary shimmer-sweep text-sm px-6 py-3.5 whitespace-nowrap relative"
            >
              <span>Discuss Your Design</span>
              <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
