import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { HorizontalProductMarquee } from '../components/HorizontalProductMarquee';
import { ServicesSection } from '../components/ServicesSection';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { InstagramReelsSection } from '../components/InstagramReelsSection';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { ClienteleSection } from '../components/ClienteleSection';
import { ContactSection } from '../components/ContactSection';
import { DiwaliTopBanner } from '../components/DiwaliFestiveDecor';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleExploreDiwaliGifts = () => {
    onNavigate('service-corporate-gifting');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-[#0B1020] text-slate-100 overflow-hidden" role="main">

      {/* ── 0. Diwali Festive 2026 Announcement Banner ── */}
      <DiwaliTopBanner onExploreDiwaliGifts={handleExploreDiwaliGifts} />

      {/* ── 1. Homepage Hero Section with Dual Counter-Sliding Vertical Product Columns ── */}
      <HeroSection onNavigate={onNavigate} />

      {/* ── 2. Continuous Horizontal Product Showcase Marquee (Zero Jump, Infinite Loop) ── */}
      <HorizontalProductMarquee onNavigate={onNavigate} />

      {/* ── 3. Our Services Section with Four Aligned Interactive Service Cards ── */}
      <ServicesSection onNavigate={onNavigate} />

      {/* ── 4. About Aanant Enterprises ── */}
      <AboutSection onNavigate={onNavigate} />

      {/* ── 5. Why Choose Us ── */}
      <WhyChooseUs />

      {/* ── 6. Our 8-Step Process ── */}
      <ProcessTimeline onNavigate={onNavigate} />

      {/* ── 7. Instagram Live Reels Showcase (9:16 Portrait Cards with Workshop Footage) ── */}
      <InstagramReelsSection />

      {/* ── 8. Customer Reviews / Verified Client Feedback ── */}
      <CustomerReviewsSection />

      {/* ── 9. Trusted By Our Clientele (Unified Logo + Client Name in Same Card) ── */}
      <ClienteleSection />

      {/* ── 10. Contact Section with Fast Quotation Desk ── */}
      <ContactSection />

    </main>
  );
};
