import React, { useRef, useState } from 'react';
import { Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';

export interface VerifiedClient {
  name: string;
  slug: string;
  category: string;
  logo: string;
  badgeColor?: string;
}

export const VERIFIED_CLIENTS: VerifiedClient[] = [
  { name: 'Tata', slug: 'tata', category: 'Conglomerate & Automotive', logo: '/images/clients/tata.png', badgeColor: '#3478F6' },
  { name: 'Bajaj Finance', slug: 'bajaj-finance', category: 'Banking & Financial', logo: '/images/clients/bajaj-finance.png', badgeColor: '#3478F6' },
  { name: 'Stanley Fastening', slug: 'stanley', category: 'Engineered Fasteners', logo: '/images/clients/stanley.png', badgeColor: '#EAB308' },
  { name: 'Persistent Systems', slug: 'persistent', category: 'IT & Digital Engineering', logo: '/images/clients/persistent.png', badgeColor: '#FF6B00' },
  { name: 'Cognex', slug: 'cognex', category: 'Machine Vision Systems', logo: '/images/clients/cognex.png', badgeColor: '#EAB308' },
  { name: 'Swasthey Pharma', slug: 'swasthey-pharma', category: 'Healthcare & Pharma', logo: '/images/clients/swasthey-pharma.png', badgeColor: '#10B981' },
  { name: 'Bridgestone', slug: 'bridgestone', category: 'Automotive & Tyres', logo: '/images/clients/bridgestone.png', badgeColor: '#EF4444' },
  { name: 'Brembo', slug: 'brembo', category: 'High-Performance Braking', logo: '/images/clients/brembo.png', badgeColor: '#EF4444' },
  { name: 'Lear Corporation', slug: 'lear', category: 'Automotive Systems', logo: '/images/clients/lear.png', badgeColor: '#EF4444' },
  { name: 'Atlas Copco Group', slug: 'atlas-copco', category: 'Industrial Equipment', logo: '/images/clients/atlas-copco.png', badgeColor: '#00E5FF' },
  { name: 'Bajaj Broking', slug: 'bajaj-broking', category: 'Financial Securities', logo: '/images/clients/bajaj-broking.png', badgeColor: '#3478F6' },
  { name: 'Kirloskar', slug: 'kirloskar', category: 'Heavy Engineering', logo: '/images/clients/kirloskar.png', badgeColor: '#10B981' },
  { name: 'B.G. Shirke', slug: 'shirke', category: 'Construction & Civil', logo: '/images/clients/shirke.png', badgeColor: '#EF4444' },
  { name: 'ARaymond', slug: 'araymond', category: 'Fastening Solutions', logo: '/images/clients/araymond.png', badgeColor: '#3478F6' },
  { name: 'Universal', slug: 'universal', category: 'Industrial Solutions', logo: '/images/clients/universal.png', badgeColor: '#00E5FF' },
  { name: 'Edgemate', slug: 'edgemate', category: 'Powering Edge Tech', logo: '/images/clients/edgemate.png', badgeColor: '#10B981' },
  { name: 'Micro Lifts', slug: 'micro-lifts', category: 'Elevators & Engineering', logo: '/images/clients/micro-lifts.png', badgeColor: '#EF4444' },
  { name: 'Edifice', slug: 'edifice', category: 'Design & Construction', logo: '/images/clients/edifice.png', badgeColor: '#38BDF8' },
  { name: 'Samarth Glotech', slug: 'samarth-glotech', category: 'Automation Pvt. Ltd.', logo: '/images/clients/samarth-glotech.png', badgeColor: '#FF6B00' },
  { name: 'Ascend', slug: 'ascend', category: 'Corporate Enterprise', logo: '/images/clients/ascend.png', badgeColor: '#818CF8' },
  { name: 'Kidzee', slug: 'kidzee', category: 'Education & Learning', logo: '/images/clients/kidzee.png', badgeColor: '#A855F7' },
  { name: 'Yojak', slug: 'yojak', category: 'Social Action & Knowledge', logo: '/images/clients/yojak.png', badgeColor: '#F43F5E' },
  { name: 'Sahyadri Infra', slug: 'sahyadri-infrastructure', category: 'Civil & Real Estate', logo: '/images/clients/sahyadri-infrastructure.png', badgeColor: '#38BDF8' },
  { name: 'Manbhari Sadi', slug: 'manbhari-sadi', category: 'Retail & Fashion', logo: '/images/clients/manbhari-sadi.png', badgeColor: '#EC4899' },
  { name: 'Daily Greens', slug: 'daily-greens', category: 'Organic & Food Retail', logo: '/images/clients/daily-greens.png', badgeColor: '#10B981' },
  { name: 'SS Electricals', slug: 'ss-electricals', category: 'Industrial Electricals', logo: '/images/clients/ss-electricals.png', badgeColor: '#EAB308' },
  { name: 'Shree Swami Samarth', slug: 'shree-swami-samarth', category: 'Foundation & Trust', logo: '/images/clients/shree-swami-samarth.png', badgeColor: '#F59E0B' },
];

export const ClienteleSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Clientele' },
    { id: 'automotive', label: 'Automotive & Conglomerates' },
    { id: 'engineering', label: 'Industrial & Engineering' },
    { id: 'financial', label: 'Finance & Corporate' },
  ];

  const filteredClients = VERIFIED_CLIENTS.filter((client) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'automotive') {
      return (
        client.category.includes('Automotive') ||
        client.category.includes('Conglomerate') ||
        client.category.includes('Braking')
      );
    }
    if (activeFilter === 'engineering') {
      return (
        client.category.includes('Engineering') ||
        client.category.includes('Industrial') ||
        client.category.includes('Fasten') ||
        client.category.includes('Automation') ||
        client.category.includes('Construction')
      );
    }
    if (activeFilter === 'financial') {
      return (
        client.category.includes('Financial') ||
        client.category.includes('Banking') ||
        client.category.includes('Corporate') ||
        client.category.includes('IT')
      );
    }
    return true;
  });

  return (
    <section
      ref={sectionRef}
      id="clientele"
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#090D18] via-[#0E1628] to-[#090D18] text-slate-100 border-t border-white/10"
      aria-label="Trusted By Our Clientele"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Diwali lights ambient aura */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Trusted By Our Clientele</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Brands That Count On{' '}
            <span className="bg-gradient-to-r from-brand-orange via-amber-300 to-brand-electric bg-clip-text text-transparent">
              Aanant Enterprises
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            From India's leading automotive giants and industrial engineering firms to renowned healthcare and educational networks,
            we take pride in delivering precision laser branding, corporate gifting, and identification plates.
          </p>

          {/* Interactive Filter Pills */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                  activeFilter === cat.id
                    ? 'bg-brand-orange text-white shadow-glow-orange font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── UNIFIED CLIENT CARDS GRID (Logo + Name inside the EXACT same card) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 reveal">
          {filteredClients.map((client) => (
            <div
              key={client.slug}
              className="group relative rounded-2xl p-3 sm:p-4 bg-[#0E1628]/90 border border-white/10 hover:border-brand-orange/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer h-40 select-none"
              style={{
                perspective: '800px',
              }}
            >
              {/* Card Ambient Glow on Hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 20%, rgba(255, 107, 0, 0.12) 0%, transparent 70%)',
                }}
              />

              {/* 1. CLIENT LOGO (Top/Center with clean pedestal and object-fit: contain) */}
              <div className="relative w-full h-20 rounded-xl bg-white/95 p-2.5 flex items-center justify-center shadow-inner border border-white/20 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                <img
                  src={client.logo}
                  alt={`${client.name} official logo`}
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to text initials if image fails
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* 2. CLIENT NAME (Directly below logo with category tag) */}
              <div className="relative z-10 w-full pt-2 flex flex-col items-center justify-center">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 transition-colors truncate w-full">
                  {client.name}
                </h4>
                <p className="text-[10px] font-mono text-slate-400 truncate w-full mt-0.5">
                  {client.category}
                </p>
              </div>

              {/* Bottom Subtle Accent Indicator */}
              <div
                className="absolute bottom-0 inset-x-4 h-0.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundColor: client.badgeColor || '#FF6B00',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Client Quality & Partnership Statistics Banner ── */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Pune Manufacturing & Precision Workshop</div>
              <p className="text-slate-400 font-light text-xs">
                Verified client roster featured from the official Aanant Corporate Profile.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>27+ Enterprise Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-electric" />
              <span>CO2 & Fiber Laser Precision</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Pan-India Delivery</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
