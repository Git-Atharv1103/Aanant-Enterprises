import React from 'react';
import { Home, Layers, Info, PhoneCall } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
}) => {
  const handleServicesClick = () => {
    if (currentPage === 'home') {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => {
        onNavigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'services',
      label: 'Services',
      icon: Layers,
      action: handleServicesClick,
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      action: () => {
        onNavigate('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: PhoneCall,
      action: () => {
        onNavigate('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1020]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.6)] px-3 py-2 flex items-center justify-around safe-bottom"
      aria-label="Mobile Navigation Bar"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-brand-orange bg-brand-orange/15 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-mono tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
