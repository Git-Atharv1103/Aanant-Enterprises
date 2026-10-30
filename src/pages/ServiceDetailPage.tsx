import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  Sparkles,
  ChevronRight,
  Gift,
  CheckCircle2,
  ZoomIn,
  X,
  MessageCircle,
} from 'lucide-react';
import { FLAGSHIP_SERVICES, COMPANY_INFO } from '../data/companyData';
import { RealisticDiya } from '../components/DiwaliFestiveDecor';

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

  const [activeModalImg, setActiveModalImg] = useState<string | null>(null);

  const whatsappMessage = encodeURIComponent(
    `Hello Aanant Enterprises, I would like to inquire about Diwali corporate gifting and services for ${service.title}.`
  );
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${whatsappMessage}`;

  return (
    <main className="bg-transparent text-white min-h-screen pt-3 sm:pt-4 pb-12 relative overflow-hidden select-none">
      {/* Background Ambience with Diwali Warmth */}
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />
      <div
        className="absolute top-20 right-1/4 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${service.accentColor}20 0%, rgba(245, 158, 11, 0.08) 50%, transparent 70%)`,
        }}
      />
      <div
        className="absolute top-1/2 left-10 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">

        {/* ── Breadcrumb & Back to Home ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
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

        {/* ── Service Header Banner (Diwali Festive Atmosphere) ── */}
        <div className="rounded-3xl border border-amber-500/30 bg-[#0E1628]/90 backdrop-blur-xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <RealisticDiya size={32} className="shrink-0 -mt-1 hidden sm:inline-flex" />
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border shadow-sm"
                style={{
                  backgroundColor: `${service.accentColor}20`,
                  borderColor: `${service.accentColor}50`,
                  color: service.accentColor,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.badge} • Diwali 2026 Collection</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              {service.description}
            </p>

            {/* Quick Festive CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order On WhatsApp</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Inquiry%20-%20${encodeURIComponent(service.title)}`}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 transition-all flex items-center gap-2 shadow-glow-orange"
              >
                <Mail className="w-4 h-4" />
                <span>Request Quotation</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call Workshop</span>
              </a>
            </div>
          </div>

          {/* Decorative Background Corner Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25"
            style={{ backgroundColor: service.accentColor }}
          />
        </div>

        {/* ── Diwali 2026 Special Highlight Panel ── */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-[#0E1628]/80 to-brand-orange/10 p-6 sm:p-8 space-y-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
              <Gift className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Festive Season Gifting & Manufacturing Suite
              </h3>
              <p className="text-xs text-amber-200/90 mt-0.5">
                Bulk corporate orders • Custom client logo laser engraving • Timely festive dispatch across India
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bespoke Logo Marking</span>
              </div>
              <p className="text-[11px] text-slate-300 font-light">
                Sharp fiber laser engraving and UV multi-color branding with client vector graphics.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Packaging</span>
              </div>
              <p className="text-[11px] text-slate-300 font-light">
                Premium gift box packaging with custom greeting cards and ribbon presentation.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pan-India Logistics</span>
              </div>
              <p className="text-[11px] text-slate-300 font-light">
                Guaranteed safe batch delivery to single or multiple corporate branch locations.
              </p>
            </div>
          </div>
        </div>

        {/* ── Product & Visual Specimen Gallery (Properly Fitted, No Cropping) ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span>Specimen Gallery & Product Details</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Click specimen to view high-res</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveModalImg(img)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E1628] h-64 flex flex-col justify-between shadow-xl hover:border-amber-500/50 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Visual container with object-contain */}
                <div className="relative w-full h-48 bg-gradient-to-br from-[#070B16] to-[#121A2D] flex items-center justify-center p-3 border-b border-white/5">
                  <img
                    src={img}
                    alt={`${service.title} specimen ${i + 1}`}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Zoom Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="absolute top-2.5 left-2.5 font-mono text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    #{i + 1}
                  </span>
                </div>

                <div className="p-3 bg-[#0B1020]/90 flex items-center justify-between text-xs">
                  <span className="font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                    {service.title} Model #{i + 1}
                  </span>
                  <span className="text-[10px] font-mono text-brand-orange shrink-0">
                    Inspect
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Switcher: Explore Other Core Services ── */}
        <section className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Explore Other Core Services
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {otherServices.length} Services Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherServices.map((other) => (
              <button
                key={other.id}
                onClick={() => {
                  onNavigate(other.route);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-500/40 transition-all text-left group"
              >
                <div className="text-[10px] font-mono font-bold text-brand-orange uppercase">
                  {other.badge}
                </div>
                <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5">
                  {other.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-light">
                  {other.shortDescription}
                </div>
              </button>
            ))}
          </div>
        </section>

      </div>

      {/* ── Lightbox Modal for High-Resolution View ── */}
      {activeModalImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
          onClick={() => setActiveModalImg(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs font-mono text-amber-300 uppercase font-bold">
                {service.title} • High-Resolution Specimen Preview
              </span>
              <button
                type="button"
                onClick={() => setActiveModalImg(null)}
                aria-label="Close Preview"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center rounded-2xl bg-[#090E1A] border border-white/15 overflow-hidden p-6">
              <img
                src={activeModalImg}
                alt={service.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
