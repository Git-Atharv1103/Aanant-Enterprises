export interface CorporateGiftingAssetConfig {
  folder: string;
  recommendedDimensions: string;
  format: string;
  notes: string;
}

export interface CorporateGiftingCategory {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  badge: string;
  accentColor: string;
  route: string;
  openingAnimationType:
    | 'pen-rotate'
    | 'bag-expand'
    | 'diary-reveal'
    | 'bottle-3d'
    | 'combo-unboxing'
    | 'accessories-lift'
    | 'giftbox-open'
    | 'laser-shimmer';
  primaryImage: string;
  images: string[];
  features: string[];
  customizationOptions: string[];
  applications: string[];
  assetConfig: CorporateGiftingAssetConfig;
}

export const CORPORATE_GIFTING_HERO = {
  sectionTitle: 'CORPORATE GIFTING SUITE',
  mainHeading: 'Thoughtful Gifts. Lasting Brand Impressions.',
  description:
    'Explore Aanant Enterprises’ curated collection of corporate gifts, executive stationery, bespoke gift hampers, and laser-engraved merchandise crafted in Pune for celebrations, employee onboarding, and festive corporate recognition.',
  festiveTagline: 'Diwali 2026 Executive Corporate Gifting Collection',
};

export const CORPORATE_GIFTING_CATEGORIES: CorporateGiftingCategory[] = [
  {
    id: 'corporate-pens',
    slug: 'pens',
    title: 'Corporate Pens & Pen Sets',
    shortDescription:
      'Executive metal pens, rollerballs, and bespoke pen gift sets personalized with fiber laser engraving of your company logo and recipient name.',
    description:
      'High-grade brass and aircraft-grade aluminum writing instruments featuring smooth German ink refills, weighted executive balance, and precision fiber laser etching. Available as single presentation pieces or paired rollerball-and-ballpoint gift sets in plush velvet-lined cases.',
    badge: 'Fiber Laser Engraved',
    accentColor: '#FFB547',
    route: 'services/corporate-gifting/pens',
    openingAnimationType: 'pen-rotate',
    primaryImage: '/images/corporate-gifting/pens/corporate-metal-pen-set.svg',
    images: ['/images/corporate-gifting/pens/corporate-metal-pen-set.svg'],
    features: [
      'High-precision fiber laser marking for corporate logos & individual names',
      'Solid metal construction with matte black, brushed chrome, or gold trims',
      'German ceramic rollerball & smooth-flow ballpoint refills',
      'Custom branded gift presentation box with magnetic clasp',
    ],
    customizationOptions: [
      'Fiber Laser Monogram & Logo Engraving',
      'Individual Employee Name Personalisation',
      'Screen Printed or Foil-Stamped Presentation Boxes',
    ],
    applications: [
      'Executive client meetings & contract signings',
      'Employee onboarding welcome kits',
      'Diwali corporate festive hampers',
      'Annual corporate milestone awards',
    ],
    assetConfig: {
      folder: '/images/corporate-gifting/pens/',
      recommendedDimensions: '600x600 px (isolated product on transparent or dark background)',
      format: 'PNG, WEBP, or SVG',
      notes: 'Drop additional pen set photography directly into public/images/corporate-gifting/pens/',
    },
  },
  {
    id: 'corporate-bags',
    slug: 'bags',
    title: 'Corporate Bags & Laptop Bags',
    shortDescription:
      'Premium water-resistant laptop backpacks, executive messenger bags, and duffle bags branded with custom metal plates or precision embroidery.',
    description:
      'Ergonomically engineered laptop backpacks, sleek messenger sleeves, and travel bags tailored for modern corporate professionals. Designed with reinforced stitching, padded laptop compartments up to 16", water-repellent fabrics, and custom metal laser-engraved brand badges.',
    badge: 'Executive Utility',
    accentColor: '#3478F6',
    route: 'services/corporate-gifting/bags',
    openingAnimationType: 'bag-expand',
    primaryImage: '/images/corporate-gifting/bags/executive-laptop-backpack.svg',
    images: ['/images/corporate-gifting/bags/executive-laptop-backpack.svg'],
    features: [
      'Dedicated padded shock-absorbing laptop compartment (up to 16 inches)',
      'High-density water-resistant ballistic nylon and vegan leather accents',
      'Custom laser-etched metal badge or debossed leatherette patch',
      'Ergonomic breathable mesh back padding and luggage trolley strap',
    ],
    customizationOptions: [
      'Laser-Etched Metallic Brand Emblem',
      'Embossed Vegan Leather Patches',
      'Custom Zipper Pullers & Lining Fabric Branding',
    ],
    applications: [
      'Tech company employee onboarding kits',
      'Corporate conferences & annual summits',
      'Sales team field equipment & business travel',
      'High-tier executive corporate incentives',
    ],
    assetConfig: {
      folder: '/images/corporate-gifting/bags/',
      recommendedDimensions: '600x600 px or 800x800 px',
      format: 'PNG, JPG, or WEBP',
      notes: 'Drop additional backpack, messenger bag, or sleeve images into public/images/corporate-gifting/bags/',
    },
  },
  {
    id: 'diaries-notebooks',
    slug: 'diaries',
    title: 'Diaries & Notebooks',
    shortDescription:
      'Handcrafted executive planners, hardbound leatherette journals, and customized date planners with debossed foil branding and pen loops.',
    description:
      'Our signature collection of corporate executive diaries and planners featuring premium natural shade 80-100 GSM paper, gold and silver foil stamping, magnetic flap closures, and ribbon bookmarks. Verified catalogue items include ChessCrest series, Office Planners, and Notebook Diaries.',
    badge: 'Verified Catalogue',
    accentColor: '#FF6B00',
    route: 'services/corporate-gifting/diaries',
    openingAnimationType: 'diary-reveal',
    primaryImage: '/images/corporate-gifting/diaries/planner-diary-h3309.jpg',
    images: [
      '/images/corporate-gifting/diaries/planner-diary-h3309.jpg',
      '/images/corporate-gifting/diaries/chesscrest-diary-h3310.jpg',
      '/images/corporate-gifting/diaries/office-planner-h1048.jpg',
      '/images/corporate-gifting/diaries/notebook-diary-h3302.jpg',
      '/images/corporate-gifting/diaries/office-planner-h1072.jpg',
    ],
    features: [
      'Genuine Aanant Enterprises catalogue models (H3309, H3310, H1048, H3302, H1072)',
      'Thermo PU leatherette covers with blind debossing or gold foil stamping',
      'Smooth writing 80-100 GSM ivory pages with calendar and planner layouts',
      'Elastic pen holder loop, satin ribbon marker, and magnetic buckle straps',
    ],
    customizationOptions: [
      'Blind Debossing & Hot Foil Stamping (Gold / Silver / Rose Gold)',
      'Full Color UV Printed Covers',
      'Custom Tip-in Insert Pages for Company Profiles & Calendars',
    ],
    applications: [
      'New Year & Diwali annual corporate gifting distributions',
      'Executive desk stationery & conference note-taking',
      'Board meeting gift kits & client appreciation hampers',
    ],
    assetConfig: {
      folder: '/images/corporate-gifting/diaries/',
      recommendedDimensions: '400x500 px or 600x600 px',
      format: 'JPG or PNG',
      notes: 'Contains 5 verified authentic Aanant Enterprises product photos',
    },
  },
  {
    id: 'corporate-bottles',
    slug: 'bottles',
    title: 'Corporate Bottles & Drinkware',
    shortDescription:
      'Smart temperature-display vacuum flasks, stainless steel hydro bottles, and insulated coffee mugs with permanent laser-etched corporate logos.',
    description:
      'Sleek double-walled vacuum-insulated drinkware crafted from 304 food-grade stainless steel. Retains hot beverages for 12 hours and cold drinks for 24 hours. Finished in matte powder coating with crisp fiber laser-marked branding that never fades or peels.',
    badge: 'Laser Marked Steel',
    accentColor: '#00E5FF',
    route: 'services/corporate-gifting/bottles',
    openingAnimationType: 'bottle-3d',
    primaryImage: '/images/corporate-gifting/bottles/vacuum-insulated-thermos-flask.svg',
    images: ['/images/corporate-gifting/bottles/vacuum-insulated-thermos-flask.svg'],
    features: [
      'Food-grade SUS 304 stainless steel with double-wall vacuum insulation',
      'Touch LED real-time temperature display lid options available',
      'Scratch-resistant matte black, navy blue, and brushed metallic powder coatings',
      'Permanent fiber laser branding for logos, slogans, and names',
    ],
    customizationOptions: [
      '360° Rotary Fiber Laser Engraving',
      'Personalised Individual Name Marking',
      'Screen Printing & UV Color Imprint',
    ],
    applications: [
      'Corporate wellness & sustainability initiatives',
      'Eco-friendly employee welcome kit bundles',
      'Outdoor corporate offsite & sports events',
      'Festive client gift packages',
    ],
    assetConfig: {
      folder: '/images/corporate-gifting/bottles/',
      recommendedDimensions: '600x600 px (isolated bottle on transparent or dark background)',
      format: 'PNG, SVG, or WEBP',
      notes: 'Drop additional flask, coffee mug, and sipper photography into public/images/corporate-gifting/bottles/',
    },
  },
  {
    id: 'gift-combos',
    slug: 'gift-combos',
    title: 'Corporate Gift Combos',
    shortDescription:
      'Curated 3-in-1 and 4-in-1 executive gift sets combining diaries, vacuum flasks, metal pens, and keychains in coordinated gift packaging.',
    description:
      'Complete multi-piece executive gift hampers thoughtfully assembled for maximum impact. Each set harmonizes premium faux-leather diaries, vacuum-insulated temperature flasks, heavy metal pens, and metallic keychains inside a custom foam-cut presentation hamper.',
    badge: 'Best Seller',
    accentColor: '#FF6B00',
    route: 'services/corporate-gifting/gift-combos',
    openingAnimationType: 'combo-unboxing',
    primaryImage: '/images/corporate-gifting/gift-combos/executive-gift-combo-set.jpg',
    images: [
      '/images/corporate-gifting/gift-combos/executive-gift-combo-set.jpg',
      '/images/corporate-gifting/gift-combos/premium-executive-suite.jpg',
    ],
    features: [
      'Curated combinations: Diary + Flask + Pen + Keychain',
      'Uniform color-matched corporate styling (Matte Black, Navy Blue, Golden Tan)',
      'Die-cut high-density EVA foam inserts holding every item securely',
      'Unified brand engraving across all items in the hamper',
    ],
    customizationOptions: [
      'Coordinated Multi-Product Laser Branding',
      'Custom Hamper Box Lid Printing & Hot Foil Stamping',
      'Personalized Greeting Cards & Festival Sleeves',
    ],
    applications: [
      'Diwali corporate festive gifting for clients & staff',
      'Senior executive & VIP welcome packages',
      'Channel partner appreciation & dealer meets',
    ],
    assetConfig: {
      folder: '/images/corporate-gifting/gift-combos/',
      recommendedDimensions: '600x600 px or 800x800 px',
      format: 'JPG, PNG, or WEBP',
      notes: 'Contains Aanant Enterprises official corporate gifting flyer and curated showcase photo',
    },
  },
  {
    id: 'office-accessories',
    slug: 'office-accessories',
    title: 'Customised Office Accessories',
    shortDescription:
      'Leatherette desk organizers, visiting card cases, metallic mobile stands, mousepads, and desktop stationery tailored with brand identity.',
    description:
      'Refined desktop essentials that organize workspaces while reinforcing brand presence daily. Featuring stitched vegan leather pen stands, weighted aluminum mobile holders, magnetic business card cases, and precision-cut coasters finished with subtle debossing or laser etching.',
    badge: 'Desktop Essentials',
    accentColor: '#10B981',
    route: 'services/corporate-gifting/office-accessories',
    openingAnimationType: 'accessories-lift',
    primaryImage: '/images/corporate-gifting/office-accessories/executive-desk-organizer-set.svg',
    images: ['/images/corporate-gifting/office-accessories/executive-desk-organizer-set.svg'],
    features: [
      'Weighted non-slip desktop organizers with multi-compartment layouts',
      'Brushed stainless steel & stitched faux leather construction',
      'Integrated charging cable pass-throughs on phone/tablet stands',
      'Subtle corporate laser marking on high-visibility metallic surfaces',
    ],
    customizationOptions: [
      'Precision Laser Etching on Metallic Accents',
      'Blind Debossing on Vegan Leatherette Mats',
      'Custom Shape Acrylic & Wooden Desktop Ornaments',
    ],
    applications: [
      'Executive desk styling and corporate workstation kits',
      'Conference speaker mementos & seminar gifts',
      'Trade show giveaways and business development calls',
    ],
    assetConfig: {
      folder: '/images/corporate-gifting/office-accessories/',
      recommendedDimensions: '600x600 px',
      format: 'PNG, SVG, or WEBP',
      notes: 'Drop additional card holder, coaster, and desk mat photos into public/images/corporate-gifting/office-accessories/',
    },
  },
  {
    id: 'gift-boxes',
    slug: 'gift-boxes',
    title: 'Corporate Gift Boxes',
    shortDescription:
      'Rigid luxury magnetic gift packaging, custom laser-cut wooden boxes, and festive presentation hampers tailored to your corporate dimensions.',
    description:
      'Elevate the unboxing experience with bespoke rigid presentation boxes. Engineered with magnetic closures, satin pull-ribbons, precision laser-cut EVA foam cavities, or bespoke laser-engraved wooden memento boxes crafted directly in our Pune workshop.',
    badge: 'Luxury Packaging',
    accentColor: '#818CF8',
    route: 'services/corporate-gifting/gift-boxes',
    openingAnimationType: 'giftbox-open',
    primaryImage: '/images/corporate-gifting/gift-boxes/luxury-presentation-box.jpg',
    images: [
      '/images/corporate-gifting/gift-boxes/luxury-presentation-box.jpg',
      '/images/corporate-gifting/gift-boxes/custom-wooden-gift-box.jpg',
    ],
    features: [
      'Heavy-duty 1200+ GSM rigid Kappa board with matte lamination',
      'Concealed neodymium magnetic flip-top closures',
      'Laser-cut interior foam or velvet molded cradles for exact product fitting',
      'Optional natural MDF & plywood laser-engraved artisan keepsake boxes',
    ],
    customizationOptions: [
      'Full-Cover Gold / Silver Metallic Foil Stamping',
      'Spot UV Gloss Patterns on Matte Black / Navy Exterior',
      'Custom Printed Ribbon Bands & Diwali Festive Sleeves',
    ],
    applications: [
      'Diwali dry fruit & luxury confectionery hampers',
      'VIP client milestone presentations',
      'Award ceremonies and commemorative trophy packaging',
    ],
    assetConfig: {
      folder: '/images/corporate-gifting/gift-boxes/',
      recommendedDimensions: '600x600 px or 800x800 px',
      format: 'JPG, PNG, or WEBP',
      notes: 'Contains authentic presentation packaging assets and workshop laser cut designs',
    },
  },
  {
    id: 'personalised-corporate-gifts',
    slug: 'personalised-gifts',
    title: 'Personalised Corporate Gifts',
    shortDescription:
      'Commemorative laser-etched trophies, acrylic awards, custom desk nameplates, and bespoke employee recognition keepsakes.',
    description:
      'Celebrate achievements and milestones with bespoke personalized mementos. Combining optical crystal, clear cast acrylic, anodized aluminum plates, and wooden plinths permanently marked with names, dates, citations, and high-fidelity company emblems.',
    badge: 'Custom Keepsakes',
    accentColor: '#EC4899',
    route: 'services/corporate-gifting/personalised-gifts',
    openingAnimationType: 'laser-shimmer',
    primaryImage: '/images/corporate-gifting/personalised-gifts/laser-engraved-memento.jpg',
    images: [
      '/images/corporate-gifting/personalised-gifts/laser-engraved-memento.jpg',
      '/images/corporate-gifting/personalised-gifts/custom-desk-nameplate.jpg',
    ],
    features: [
      'Precision CO2 laser cutting and fiber laser engraving on acrylic and metal',
      'Multi-layered acrylic dimensional trophies with bevelled edges',
      'Solid wooden bases with brushed gold or silver engraved plate inserts',
      'Permanent mark with ultra-fine resolution for intricate coats of arms',
    ],
    customizationOptions: [
      'Individual Recipient Name & Citation Engraving',
      'Reverse Laser Engraving on Optical Acrylic with Mirror Backing',
      'Custom Contour Cutting into Company Monograms or Year Numbers',
    ],
    applications: [
      'Annual corporate excellence & long service awards',
      'Leadership recognition plaques & executive retirement gifts',
      'Festive client tokens of appreciation',
    ],
    assetConfig: {
      folder: '/images/corporate-gifting/personalised-gifts/',
      recommendedDimensions: '600x600 px',
      format: 'JPG or PNG',
      notes: 'Contains authentic laser engraved trophies and nameplates from Pune workshop',
    },
  },
];

export function getCorporateGiftingCategoryBySlug(slug: string): CorporateGiftingCategory | undefined {
  const clean = slug.toLowerCase().replace(/^corporate-gifting\/?/, '').replace(/^services\/corporate-gifting\/?/, '');
  return CORPORATE_GIFTING_CATEGORIES.find(
    (c) => c.slug === clean || c.id === clean || c.route.endsWith(clean)
  );
}

