import React, { useState, useEffect } from 'react';
import { Home, Package, FileText, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'custom-request', label: 'Custom', icon: FileText, highlight: true }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl px-2 py-1.5 flex items-center justify-around safe-area-inset-bottom"
      aria-label="Mobile Navigation Bar"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px] ${
              item.highlight
                ? 'text-brand-orange font-bold'
                : isActive
                ? 'text-brand-navy font-bold'
                : 'text-gray-500 hover:text-brand-navy'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-brand-navy/10' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}

      {/* Call Button */}
      <a
        href={`tel:${COMPANY_INFO.phones[0]}`}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-gray-500 hover:text-brand-navy min-w-[56px]"
        aria-label="Call Aanant Enterprises"
      >
        <div className="p-1 rounded-lg">
          <Phone className="w-5 h-5 text-emerald-600" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5 text-emerald-700 font-semibold">Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=Hello%20Aanant%20Enterprises,%20I%20am%20interested%20in%20your%20laser%20and%20CNC%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-gray-500 hover:text-green-600 min-w-[56px] relative"
        aria-label="Chat on WhatsApp"
      >
        <div className="p-1 rounded-lg">
          <MessageCircle className="w-5 h-5 text-green-500" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5 text-green-600 font-semibold">WhatsApp</span>
        
        {/* Offline indicator badge if disconnected */}
        {!isOnline && (
          <span
            className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500 border border-white"
            title="Offline mode"
          />
        )}
      </a>
    </nav>
  );
};
