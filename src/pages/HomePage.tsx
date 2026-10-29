import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { InstagramReelsSection } from '../components/InstagramReelsSection';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { ClienteleSection } from '../components/ClienteleSection';
import { ContactSection } from '../components/ContactSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="bg-[#0B1020] text-slate-100 overflow-hidden" role="main">

      {/* ── 1. Homepage Hero Section with Continuous Product Image Slider ── */}
      <HeroSection onNavigate={onNavigate} />

      {/* ── 2. Our Services Section with Four Interactive Service Cards ── */}
      <ServicesSection onNavigate={onNavigate} />

      {/* ── 3. About Aanant Enterprises ── */}
      <AboutSection onNavigate={onNavigate} />

      {/* ── 4. Why Choose Us ── */}
      <WhyChooseUs />

      {/* ── 5. Our Process ── */}
      <ProcessTimeline onNavigate={onNavigate} />

      {/* ── 6. Instagram Reels Showcase ── */}
      <InstagramReelsSection />

      {/* ── 7. Customer Reviews / Testimonials ── */}
      <CustomerReviewsSection />

      {/* ── 8. Clientele Section ── */}
      <ClienteleSection />

      {/* ── 9. Contact Section ── */}
      <ContactSection />

    </main>
  );
};
