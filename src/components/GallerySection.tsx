import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS, PRODUCT_CATEGORIES } from '../data/companyData';
import type { GalleryCategory, GalleryItem } from '../types';

interface GallerySectionProps {
  onNavigate?: (page: string) => void;
  showTitle?: boolean;
  limit?: number;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  showTitle = true,
  limit
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const categories: GalleryCategory[] = ['All', ...PRODUCT_CATEGORIES];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const openLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev! > 0 ? prev! - 1 : displayItems.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev! < displayItems.length - 1 ? prev! + 1 : 0));
    }
  };

  const currentItem: GalleryItem | null =
    selectedItemIndex !== null && displayItems[selectedItemIndex]
      ? displayItems[selectedItemIndex]
      : null;

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-gradient-to-b from-[#0B1020] via-[#0E1628] to-[#0B1020] text-slate-100 border-y border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 industrial-grid-dark opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        {showTitle && (
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Production Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Custom Creations & Finished Articles
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Explore actual high-resolution photographs of laser engraved nameplates, architectural decorative screens, corporate gifts, and CNC cut components.
            </p>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedItemIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white font-bold border-transparent shadow-glow-orange/30'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 shadow-2xl hover:border-brand-orange/50 group cursor-pointer transition-all duration-300 flex flex-col hover:-translate-y-1.5"
            >
              {/* Image Container with Zoom Overlay */}
              <div className="relative h-56 sm:h-60 overflow-hidden bg-black/60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                
                {/* Method Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-sm border border-white/15">
                    {item.manufacturingMethod}
                  </span>
                </div>

                {/* Laser Sweep beam on hover */}
                <div className="laser-sweep opacity-0 group-hover:opacity-75 transition-opacity pointer-events-none" />

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform scale-75 group-hover:scale-100 transition-transform shadow-xl">
                    <ZoomIn className="w-5 h-5 text-brand-orange" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1 leading-snug group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayItems.length === 0 && (
          <div className="text-center py-12 rounded-3xl bg-white/[0.03] border border-white/10">
            <p className="text-sm text-slate-300">No products found in this category.</p>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-brand-orange transition-colors z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-brand-orange transition-colors z-20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content Card */}
          <div
            className="relative max-w-4xl w-full bg-[#0D1322] rounded-3xl overflow-hidden border border-white/20 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[55vh] sm:h-[65vh] bg-black/80 flex items-center justify-center p-4">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-full max-w-full object-contain rounded-xl"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/80 text-white text-xs font-mono font-bold border border-white/15">
                {currentItem.manufacturingMethod}
              </span>
            </div>

            <div className="p-5 sm:p-6 bg-white/[0.04] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <span className="text-xs uppercase tracking-wider text-brand-orange font-bold font-mono">
                  {currentItem.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{currentItem.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light">{currentItem.description}</p>
              </div>
              <div className="text-xs text-slate-400 font-mono whitespace-nowrap self-end sm:self-center">
                Photo {selectedItemIndex! + 1} of {displayItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
