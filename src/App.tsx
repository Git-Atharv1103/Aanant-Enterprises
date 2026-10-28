import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackToTop } from './components/BackToTop';
import { StatusIndicator } from './components/StatusIndicator';
import { NetworkStatusBanner } from './components/NetworkStatusBanner';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { CustomProductPage } from './pages/CustomProductPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import type { ProductItem } from './types';

export function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
    const validPages = [
      'home',
      'about',
      'services',
      'products',
      'capabilities',
      'gallery',
      'custom-request',
      'quote',
      'contact',
      'privacy',
      'terms'
    ];
    if (!hash || hash === '') return 'home';
    if (validPages.includes(hash)) return hash;
    return '404';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<ProductItem | null>(null);

  // Sync with browser hash and forward/back navigation
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductForQuote = (product: ProductItem) => {
    setSelectedProductForQuote(product);
    handleNavigate('custom-request');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProductForQuote={handleSelectProductForQuote}
          />
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'services':
        return (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectServiceForEnquiry={() => handleNavigate('custom-request')}
          />
        );
      case 'products':
        return (
          <ProductsPage
            onNavigate={handleNavigate}
            onSelectProductForQuote={handleSelectProductForQuote}
          />
        );
      case 'capabilities':
        return <CapabilitiesPage onNavigate={handleNavigate} />;
      case 'gallery':
        return <GalleryPage onNavigate={handleNavigate} />;
      case 'custom-request':
        return <CustomProductPage initialProduct={selectedProductForQuote} />;
      case 'quote':
        return <CustomProductPage initialProduct={selectedProductForQuote} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1020] text-slate-100 selection:bg-brand-orange selection:text-white">
      {/* Network Online/Offline Status Banner */}
      <NetworkStatusBanner />

      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 pb-16 md:pb-0">
        {renderCurrentPage()}
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Utilities */}
      <WhatsAppButton />
      <BackToTop />
      <StatusIndicator />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
