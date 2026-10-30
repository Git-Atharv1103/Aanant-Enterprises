import manifestJson from './industrialLabellingManifest.json';

export interface IndustrialLabellingCategory {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  folder: string;
  badge: string;
  accentColor: string;
  route: string;
  images: string[];
  features?: string[];
  materials?: string[];
  applications?: string[];
}

// Backward-compatibility alias
export type IndustrialLabellingSubcategory = IndustrialLabellingCategory;
export type IndustrialLabellingMainCard = IndustrialLabellingCategory & {
  subcategories: IndustrialLabellingCategory[];
  allImages: string[];
};

export function getDiscoveredImagesForCategory(folderName: string): string[] {
  const images: string[] = [];

  // Read from generated manifest JSON
  const fromManifest = (manifestJson as Record<string, string[]>)[folderName];
  if (Array.isArray(fromManifest) && fromManifest.length > 0) {
    fromManifest.forEach((img) => {
      const formatted = img.startsWith('/')
        ? img
        : `/images/industrial-labelling/${folderName}/${img}`;
      if (!images.includes(formatted)) {
        images.push(formatted);
      }
    });
  }

  return images;
}

export const INDUSTRIAL_LABELLING_HERO = {
  sectionTitle: 'INDUSTRIAL LABELLING',
  mainHeading: 'Precision Identification. Professional Finish.',
  description:
    'Explore industrial labelling and identification solutions from Aanant Enterprises, designed to present product information, identification details, and professional branding clearly with high-durability finishes.',
  heroImage: '/images/laser-marking-action.jpg',
  supportingImage: '/images/custom-nameplate.jpg',
};

/**
 * EXACTLY 5 PRODUCT CARDS (Per client specification)
 * 1. Aluminium Name Plate
 * 2. Trafolite Plates
 * 3. Sublimation Plates
 * 4. Industrial Sticker
 * 5. Panel Door Lock
 */
export const INDUSTRIAL_LABELLING_CATEGORIES: IndustrialLabellingCategory[] = [
  {
    id: 'aluminium-name-plate',
    slug: 'aluminium-name-plates',
    title: 'Aluminium Name Plate',
    shortDescription:
      'High-precision anodised and laser-etched aluminium nameplates engineered for heavy machinery, panel enclosures, and product branding.',
    description:
      'High-precision anodised and laser-etched aluminium nameplates engineered for heavy machinery, panel enclosures, and product branding. Available in brushed, matte, or gloss finishes with high chemical and UV resistance.',
    folder: 'aluminium-name-plates',
    badge: 'Metallic Branding',
    accentColor: '#3478F6',
    route: '/services/industrial-labelling/aluminium-name-plates',
    images: getDiscoveredImagesForCategory('aluminium-name-plates'),
    features: [
      'Chemical & Solvent Resistant Finish',
      'High-Precision Laser & Chemical Etching',
      'Pre-punched Mounting Holes or 3M VHB Backing',
      'Outdoor Weatherproof Anodised Coating',
    ],
    materials: ['Grade 1050/5052 Aluminium', 'Anodised Aluminium', 'Brushed Finish Silver/Black'],
    applications: ['Electrical Control Panels', 'Heavy Industrial Machinery', 'HVAC Units', 'Serial & Rating Plates'],
  },
  {
    id: 'trafolite-plates',
    slug: 'trafolite-plates',
    title: 'Trafolite Plates',
    shortDescription:
      'Multi-layered phenolic engraved plates designed for electrical switchgear, mimic diagrams, push button tags, and high-visibility danger legends.',
    description:
      'Multi-layered phenolic engraved plates designed for electrical switchgear, mimic diagrams, push button tags, and high-visibility danger legends. Mechanically rotary-engraved to expose contrasting core layers that never fade or wipe off.',
    folder: 'trafolite-plates',
    badge: 'Engraved Phenolic',
    accentColor: '#FF6B00',
    route: '/services/industrial-labelling/trafolite-plates',
    images: (function () {
      const imgs = getDiscoveredImagesForCategory('trafolite-plates');
      return imgs.length > 0 ? imgs : getDiscoveredImagesForCategory('trafolite-labelling');
    })(),
    features: [
      'Dual-Layer Contrasting Core Construction',
      'Flame Retardant & Electrically Non-Conductive',
      'Permanent Mechanical Rotary Engraving',
      'Immune to Oil, Solvents & Cleaning Agents',
    ],
    materials: ['Phenolic Sheet (Trafolite)', '2-Ply Rigid Acrylic Core', 'Heat-Resistant Melamine'],
    applications: ['Control Desk Push Buttons', 'Switchboards & Distribution Boards', 'Substation Panels', 'Safety & Warning Legends'],
  },
  {
    id: 'sublimation-plates',
    slug: 'sublimation-plates',
    title: 'Sublimation Plates',
    shortDescription:
      'Full-colour photographic sublimation plates for bespoke corporate branding, instructional diagrams, technical charts, and prestigious award plaques.',
    description:
      'Full-colour photographic sublimation plates for bespoke corporate branding, instructional diagrams, technical charts, and prestigious award plaques. Polymer-coated metallic plates infused with dyes for vibrant, scratch-resistant graphics.',
    folder: 'sublimation-plates',
    badge: 'Full-Colour Transfer',
    accentColor: '#FFB547',
    route: '/services/industrial-labelling/sublimation-plates',
    images: getDiscoveredImagesForCategory('sublimation-plates'),
    features: [
      'Full Photorealistic CMYK Color Gamut',
      'Scratch & Chip Resistant Sub-Surface Dye',
      'High-Gloss, Satin, or Brushed Metal Sheen',
      'Custom Corporate Logos and Vector Art',
    ],
    materials: ['Coated Aluminium Sheet', 'Sublimation Metal Blanks', 'Brass/Gold & Silver Shimmer Sheet'],
    applications: ['Equipment Branding Badges', 'Instruction & Schematic Diagrams', 'Award & Commendation Plaques', 'Architectural Door Signage'],
  },
  {
    id: 'industrial-sticker',
    slug: 'industrial-stickers',
    title: 'Industrial Sticker',
    shortDescription:
      'Heavy-duty adhesive decals, vinyl labels, barcode overlays, and tamper-evident warning stickers built to endure tough factory floors.',
    description:
      'Heavy-duty adhesive decals, vinyl labels, barcode overlays, and tamper-evident warning stickers built to endure tough factory floors. High-tack adhesives withstand grease, moisture, thermal cycling, and high-pressure washdowns.',
    folder: 'industrial-stickers',
    badge: 'Technical Decals',
    accentColor: '#10B981',
    route: '/services/industrial-labelling/industrial-stickers',
    images: getDiscoveredImagesForCategory('industrial-stickers'),
    features: [
      'High-Tack Industrial Grade Acrylic Adhesive',
      'UV & Weatherproof Polycarbonate/Vinyl Lamination',
      'Tamper-Evident & Destructible Security Options',
      'Precision Die-Cut or Kiss-Cut Sheets/Rolls',
    ],
    materials: ['Polycarbonate (Lexan)', 'Cast Vinyl', 'Polyester (Mylar)', '3M High-Bond Adhesive'],
    applications: ['Warning & Safety Notices', 'Barcode & QR Code Asset Tracking', 'Membrane Keyboard Overlays', 'Machine Enclosure Wraps'],
  },
  {
    id: 'panel-door-lock',
    slug: 'panel-door-locks',
    title: 'Panel Door Lock',
    shortDescription:
      'Robust industrial panel locks, quarter-turn cam latches, wing-handle locks, and key-operated hardware engineered for electrical enclosures.',
    description:
      'Robust industrial panel locks, quarter-turn cam latches, wing-handle locks, and key-operated hardware engineered for electrical enclosures. Precision zinc-die-cast and chrome-plated mechanisms providing IP65 dust and water seal compression.',
    folder: 'panel-door-locks',
    badge: 'Enclosure Hardware',
    accentColor: '#818CF8',
    route: '/services/industrial-labelling/panel-door-locks',
    images: getDiscoveredImagesForCategory('panel-door-locks'),
    features: [
      'Zinc Die-Cast Housing with Chrome / Black Finish',
      'Quarter-Turn Smooth Cam Action Locking',
      'IP65 Sealed Gasket for Enclosure Dustproofing',
      'Universal Triangular, Square, or Key-Operated Inserts',
    ],
    materials: ['Die-Cast Zinc Alloy', 'Stainless Steel Cam Blade', 'EPDM Weather Gasket'],
    applications: ['Control Panel Enclosures', 'Server Racks & IT Cabinets', 'Telecom Field Enclosures', 'Industrial Genset Doors'],
  },
];

/**
 * Backward compatibility: export ALL_SUBCATEGORIES map
 */
export const ALL_SUBCATEGORIES: Record<string, IndustrialLabellingCategory> = {
  'aluminium-name-plates': INDUSTRIAL_LABELLING_CATEGORIES[0],
  'trafolite-plates': INDUSTRIAL_LABELLING_CATEGORIES[1],
  'trafolite-labelling': INDUSTRIAL_LABELLING_CATEGORIES[1],
  'sublimation-plates': INDUSTRIAL_LABELLING_CATEGORIES[2],
  'industrial-stickers': INDUSTRIAL_LABELLING_CATEGORIES[3],
  'panel-door-locks': INDUSTRIAL_LABELLING_CATEGORIES[4],
  'industrial-plates': INDUSTRIAL_LABELLING_CATEGORIES[0], // fallback
};

/**
 * Backward compatibility adapter for INDUSTRIAL_LABELLING_MAIN_CARDS
 */
export const INDUSTRIAL_LABELLING_MAIN_CARDS = INDUSTRIAL_LABELLING_CATEGORIES.map((cat) => ({
  ...cat,
  subcategories: [cat],
  allImages: cat.images,
}));

export function getIndustrialCategoryBySlug(slug: string): IndustrialLabellingCategory | undefined {
  const clean = slug
    .replace(/^services\/industrial-labelling\//, '')
    .replace(/^industrial-labelling\//, '')
    .replace(/^\/+|\/+$/g, '');

  return (
    INDUSTRIAL_LABELLING_CATEGORIES.find((c) => c.slug === clean) ||
    ALL_SUBCATEGORIES[clean]
  );
}

export function getIndustrialMainCardBySlug(slugOrRoute: string): any {
  return getIndustrialCategoryBySlug(slugOrRoute);
}

export function getIndustrialSubcategoryBySlug(slug: string): IndustrialLabellingCategory | undefined {
  return getIndustrialCategoryBySlug(slug);
}
