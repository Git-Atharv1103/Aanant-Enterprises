import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackToTop } from './components/BackToTop';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { IndustrialLabellingPage } from './pages/IndustrialLabellingPage';
import { IndustrialCategoryDetailPage } from './pages/IndustrialCategoryDetailPage';
import { DiwaliTopBanner } from './components/DiwaliFestiveDecor';

export function App() {
  const normalizeRoute = (raw: string): string => {
    return raw.replace(/^[#/]+/, '').replace(/\/+$/, '').toLowerCase();
  };

  const getInitialPage = () => {
    const hash = window.location.hash;
    const pathname = window.location.pathname;

    const raw = hash && hash.length > 1 ? hash : pathname;
    const normalized = normalizeRoute(raw);

    if (!normalized || normalized === 'home' || normalized === 'services') {
      return 'home';
    }
    return normalized;
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);

  // Sync with browser hash and forward/back navigation
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleNavigate = (page: string) => {
    const normalized = normalizeRoute(page);
    setCurrentPage(normalized);
    window.location.hash = normalized === 'home' ? '' : '/' + normalized;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    const norm = normalizeRoute(currentPage);

    // ── Homepage ──
    if (norm === 'home' || norm === '') {
      return <HomePage onNavigate={handleNavigate} />;
    }

    // ── Industrial Labelling Main Service Page ──
    if (
      norm === 'services/industrial-labelling' ||
      norm === 'industrial-labelling' ||
      norm === 'service-industrial-labelling'
    ) {
      return <IndustrialLabellingPage onNavigate={handleNavigate} />;
    }

    // ── Industrial Labelling Six Category Detail Pages ──
    if (norm.includes('industrial-labelling/')) {
      const categorySlug = norm.replace('services/industrial-labelling/', '').replace('industrial-labelling/', '');
      return (
        <IndustrialCategoryDetailPage
          categorySlug={categorySlug}
          onNavigate={handleNavigate}
        />
      );
    }

    // Direct category slug access
    const directCategories = [
      'nameplates-industrial-identification',
      'custom-printed-labels-plates',
      'aluminium-name-plates',
      'trafolite-plates',
      'trafolite-labelling',
      'sublimation-plates',
      'industrial-plates',
      'industrial-stickers',
      'panel-door-locks',
    ];
    if (directCategories.includes(norm)) {
      return (
        <IndustrialCategoryDetailPage
          categorySlug={norm}
          onNavigate={handleNavigate}
        />
      );
    }

    // ── Other Service Detail Placeholder Pages ──
    if (norm === 'service-corporate-gifting' || norm === 'corporate-gifting') {
      return (
        <ServiceDetailPage
          serviceId="service-corporate-gifting"
          onNavigate={handleNavigate}
        />
      );
    }

    if (norm === 'service-mdf-acrylic-cutouts' || norm === 'mdf-acrylic-cutouts') {
      return (
        <ServiceDetailPage
          serviceId="service-mdf-acrylic-cutouts"
          onNavigate={handleNavigate}
        />
      );
    }

    if (norm === 'service-personalised-gifting' || norm === 'personalised-gifting') {
      return (
        <ServiceDetailPage
          serviceId="service-personalised-gifting"
          onNavigate={handleNavigate}
        />
      );
    }

    // ── Top Navigation Placeholders ──
    if (norm === 'about') {
      return <PlaceholderPage title="About Us" onNavigate={handleNavigate} />;
    }

    if (norm === 'contact') {
      return <PlaceholderPage title="Contact Us" onNavigate={handleNavigate} />;
    }

    // Fallback to Homepage
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1020] text-slate-100 selection:bg-brand-orange selection:text-white">
      {/* Top Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Global Diwali 2026 Festive Banner Across All Pages */}
      <div className="pt-16 sm:pt-20">
        <DiwaliTopBanner onExploreDiwaliGifts={() => handleNavigate('service-corporate-gifting')} />
      </div>

      {/* Main Page Area */}
      <div className="flex-1 pb-16 md:pb-0">
        {renderCurrentPage()}
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Utilities */}
      <WhatsAppButton />
      <BackToTop />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
