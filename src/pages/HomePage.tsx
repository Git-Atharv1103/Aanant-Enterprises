import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { HorizontalProductMarquee } from '../components/HorizontalProductMarquee';
import { ServicesSection } from '../components/ServicesSection';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { InstagramReelsSection } from '../components/InstagramReelsSection';
import { ClienteleSection } from '../components/ClienteleSection';
import { ContactSection } from '../components/ContactSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="bg-transparent text-slate-100 overflow-hidden" role="main">

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

      {/* ── 8. Trusted By Our Clientele (Unified Logo + Client Name in Same Card) ── */}
      <ClienteleSection />

      {/* ── 9. Contact Section with Fast Quotation Desk ── */}
      <ContactSection />

    </main>
  );
};
