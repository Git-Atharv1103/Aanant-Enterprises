/**
 * Instagram Reels configuration for Aanant Enterprises.
 *
 * Each card features a 9:16 vertical video preview from actual workshop footage,
 * with poster fallback and direct links to the official Instagram profile @aanantenterprises03.
 */

export interface InstagramReel {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  instagramUrl: string;
  views?: string;
  tags?: string[];
}

export const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: 'reel-1',
    title: 'Trafolite Laser Engraving in Action',
    description: 'Precision mechanical & laser rotary engraving on multi-layer switchgear tags.',
    videoSrc: '/videos/reel-1.mp4',
    posterSrc: '/images/reels/reel-1.jpg',
    instagramUrl: 'https://www.instagram.com/aanantenterprises03/',
    views: '2.4K',
    tags: ['#LaserMarking', '#Trafolite', '#PuneIndustry'],
  },
  {
    id: 'reel-2',
    title: 'Control Panel Legend Plate Production',
    description: 'Sharp contrasting high-visibility legends for distribution boards and panels.',
    videoSrc: '/videos/reel-2.mp4',
    posterSrc: '/images/reels/reel-2.jpg',
    instagramUrl: 'https://www.instagram.com/aanantenterprises03/',
    views: '1.9K',
    tags: ['#PanelHardware', '#IndustrialLabelling'],
  },
  {
    id: 'reel-3',
    title: 'Precision Dual-Core Tag Finishing',
    description: 'Flame-retardant non-conductive electrical panel tags crafted to perfection.',
    videoSrc: '/videos/reel-3.mp4',
    posterSrc: '/images/reels/reel-3.jpg',
    instagramUrl: 'https://www.instagram.com/aanantenterprises03/',
    views: '3.1K',
    tags: ['#ElectricalEngineering', '#AanantEnterprises'],
  },
  {
    id: 'reel-4',
    title: 'Industrial Sticker & Decal Inspection',
    description: 'Tough high-tack adhesive decals withstanding harsh factory environments.',
    videoSrc: '/videos/reel-4.mp4',
    posterSrc: '/images/reels/reel-4.jpg',
    instagramUrl: 'https://www.instagram.com/aanantenterprises03/',
    views: '2.8K',
    tags: ['#IndustrialStickers', '#BrandIdentity'],
  },
];
