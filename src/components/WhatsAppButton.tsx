import React, { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface WhatsAppButtonProps {
  customMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ customMessage }) => {
  const [expanded, setExpanded] = useState(false);

  const defaultMessage = customMessage ||
    'Hello Aanant Enterprises, I visited your website and would like to discuss a custom product requirement.';
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">

      {/* Tooltip / Quick Actions */}
      {expanded && (
        <div className="flex flex-col gap-2 animate-fade-up">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-white text-brand-deep text-xs font-bold shadow-card border border-gray-200/80 hover:border-brand-orange/30 hover:shadow-card-hover transition-all whitespace-nowrap"
          >
            <span className="w-8 h-8 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0">
              <MessageCircle className="w-4 h-4 fill-current" />
            </span>
            <div>
              <div className="text-brand-deep font-bold text-xs">WhatsApp Enquiry</div>
              <div className="text-brand-muted text-[10px]">{COMPANY_INFO.phones[0]}</div>
            </div>
          </a>

          {/* Phone */}
          <a
            href={`tel:${COMPANY_INFO.phones[0]}`}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-white text-brand-deep text-xs font-bold shadow-card border border-gray-200/80 hover:border-brand-electric/30 hover:shadow-card-hover transition-all whitespace-nowrap"
          >
            <span className="w-8 h-8 rounded-xl bg-brand-electric flex items-center justify-center text-white shrink-0">
              <Phone className="w-4 h-4" />
            </span>
            <div>
              <div className="text-brand-deep font-bold text-xs">Call Directly</div>
              <div className="text-brand-muted text-[10px]">{COMPANY_INFO.phones[0]}</div>
            </div>
          </a>
        </div>
      )}

      {/* Main Float Button */}
      <div className="relative">
        {/* Ping rings */}
        {!expanded && (
          <>
            <span className="absolute -inset-2 rounded-full bg-[#25D366] opacity-20 animate-ping" />
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-15 animate-ping [animation-delay:0.5s]" />
          </>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 ${
            expanded ? 'bg-brand-deep rotate-45' : 'bg-[#25D366] hover:bg-[#20ba59] hover:scale-110'
          }`}
          aria-label={expanded ? 'Close contact options' : 'Open contact options — Chat on WhatsApp (+91 7387417382)'}
          aria-expanded={expanded}
        >
          {expanded
            ? <X className="w-6 h-6" />
            : <MessageCircle className="w-7 h-7 fill-current" />
          }
        </button>
      </div>
    </div>
  );
};
