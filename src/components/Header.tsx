import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, FileText, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'products', label: 'Products' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [atHero, setAtHero] = useState(currentPage === 'home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setAtHero(currentPage === 'home' && !scrolled);
  }, [currentPage, scrolled]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (pageId: string) => {
    onNavigate(pageId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !atHero
            ? 'glass-nav shadow-nav py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">

            {/* Logo */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 focus:outline-none group"
              aria-label="Aanant Enterprises — Home"
            >
              <div className={`h-9 sm:h-10 rounded-lg overflow-hidden transition-all ${
                scrolled || !atHero ? 'bg-white/10 p-1' : 'p-0'
              }`}>
                <img
                  src="/images/aanant-logo.png"
                  alt="Aanant Enterprises"
                  className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-brand-orange bg-brand-orange/15 shadow-sm border border-brand-orange/30'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-brand-orange" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phones[0]}`}
                className="hidden 2xl:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-brand-orange transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                </span>
                <span className="font-mono">{COMPANY_INFO.phones[0]}</span>
              </a>

              <button
                onClick={() => handleNav('custom-request')}
                className="btn-primary shimmer-sweep text-xs sm:text-sm px-4 sm:px-5 py-2.5"
                id="header-get-quote-btn"
              >
                <FileText className="w-4 h-4" />
                <span>Get a Quote</span>
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => handleNav('custom-request')}
                className="text-xs font-bold px-3.5 py-2 rounded-xl text-white gradient-orange-btn shadow-glow-sm"
              >
                Get a Quote
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen
                  ? <X className="w-6 h-6" />
                  : <Menu className="w-6 h-6" />
                }
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-midnight/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 w-80 max-w-[90vw] h-full bg-brand-midnight text-white flex flex-col transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <img
              src="/images/aanant-logo.png"
              alt="Aanant Enterprises"
              className="h-8 w-auto object-contain bg-white/10 rounded-md p-1"
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full text-left flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-orange/15 text-brand-orange border border-brand-orange/25'
                      : 'text-white/80 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </nav>

          {/* Drawer Footer CTAs */}
          <div className="px-4 pb-8 space-y-3 border-t border-white/10 pt-4">
            <button
              onClick={() => handleNav('custom-request')}
              className="w-full btn-primary justify-center py-3.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get a Quote / Custom Request</span>
            </button>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phones[0]}`}
                className="flex items-center gap-2 justify-center py-2.5 rounded-xl bg-white/8 text-white/80 hover:text-white hover:bg-white/12 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                <span>Call Us</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${encodeURIComponent('Hello Aanant Enterprises, I visited your website and would like to discuss a custom product requirement.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center py-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
              >
                <span className="text-base">💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
            <p className="text-center text-2xs text-white/30 mt-2">
              GSTIN: {COMPANY_INFO.gstin}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
