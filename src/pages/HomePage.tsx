import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { AboutSection } from '../components/AboutSection';
import { ManufacturingCapabilitiesSection } from '../components/ManufacturingCapabilitiesSection';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { InteractiveCustomStudio } from '../components/InteractiveCustomStudio';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { GallerySection } from '../components/GallerySection';
import { BusinessEnquiryCTA } from '../components/BusinessEnquiryCTA';
import { ContactSection } from '../components/ContactSection';
import { PRODUCTS_CATALOGUE } from '../data/companyData';
import type { ProductItem } from '../types';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectProductForQuote: (product: ProductItem) => void;
  enquirySubject?: string;
  enquiryType?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProductForQuote,
  enquirySubject,
  enquiryType
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const handleRequestQuote = (product: ProductItem) => {
    onSelectProductForQuote(product);
    onNavigate('custom-request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products for homepage gallery
  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS_CATALOGUE.slice(0, 6)
    : PRODUCTS_CATALOGUE.filter((p) => p.category === activeCategory).slice(0, 6);

  const homeCategories = ['All', 'Laser-Cut Designs', 'Decorative Designs', 'CNC-Cut Products'];

  return (
    <main className="bg-[#0B1020] text-slate-100 overflow-hidden">
      {/* ── 1. Realistic Cinematic Hero Section ── */}
      <HeroSection onNavigate={onNavigate} />

      {/* ── 2. SECTION A: DISCOVER OUR CAPABILITIES ── */}
      <ServicesSection onNavigate={onNavigate} />

      {/* ── 3. SECTION B: EXPLORE OUR PRODUCTS (Interactive 3D Cards) ── */}
      <section className="py-24 bg-gradient-to-b from-[#0B1020] via-[#0E1628] to-[#0B1020] border-t border-white/10 relative">
        <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Section B • Explore Our Finished Artifacts</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Featured Custom Products & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-blue-electric">
                  Precision Solutions
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                Hover to explore subtle 3D depth and specular lighting on each genuine manufactured piece. Every unit is fabricated according to client specifications.
              </p>
            </div>

            {/* Category Quick Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {homeCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
                    activeCategory === cat
                      ? 'bg-brand-orange text-white border-transparent shadow-glow-orange/30 font-bold'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}

              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/15"
              >
                <span>Full Catalogue ({PRODUCTS_CATALOGUE.length})</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
              </button>
            </div>
          </div>

          {/* Interactive 3D Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(prod) => setSelectedProduct(prod)}
                onRequestQuote={handleRequestQuote}
              />
            ))}
          </div>

          {/* Gallery Footer strip */}
          <div className="mt-12 p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Real product photos. Multi-angle inspection available in detail modal.</span>
            </span>
            <button
              onClick={() => onNavigate('products')}
              className="text-brand-orange hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
            >
              <span>View All Categories & Filter Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ── 4. SECTION C: CREATE YOUR OWN PRODUCT (Custom Product Studio) ── */}
      <section className="py-24 bg-gradient-to-b from-[#0B1020] via-[#0D1424] to-[#0A0E1A] relative border-t border-white/10">
        <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-orange/10 blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section C • Flagship Conversion Studio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Create Your Own Product
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Follow our 4-step guided engineering configurator. Choose your machining process, describe dimensions, attach CAD drawings, and receive feasibility analysis.
            </p>
          </div>

          {/* Interactive Studio Component */}
          <InteractiveCustomStudio
            onSuccessNavigate={() => onNavigate('products')}
          />
        </div>
      </section>

      {/* ── 5. Manufacturing Capabilities (Subtractive CNC vs Thermal Laser) ── */}
      <ManufacturingCapabilitiesSection onNavigate={onNavigate} />

      {/* ── 6. Process Timeline (Four Step Cycle) ── */}
      <ProcessTimeline onNavigate={onNavigate} />

      {/* ── 7. Why Choose Us (Business Approach & Tolerances) ── */}
      <WhyChooseUs />

      {/* ── 8. About Aanant Enterprises (Split Layout) ── */}
      <AboutSection onNavigate={onNavigate} />

      {/* ── 9. Actual Work Gallery Preview ── */}
      <GallerySection onNavigate={onNavigate} limit={4} />

      {/* ── 10. Commercial Inquiry Command Banner ── */}
      <BusinessEnquiryCTA onNavigate={onNavigate} />

      {/* ── 10. Direct Contact Section ── */}
      <ContactSection
        initialSubject={enquirySubject}
        initialType={enquiryType}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestQuote={handleRequestQuote}
      />
    </main>
  );
};
