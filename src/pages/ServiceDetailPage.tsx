import React from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { FLAGSHIP_SERVICES, COMPANY_INFO } from '../data/companyData';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (page: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onNavigate,
}) => {
  const service =
    FLAGSHIP_SERVICES.find((s) => s.route === serviceId || s.id === serviceId) ||
    FLAGSHIP_SERVICES[0];

  const otherServices = FLAGSHIP_SERVICES.filter((s) => s.id !== service.id);

  return (
    <main className="bg-[#0B1020] text-white min-h-screen pt-28 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <div
        className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${service.accentColor}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Breadcrumb & Back to Home ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-brand-orange transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-brand-orange transition-colors"
            >
              Our Services
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold truncate">{service.title}</span>
          </nav>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* ── Service Header Banner ── */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1628]/80 backdrop-blur-xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
              style={{
                backgroundColor: `${service.accentColor}15`,
                borderColor: `${service.accentColor}40`,
                color: service.accentColor,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              {service.description}
            </p>

            <div className="pt-2 text-xs font-mono text-slate-400">
              <strong className="text-slate-300">Image Direction:</strong> {service.imageDirection}
            </div>
          </div>

          {/* Decorative Corner Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: service.accentColor }}
          />
        </div>

        {/* ── Placeholder Information Card (Phase 2 Ready) ── */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8 space-y-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Detailed Catalogue In Preparation (Phase 2)
              </h3>
              <p className="text-xs text-amber-200/80 mt-0.5">
                Placeholder structure ready for future expansion.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">
            This dedicated service page structure is now established. In the upcoming phase,
            we will incorporate the complete product specifications, dimensional tolerances,
            material selections, and specialized inquiry flows for <strong>{service.title}</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Available Machines:</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
              CO2 Laser Machine
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
              Fiber Laser Engraving Machine
            </span>
          </div>
        </div>

        {/* ── Sample Visual Gallery Strip ── */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Visual Craftsmanship Examples
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {service.images.map((img, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden border border-white/10 h-48 group shadow-lg"
              >
                <img
                  src={img}
                  alt={`${service.title} sample ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-[11px] font-mono text-slate-300">
                    Sample {i + 1} • {service.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Direct Contact & Inquiry Panel ── */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1628]/60 p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-brand-orange uppercase tracking-wider font-bold">
                Direct Pune Workshop Contact
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Have a requirement for {service.title}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Reach out directly to discuss your custom project dimensions and artwork.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 transition-all flex items-center gap-2 shadow-glow-orange"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                <span>Call Workshop</span>
              </a>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-start gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Email</div>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white font-mono">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Phones</div>
                <div className="font-mono">{COMPANY_INFO.phones.join(' / ')}</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Workshop Location</div>
                <div>Nanded Phata, Pune, Maharashtra</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Other Services Navigation ── */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Explore Other Services
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {otherServices.map((other) => (
              <button
                key={other.id}
                onClick={() => {
                  onNavigate(other.route);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-orange/40 text-left transition-all group"
              >
                <div className="text-[11px] font-mono text-brand-orange font-bold uppercase">
                  {other.badge}
                </div>
                <div className="text-sm font-bold text-white mt-1 group-hover:text-amber-200 transition-colors">
                  {other.title}
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {other.shortDescription}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};
