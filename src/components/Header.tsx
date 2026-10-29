import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  isAnchor?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Our Services', isAnchor: true },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (item: NavItem) => {
    setMobileMenuOpen(false);
    if (item.id === 'home') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.id === 'services') {
      if (currentPage === 'home') {
        const servicesEl = document.getElementById('services');
        if (servicesEl) {
          servicesEl.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      onNavigate('home');
      // Timeout to wait for home to mount before scrolling
      setTimeout(() => {
        const servicesEl = document.getElementById('services');
        if (servicesEl) {
          servicesEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      onNavigate(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B1020]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3'
            : 'bg-[#0B1020]/40 backdrop-blur-md border-b border-white/5 py-4 lg:py-5'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left side: Company Logo + Aanant Enterprises text + Tagline */}
            <button
              onClick={() => handleNavClick({ id: 'home', label: 'Home' })}
              className="flex items-center gap-3.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-xl p-1 -m-1 transition-transform active:scale-98"
              aria-label="Aanant Enterprises — Home"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-1.5 border border-white/15 shadow-md flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-brand-orange/40 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.25)]">
                <img
                  src="/images/aanant-logo.png"
                  alt="Aanant Enterprises Logo"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    // Fallback if png issue occurs
                    (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
                  }}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                    Aanant Enterprises
                  </span>
                </div>
                <span className="text-[11px] font-mono tracking-widest text-brand-orange font-semibold uppercase mt-0.5">
                  {COMPANY_INFO.tagline}
                </span>
              </div>
            </button>

            {/* Right side: Desktop Navigation Links */}
            <nav
              className="hidden md:flex items-center gap-1 lg:gap-2"
              aria-label="Primary navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  (item.id === 'home' && currentPage === 'home') ||
                  (item.id === 'about' && currentPage === 'about') ||
                  (item.id === 'contact' && currentPage === 'contact');

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      isActive
                        ? 'text-white font-semibold bg-white/10 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {/* Animated Underline */}
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-brand-orange transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Quick Contact CTA on Desktop Nav */}
              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-brand-orange/20 border border-white/15 hover:border-brand-orange/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                aria-label={`Call Aanant Enterprises at ${COMPANY_INFO.phones[0]}`}
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                <span className="font-mono">{COMPANY_INFO.phones[0]}</span>
              </a>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                className="p-2 rounded-xl text-brand-orange bg-brand-orange/10 border border-brand-orange/20"
                aria-label={`Call ${COMPANY_INFO.phones[0]}`}
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange transition-colors"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0B1020]/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-[#0E1628] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/aanant-logo.png"
                alt="Aanant Enterprises"
                className="w-9 h-9 object-contain bg-white/10 rounded-lg p-1"
              />
              <div>
                <div className="text-sm font-extrabold text-white">Aanant Enterprises</div>
                <div className="text-[10px] font-mono text-brand-orange uppercase font-bold tracking-wider">
                  {COMPANY_INFO.tagline}
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive =
                (item.id === 'home' && currentPage === 'home') ||
                (item.id === 'about' && currentPage === 'about') ||
                (item.id === 'contact' && currentPage === 'contact');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-brand-orange/20 text-white border border-brand-orange/30'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          {/* Drawer Footer: Direct Contact Info */}
          <div className="p-5 border-t border-white/10 bg-black/20 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Get in Touch
            </div>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-2.5 text-xs text-slate-200 hover:text-brand-orange transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span className="truncate">{COMPANY_INFO.email}</span>
            </a>
            <div className="space-y-1">
              {COMPANY_INFO.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 text-xs text-slate-200 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span className="font-mono">{phone}</span>
                </a>
              ))}
            </div>
            <a
              href={COMPANY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-[11px] text-slate-400 hover:text-slate-200 transition-colors pt-1"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
              <span>Nanded Phata, Pune, Maharashtra</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
