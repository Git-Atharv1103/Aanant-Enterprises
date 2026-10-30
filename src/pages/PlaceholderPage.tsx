import React from 'react';
import { ArrowLeft, Clock, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { RealisticDiya, RangoliCornerPattern } from '../components/DiwaliFestiveDecor';

interface PlaceholderPageProps {
  title: string;
  onNavigate: (page: string) => void;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, onNavigate }) => {
  return (
    <main className="bg-[#0B1020] text-white min-h-[75vh] pt-8 sm:pt-10 pb-12 relative overflow-hidden flex items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <RangoliCornerPattern className="hidden lg:block absolute bottom-0 right-0 z-0 rotate-90" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, rgba(245,158,11,0.06) 40%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8">
        {/* Breadcrumb / Back button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>
        </div>

        {/* Placeholder Badge & Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2.5">
            <RealisticDiya size={28} className="shrink-0 -mt-1 hidden sm:inline-flex" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Diwali 2026 Edition • {title}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-xl mx-auto">
            This page placeholder is ready for future expansion. Requirements and content for{' '}
            <strong>{title}</strong> will be provided in the next phase.
          </p>
        </div>

        {/* Company Quick Contact Card */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1628]/80 backdrop-blur-xl p-6 sm:p-8 text-left space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/aanant-logo.png"
                alt="Aanant Enterprises"
                className="w-10 h-10 object-contain bg-white/10 rounded-xl p-1.5 border border-white/15"
              />
              <div>
                <div className="text-base font-extrabold text-white">Aanant Enterprises</div>
                <div className="text-xs font-mono text-brand-orange uppercase font-bold tracking-wider">
                  {COMPANY_INFO.tagline}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">
              Pune, MH
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-light">
            In the meantime, feel free to reach out directly to our Pune workshop for custom laser
            cutting, fiber laser engraving, and custom product development.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all"
            >
              <Mail className="w-4 h-4 text-brand-orange shrink-0" />
              <span className="truncate font-mono">{COMPANY_INFO.email}</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all"
            >
              <Phone className="w-4 h-4 text-brand-orange shrink-0" />
              <span className="font-mono">{COMPANY_INFO.phones[0]}</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phones[1].replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all"
            >
              <Phone className="w-4 h-4 text-brand-orange shrink-0" />
              <span className="font-mono">{COMPANY_INFO.phones[1]}</span>
            </a>

            <a
              href={COMPANY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all"
            >
              <div className="flex items-center gap-2.5 truncate">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="truncate">Nanded Phata, Pune</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            </a>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 font-light border-t border-white/5">
            <strong>Address:</strong> {COMPANY_INFO.address.fullFormatted}
          </div>
        </div>

        {/* Primary Action Button */}
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 transition-all shadow-glow-orange"
          >
            Explore Homepage & Services
          </button>
        </div>
      </div>
    </main>
  );
};
