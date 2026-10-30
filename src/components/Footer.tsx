import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, ExternalLink, Cpu, Zap } from 'lucide-react';
import { COMPANY_INFO, FLAGSHIP_SERVICES } from '../data/companyData';
import { RealisticDiya } from './DiwaliFestiveDecor';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (pageId: string) => {
    if (pageId === 'services') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A14] text-white border-t border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 industrial-grid-dark opacity-15 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(52,120,246,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* ── Brand & Company Identity (5 cols) ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 border border-white/15 flex items-center justify-center">
                <img
                  src="/images/aanant-logo.png"
                  alt="Aanant Enterprises"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">
                  Aanant Enterprises
                </h3>
                <p className="text-xs font-mono text-brand-orange uppercase font-bold tracking-wider">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light max-w-md">
              Aanant Enterprises transforms ideas into personalised products and precision-marked
              components using CO2 laser cutting and fiber laser engraving technology in Pune.
            </p>

            {/* In-House Machines Available */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Available In-House Machines:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                  <Cpu className="w-3.5 h-3.5 text-brand-electric" />
                  <span>CO2 Laser Machine</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                  <Zap className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Fiber Laser Engraving Machine</span>
                </span>
              </div>
            </div>
          </div>

          {/* ── Core Services Links (3 cols) ── */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-brand-orange font-bold">
              Our Services
            </div>
            <ul className="space-y-2.5 text-sm">
              {FLAGSHIP_SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNav(s.route)}
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-orange transition-colors" />
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact & Location (4 cols) ── */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-brand-orange font-bold">
              Workshop Contact & Location
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-light">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-start gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span className="font-mono">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div className="space-y-0.5 font-mono">
                  {COMPANY_INFO.phones.map((phone) => (
                    <div key={phone}>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white">
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Nanded Phata, Pune, Maharashtra</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {COMPANY_INFO.address.fullFormatted}
                  </div>
                  <span className="text-[10px] font-mono text-brand-orange group-hover:underline inline-flex items-center gap-1 mt-1 font-semibold">
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* ── Diwali 2026 Festive Greeting Banner ── */}
        <div className="my-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-200 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <RealisticDiya size={26} className="shrink-0 -mt-1" />
            <span className="font-mono font-bold text-amber-300">
              ✨ Wishing You a Joyous & Prosperous Diwali 2026
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-300">
            Aanant Enterprises • Precision Laser Engraving & Corporate Gifting
          </span>
        </div>

        {/* ── Copyright & Bottom Strip ── */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {currentYear} Aanant Enterprises. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('about')}
              className="hover:text-amber-300 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-amber-300 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
