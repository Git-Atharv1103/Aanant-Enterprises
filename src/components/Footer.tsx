import React, { useRef } from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useScrollReveal } from '../utils/useScrollReveal';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const footerRef = useRef<HTMLElement>(null);
  useScrollReveal(footerRef);
  const year = new Date().getFullYear();

  const nav = (pageId: string) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mainLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products Gallery' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const actionLinks = [
    { id: 'custom-request', label: 'Custom Product Request' },
    { id: 'quote', label: 'Request a Quote' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const legalLinks = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
  ];

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${encodeURIComponent('Hello Aanant Enterprises, I visited your website and would like to discuss a custom product requirement.')}`;

  return (
    <footer ref={footerRef} className="footer-gradient text-white border-t border-white/8 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 industrial-grid-dark opacity-20 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(52,120,246,0.07) 0%, transparent 70%)' }} />

      {/* Workshop Active Strip */}
      <div className="border-b border-white/8 bg-white/4 py-3.5 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pune Manufacturing Workshop — Accepting B2B Drawings & Custom Enquiries</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-mono text-white/50">
              <span className="text-brand-orange font-bold">GSTIN:</span> {COMPANY_INFO.gstin}
            </span>
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/50 hover:text-brand-orange transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@aanantenterprises03</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6 reveal">
            <div>
              <img
                src="/images/aanant-logo.png"
                alt="Aanant Enterprises Logo"
                className="h-10 sm:h-12 w-auto object-contain bg-white/8 rounded-xl p-2"
              />
              <h3 className="text-lg font-extrabold text-white mt-4">{COMPANY_INFO.name}</h3>
              <p className="text-xs uppercase tracking-widest text-brand-orange font-bold mt-0.5">
                {COMPANY_INFO.tagline}
              </p>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Custom laser engraving, laser cutting, and CNC solutions designed around
              your requirements — from Pune, Maharashtra.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => nav('custom-request')}
                className="btn-primary shimmer-sweep text-xs px-4 py-2.5"
              >
                Request a Quotation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-xs font-bold transition-all border border-emerald-600/20"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4 reveal delay-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-brand-orange pl-3">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {mainLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => nav(l.id)}
                    className="text-sm text-white/55 hover:text-brand-orange transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-brand-orange transition-all group-hover:w-3" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="lg:col-span-2 space-y-4 reveal delay-200">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-brand-electric pl-3">
              Take Action
            </h4>
            <ul className="space-y-2.5">
              {actionLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => nav(l.id)}
                    className="text-sm text-white/55 hover:text-brand-orange transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-brand-orange transition-all group-hover:w-3" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-4 reveal delay-300">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-brand-amber pl-3">
              Contact & Location
            </h4>

            <div className="space-y-3 text-sm text-white/55">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <p className="leading-relaxed text-xs">{COMPANY_INFO.address.fullFormatted}</p>
              </div>
              <div className="space-y-2">
                {COMPANY_INFO.phones.map((p) => (
                  <a key={p} href={`tel:${p}`} className="flex items-center gap-3 hover:text-brand-orange transition-colors">
                    <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                    <span>{p}</span>
                  </a>
                ))}
              </div>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-3 hover:text-brand-orange transition-colors">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="text-xs">{COMPANY_INFO.email}</span>
              </a>
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-brand-electric hover:text-blue-400 transition-colors mt-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="section-divider-dark mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <span>© {year} {COMPANY_INFO.name}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {legalLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => nav(l.id)}
                className="hover:text-white/60 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
