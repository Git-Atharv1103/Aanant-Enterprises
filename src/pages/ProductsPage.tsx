import React, { useState, useMemo } from 'react';
import { Search, X, RotateCcw, Wrench, Sparkles, Layers, SlidersHorizontal, ArrowUpRight, Cpu } from 'lucide-react';
import { PRODUCTS_CATALOGUE, PRODUCT_CATEGORIES } from '../data/companyData';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useScrollReveal } from '../utils/useScrollReveal';
import type { ProductItem, ProductCategory } from '../types';

interface ProductsPageProps {
  onNavigate: (page: string) => void;
  onSelectProductForCustomisation?: (product: ProductItem) => void;
  onSelectProductForQuote?: (product: ProductItem) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onNavigate,
  onSelectProductForCustomisation,
  onSelectProductForQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const headerReveal = useScrollReveal<HTMLDivElement>();
  const filterReveal = useScrollReveal<HTMLDivElement>();

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOGUE.filter((product) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.manufacturingMethod.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q) ||
        product.keyFeatures.some((f) => f.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleRequestCustomisation = (product: ProductItem) => {
    if (onSelectProductForCustomisation) {
      onSelectProductForCustomisation(product);
    } else if (onSelectProductForQuote) {
      onSelectProductForQuote(product);
    }
    onNavigate('custom-request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-4 sm:pt-6 pb-12 bg-gradient-to-b from-[#090d16] via-[#0d1322] to-[#070a10] min-h-screen text-slate-100">
      
      {/* Editorial High-Tech Page Header */}
      <div
        ref={headerReveal.ref}
        className={`relative py-8 sm:py-12 border-b border-white/10 overflow-hidden transition-all duration-700 ${
          headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Ambient Glow & Grid Backdrop */}
        <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-brand-orange/20 via-brand-blue/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-orange/30 text-brand-orange text-xs font-mono font-semibold uppercase tracking-widest backdrop-blur-md shadow-glow-orange/20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-orange" />
            <span>Industrial Showcase & Custom Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Engineered Artifacts & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-blue-electric">
              Custom Creations
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Every piece is precision fabricated on demand — from laser-etched metallic identity plates and backlit acrylic displays to high-tolerance CNC-milled functional assemblies.
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{PRODUCTS_CATALOGUE.length} Ready Portfolio Items</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-brand-orange" />
              <span>Laser & CNC Compatible</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-brand-blue-electric" />
              <span>100% Client-Specified Dimensions</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Dynamic Filter Deck */}
        <div
          ref={filterReveal.ref}
          className={`p-5 sm:p-7 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl mb-6 space-y-5 transition-all duration-700 ${
            filterReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Search bar & Reset */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, substrate, manufacturing method, or keyword..."
                className="w-full pl-12 pr-11 py-3.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-slate-400 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/10 hover:bg-white/20 transition-all border border-white/15 whitespace-nowrap self-stretch md:self-auto justify-center hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Category Chips with Live Counters */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5 shrink-0 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-orange" />
                Filter:
              </span>

              {/* "All" button */}
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-xl shrink-0 transition-all duration-200 text-xs font-semibold flex items-center gap-2 border ${
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white border-transparent shadow-glow-orange/30 font-bold'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>All Projects</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    selectedCategory === 'All'
                      ? 'bg-black/30 text-white'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {PRODUCTS_CATALOGUE.length}
                </span>
              </button>

              {/* Dynamic Category Chips */}
              {PRODUCT_CATEGORIES.map((cat) => {
                const count = PRODUCTS_CATALOGUE.filter((p) => p.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl shrink-0 transition-all duration-200 text-xs font-semibold flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white border-transparent shadow-glow-orange/30 font-bold'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isSelected
                          ? 'bg-black/30 text-white'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange inline-block" />
            <span>
              Displaying <strong className="text-white font-bold">{filteredProducts.length}</strong> items
              {selectedCategory !== 'All' ? ` under "${selectedCategory}"` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">
            Tolerances calibrated to ISO / ASTM standards
          </span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(prod) => setSelectedProduct(prod)}
                onRequestCustomisation={handleRequestCustomisation}
              />
            ))}
          </div>
        ) : (
          /* High-Tech Empty State */
          <div className="p-12 sm:p-16 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 text-center max-w-xl mx-auto space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-brand-blue/20 border border-white/15 flex items-center justify-center mx-auto text-brand-orange shadow-glow-orange/20">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                No matching product found
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We manufacture bespoke pieces from scratch. If your exact spec or pattern is not shown here, send us your rough sketch or CAD file directly.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleClearFilters}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-300 bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
              >
                Reset Filters
              </button>
              <button
                onClick={() => onNavigate('custom-request')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Submit Custom CAD / Spec</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Banner: Bespoke Prototyping Callout */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-brand-orange/[0.08] border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-orange/25 transition-all duration-700" />
          
          <div className="space-y-2 text-center lg:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>Rapid Custom Turnaround</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Need a completely one-off dimensional piece?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We translate DXF, DWG, AI, SVG, STEP files, or napkin sketches into precision laser-cut and CNC-profiled end products. Same-day quotation and feasibility review.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigate('custom-request')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange hover:shadow-glow-orange transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-95"
            >
              <Wrench className="w-4 h-4" />
              <span>Configure Custom Piece</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestCustomisation={handleRequestCustomisation}
      />

    </div>
  );
};
