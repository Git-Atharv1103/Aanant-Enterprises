import React from 'react';
import { X, Check, ArrowRight, Info, Package, Wrench, Briefcase, Truck, Settings, ShieldCheck } from 'lucide-react';
import type { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  item: ServiceItem | null;
  onClose: () => void;
  onEnquire: (item: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  item,
  onClose,
  onEnquire
}) => {
  if (!item) return null;

  const renderIcon = () => {
    switch (item.iconName) {
      case 'Package': return <Package className="w-8 h-8 text-brand-orange" />;
      case 'Wrench': return <Wrench className="w-8 h-8 text-brand-orange" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-brand-orange" />;
      case 'Truck': return <Truck className="w-8 h-8 text-brand-orange" />;
      case 'Settings': return <Settings className="w-8 h-8 text-brand-orange" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-brand-orange" />;
      default: return <Package className="w-8 h-8 text-brand-orange" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-200">
              {renderIcon()}
            </div>
            <div>
              <span className="text-xs font-bold text-brand-orange tracking-wider uppercase">
                {item.category}
              </span>
              <h3 id="modal-title" className="text-xl font-bold text-brand-navy">
                {item.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors focus:outline-none"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {item.isPlaceholder && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
              <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <strong>Editable Catalog Placeholder:</strong> This section is pre-structured to display Aanant Enterprises' verified product line or specialized services as soon as confirmed details and specifications are supplied.
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-brand-text text-sm leading-relaxed">
              {item.fullDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-3">
              Standard Service & Quality Parameters
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(item.features || []).map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-brand-text bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onEnquire(item);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-button transition-colors"
          >
            <span>Enquire About This Solution</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
