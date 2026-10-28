import React, { useState, useEffect } from 'react';
import { X, Wrench, MessageCircle, CheckCircle2, Layers, Cog, Briefcase, ChevronRight, Sparkles, ShieldCheck, Ruler } from 'lucide-react';
import type { ProductItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestCustomisation?: (product: ProductItem) => void;
  onRequestQuote?: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestCustomisation,
  onRequestQuote,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleRequestClick = () => {
    onClose();
    if (onRequestCustomisation) {
      onRequestCustomisation(product);
    } else if (onRequestQuote) {
      onRequestQuote(product);
    }
  };

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hello Aanant Enterprises, I am inquiring about customising "${product.name}" (${product.category}). Material: ${product.material}. Could you share feasibility and quotation?`
    );
    window.open(`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${message}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[#0d1322] text-slate-100 w-full max-w-4xl rounded-3xl shadow-2xl border border-white/15 overflow-hidden my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Top Accent Beam */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-orange to-brand-blue-electric" />

        {/* Top Header Bar */}
        <div className="bg-white/[0.04] px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-brand-orange font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specification Sheet</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/15 h-72 sm:h-80 relative group shadow-inner">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-white text-[11px] font-mono font-medium backdrop-blur-md">
                  {product.category}
                </span>

                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-[11px] font-mono font-semibold backdrop-blur-md">
                  Custom Sized
                </span>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-brand-orange shadow-glow-orange/40 scale-105'
                          : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons Matrix */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleRequestClick}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange hover:shadow-glow-orange/80 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Configure Custom Piece</span>
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Enquiry</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>Fabricated to order with your logo, text, or dimensional drawings.</span>
              </div>
            </div>

            {/* Right Column: Detailed Specifications */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-[11px] font-mono text-brand-orange font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mt-1">
                  {product.name}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {product.fullDescription}
              </p>

              {/* Specifications Matrix */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 space-y-3 font-mono text-xs">
                <div className="flex items-start gap-3">
                  <Cog className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Fabrication Method</span>
                    <span className="text-white font-medium">{product.manufacturingMethod}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-white/5 pt-2.5">
                  <Layers className="w-4 h-4 text-brand-blue-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Substrate / Material</span>
                    <span className="text-white font-medium">{product.material}</span>
                  </div>
                </div>

                {product.dimensions && (
                  <div className="flex items-start gap-3 border-t border-white/5 pt-2.5">
                    <Ruler className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Standard / Max Sizing</span>
                      <span className="text-white font-medium">{product.dimensions}</span>
                    </div>
                  </div>
                )}

                {product.applications && (
                  <div className="flex items-start gap-3 border-t border-white/5 pt-2.5">
                    <Briefcase className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Target Application</span>
                      <span className="text-white font-medium">{product.applications}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Features List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Engineering & Custom Features:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {product.keyFeatures.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue-electric flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation note */}
              <div className="p-3.5 bg-brand-orange/10 border border-brand-orange/20 rounded-xl text-xs text-orange-200 leading-relaxed">
                <strong className="text-white">Direct Production Guarantee:</strong> All items are manufactured in-house. Vector conversions and DXF previews provided before cutting.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
