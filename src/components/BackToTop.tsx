import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white text-brand-navy shadow-lg border border-gray-200/80 hover:bg-brand-navy hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
