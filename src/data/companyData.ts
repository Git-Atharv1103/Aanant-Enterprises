import type {
  CompanyInfo,
  ProductCategory,
  ProductItem,
  GalleryItem,
  ServiceItem
} from '../types';

export const COMPANY_INFO: CompanyInfo = {
  name: 'Aanant Enterprises',
  tagline: 'Infinite Solutions',
  address: {
    line1: 'Krushiraj Building, S. No. 137/1/2, Sinhgad Road',
    line2: 'Opp. Ganesh Mangal Karyalay',
    landmark: 'Pandurang Industrial Area, Nanded Phata',
    area: 'Sinhgad Road',
    city: 'Pune',
    pincode: '411041',
    state: 'Maharashtra',
    country: 'India',
    fullFormatted: 'Krushiraj Building, S. No. 137/1/2, Sinhgad Road, Opp. Ganesh Mangal Karyalay, Pandurang Industrial Area, Nanded Phata, Pune – 411041, Maharashtra, India.'
  },
  phones: ['+91 7387417382', '+91 9049397967'],
  primaryWhatsApp: '917387417382',
  email: 'aanantenterprises03@gmail.com',
  gstin: '27CMRPK4719F1ZP',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Krushiraj+Building,+S.+No.+137%2F1%2F2,+Sinhgad+Road,+Opposite+Ganesh+Mangal+Karyalay,+Pandurang+Industrial+Area,+Nanded+Phata,+Pune+411041',
  instagramUrl: 'https://www.instagram.com/aanantenterprises03/'
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Laser Engraved Products',
  'Laser-Cut Designs',
  'CNC-Cut Products',
  'Custom Nameplates',
  'Personalised Products',
  'Decorative Designs',
  'Custom Components',
  'Other Customer-Specific Products'
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'laser-engraving',
    title: 'Laser Engraving and Marking',
    category: 'Engraving & Marking',
    badge: 'Precision Marking',
    shortDescription: 'Customise products with names, logos, text, patterns, and designs using laser-based marking or engraving, depending on the material and machine capability.',
    fullDescription: 'Customise products with names, logos, text, patterns, and designs using laser-based marking or engraving, depending on the material and machine capability. From corporate awards to permanent product identification and branded accessories, we provide high-legibility, permanent marking.',
    applications: [
      'Names and personalised text',
      'Logo engraving & branding',
      'Custom designs & graphics',
      'Decorative patterns',
      'Product identification & serial numbers',
      'Custom gifts and accessories (where supported)'
    ],
    materialNote: 'Applicable materials depend on surface finish and machine capability. Not every material can be engraved; compatibility is confirmed per item.',
    iconName: 'Sparkles'
  },
  {
    id: 'laser-cutting',
    title: 'Laser Cutting',
    category: 'Precision Cutting',
    badge: 'Sharp Contours',
    shortDescription: 'Create customised shapes, patterns, and designs using laser cutting, subject to material compatibility and machine specifications.',
    fullDescription: 'Create customised shapes, patterns, and designs using laser cutting, subject to material compatibility and machine specifications. Fast, clean-edge thermal cutting tailored directly to customer-supplied 2D CAD files and vector artwork.',
    applications: [
      'Custom shapes & contours',
      'Decorative designs & screens',
      'Custom nameplates & lettering',
      'Intricate pattern cutting',
      'Signage components & panels',
      'Specially designed custom products'
    ],
    materialNote: 'Processes, cutting thicknesses, and compatible materials are verified directly against customer drawings and machine specifications.',
    iconName: 'Zap'
  },
  {
    id: 'cnc-cutting',
    title: 'CNC Cutting',
    category: 'Computer-Controlled Cutting',
    badge: 'CAD/CAM Machining',
    shortDescription: 'Use CNC machine technology to cut and produce components according to customer-provided dimensions, drawings, shapes, and design requirements.',
    fullDescription: 'Use CNC machine technology to cut and produce components according to customer-provided dimensions, drawings, shapes, and design requirements. We translate 2D vector layouts and 3D CAD files into physically accurate components with consistent dimensions.',
    applications: [
      'Custom-shaped components',
      'Design-based cutting & carving',
      'Decorative components & trims',
      'Custom panels & fixture plates',
      'Specially designed custom parts'
    ],
    materialNote: 'CNC machine material capabilities and tooling are evaluated directly per drawing. Material options remain flexible and customer-specified.',
    iconName: 'Cpu'
  },
  {
    id: 'custom-product-development',
    title: 'Custom Product Development',
    category: 'Bespoke Solutions',
    badge: 'Your Idea Realized',
    shortDescription: 'Have a specific design or product idea? Share your requirements, design, reference image, or technical drawing with Aanant Enterprises.',
    fullDescription: 'Have a specific design or product idea? Share your requirements, design, reference image, or technical drawing with Aanant Enterprises. We can review the requirements and determine whether the product can be created using our available machines.',
    applications: [
      'Bespoke product prototyping',
      'Design & artwork feasibility review',
      'Drawing-to-finished-product workflow',
      'Customized batch production',
      'Collaborative material & process guidance'
    ],
    materialNote: 'Bring your idea, sketch, vector file, or drawing for our team to evaluate manufacturing feasibility and provide quotation options.',
    iconName: 'Layers'
  }
];

export const PRODUCTS_CATALOGUE: ProductItem[] = [
  {
    id: 'custom-brass-desk-nameplate',
    name: 'Custom Engraved Brass & Steel Desk Nameplates',
    category: 'Custom Nameplates',
    image: '/images/custom-nameplate.jpg',
    galleryImages: ['/images/custom-nameplate.jpg', '/images/laser-marking-action.jpg', '/images/personalized-gifts.jpg'],
    shortDescription: 'Personalised executive desk nameplates and corporate recognition plaques with crisp laser-engraved names, designations, and company logos.',
    fullDescription: 'Custom-designed desk nameplates and recognition plaques manufactured using high-precision laser marking. We engrave individual employee names, official titles, company logos, and custom border graphics on polished brass, stainless steel, and mounted wood bases according to your design.',
    manufacturingMethod: 'Precision Laser Engraving & Surface Marking',
    material: 'Brass, Stainless Steel, Mounted Wood Base (Contact us for specifications)',
    dimensions: 'Custom sizes as per customer design (e.g. 8"x2", 10"x3", custom plaques)',
    applications: 'Executive desks, corporate awards, office reception counters, and recognition ceremonies.',
    keyFeatures: [
      'Sharp, high-contrast laser engraved typography and logos',
      'Custom font styles, sizes, and layout arrangements',
      'Beveled and deburred edges for a premium corporate aesthetic',
      'Single bespoke orders and bulk corporate batches supported'
    ]
  },
  {
    id: 'decorative-architectural-panel',
    name: 'Laser-Cut Decorative Wall Panels & Signage',
    category: 'Decorative Designs',
    image: '/images/decorative-panel.jpg',
    galleryImages: ['/images/decorative-panel.jpg', '/images/laser-parts.jpg', '/images/laser-action.jpg'],
    shortDescription: 'Intricate geometric and floral decorative panels, back-lit architectural screens, and custom cut corporate wall signs.',
    fullDescription: 'Manufactured with fiber laser precision, these custom-designed panels transform vector art and architectural CAD profiles into striking interior and exterior elements. Suitable for residential partitions, hotel lobbies, boutique branding signs, and ambient backlit accents.',
    manufacturingMethod: 'High-Precision Laser Cutting & Contour Profiling',
    material: 'Mild Steel, Stainless Steel, Aluminum (Contact us for specifications)',
    dimensions: 'Custom sizing per architectural or interior layout requirements',
    applications: 'Architectural partitions, decorative wall screens, commercial branding, and backlit feature walls.',
    keyFeatures: [
      'Clean cut lines with tight internal corner radiuses',
      'Custom pattern nesting from DXF / DWG / AI vector artwork',
      'Burr-free edges ready for powder coating or natural metallic finishing',
      'Reinforced mounting holes or stand-off spacers on request'
    ]
  },
  {
    id: 'laser-marked-industrial-components',
    name: 'Laser-Marked Metal Components & Identification Plates',
    category: 'Laser Engraved Products',
    image: '/images/laser-marking-action.jpg',
    galleryImages: ['/images/laser-marking-action.jpg', '/images/custom-nameplate.jpg', '/images/cnc-parts.jpg'],
    shortDescription: 'Permanent high-contrast laser marking of serial numbers, 2D QR codes, company logos, and technical calibration scales on metal components.',
    fullDescription: 'Non-contact fiber laser marking provides permanent, abrasion-resistant marking on anodized aluminum, stainless steel, and alloy surfaces. Ideal for machine nameplates, industrial asset tags, control dials, and branded metal products without weakening the substrate.',
    manufacturingMethod: 'Fiber Laser Marking & Micro-Etching',
    material: 'Anodized Aluminum, Stainless Steel, Tool Steels (Contact us for specifications)',
    dimensions: 'Custom dimensions according to component drawings',
    applications: 'Machine identification plates, asset tracking tags, dials, control panels, and branded hardware.',
    keyFeatures: [
      'Permanent, wear-resistant marking impervious to oils and heat',
      'High-resolution rendering of complex vector logos and barcodes',
      'Zero mechanical deformation or clamping stress',
      'Consistent repeatability across batch production'
    ]
  },
  {
    id: 'personalised-corporate-gifts',
    name: 'Personalised Corporate Gifts & Desk Accessories',
    category: 'Personalised Products',
    image: '/images/personalized-gifts.jpg',
    galleryImages: ['/images/personalized-gifts.jpg', '/images/custom-nameplate.jpg', '/images/decorative-panel.jpg'],
    shortDescription: 'Personalised laser-engraved executive pens, custom wooden key fobs, metallic cardholders, and acrylic display stands.',
    fullDescription: 'Customized gift items crafted with laser engraving and precision cutting. We engrave individual recipient names, customized event messages, or brand logos onto curated gift sets, wooden desk fobs, executive card cases, and laser-cut acrylic organizers.',
    manufacturingMethod: 'Laser Engraving & Personalized Customization',
    material: 'Metals, Treated Wood, Acrylic, Leatherette (Contact us for specifications)',
    dimensions: 'Standard and custom product sizes per order',
    applications: 'Corporate gifting, executive onboarding, commemorative events, client appreciation gifts.',
    keyFeatures: [
      'Individual name personalization on each piece in a batch',
      'Clean engraving on curved and flat surfaces',
      'Custom packaging coordination upon request',
      'Low minimum order quantities for custom designs'
    ]
  },
  {
    id: 'cnc-cut-precision-fittings',
    name: 'CNC-Cut Precision Turned & Milled Components',
    category: 'CNC-Cut Products',
    image: '/images/cnc-parts.jpg',
    galleryImages: ['/images/cnc-parts.jpg', '/images/hero-cnc.jpg', '/images/quality-inspection.jpg'],
    shortDescription: 'Computer-controlled turned fittings, threaded couplings, and milled cylindrical parts cut to customer dimensions.',
    fullDescription: 'Precision components produced using CNC machine technology. We machine custom parts, cylindrical sleeves, threaded adapters, and mechanical couplings strictly aligned with your supplied 2D drawings and 3D CAD files.',
    manufacturingMethod: 'Computer Numerical Control (CNC) Cutting & Turning',
    material: 'Aluminum Alloys, Brass, Mild Steel (Contact us for specifications)',
    dimensions: 'Manufactured per customer technical drawing dimensions',
    applications: 'Machinery assemblies, custom fixtures, pneumatic couplers, and mechanical fittings.',
    keyFeatures: [
      'High concentricity and smooth surface finishes',
      'Precision thread cutting and bore tolerances',
      'Strict adherence to engineering drawing notes',
      'Sample verification before repeat batch production'
    ]
  },
  {
    id: 'laser-cut-brackets-and-profiles',
    name: 'Laser-Cut Custom Brackets & Profiles',
    category: 'Laser-Cut Designs',
    image: '/images/laser-parts.jpg',
    galleryImages: ['/images/laser-parts.jpg', '/images/laser-action.jpg', '/images/decorative-panel.jpg'],
    shortDescription: 'Clean-cut sheet metal brackets, custom mounting plates, and slotted structural profiles tailored to client designs.',
    fullDescription: 'Accurately profiled sheet metal parts cut to customer vector geometry. We support custom bracket shapes, mounting slots, decorative perforations, and specialized equipment framing with deburred, clean edges.',
    manufacturingMethod: 'High-Accuracy Laser Cutting',
    material: 'Stainless Steel, Mild Steel, Aluminum (Contact us for specifications)',
    dimensions: 'Cut directly from customer DXF / DWG files',
    applications: 'Mounting brackets, chassis plates, custom hardware, and specialized equipment frames.',
    keyFeatures: [
      'Minimal thermal distortion and precise slot centerlines',
      'Deburred, burr-free edges ready for assembly',
      'Rapid prototype turnaround from digital files',
      'Repeat batch consistency'
    ]
  },
  {
    id: 'custom-welded-fixtures',
    name: 'Custom Fabricated Fixtures & Mounting Bases',
    category: 'Custom Components',
    image: '/images/fabrication-parts.jpg',
    galleryImages: ['/images/fabrication-parts.jpg', '/images/laser-parts.jpg', '/images/quality-inspection.jpg'],
    shortDescription: 'Custom-built structural bases, welded fixture plates, and specialized mechanical assemblies manufactured to client specifications.',
    fullDescription: 'Custom product manufacturing combining laser cut profiles, CNC machined mounting surfaces, and robust structural welding. Built for tooling fixtures, heavy machine bases, and custom workshop assemblies.',
    manufacturingMethod: 'Laser Cutting, Welding & CNC Finishing',
    material: 'Structural Steel, Carbon Steel (Contact us for specifications)',
    dimensions: 'Custom sizes as per project requirements',
    applications: 'Industrial tooling, testing fixtures, structural baseplates, and workshop equipment.',
    keyFeatures: [
      'Solid weld joints and structural rigidity',
      'Precision machined mating surfaces and tapped hole patterns',
      'Manufactured strictly to customer assembly prints',
      'Batch fabrication and one-off custom prototypes supported'
    ]
  },
  {
    id: 'machined-transmission-parts',
    name: 'Custom Machined Shafts, Flanges & Special Parts',
    category: 'Other Customer-Specific Products',
    image: '/images/precision-parts.jpg',
    galleryImages: ['/images/precision-parts.jpg', '/images/cnc-parts.jpg', '/images/hero-cnc.jpg'],
    shortDescription: 'Custom-turned splined shafts, circular mounting flanges, and specialized rotary components made to customer specifications.',
    fullDescription: 'Specialized machine parts manufactured to customer specifications. We produce custom splined shafts, flanged adapters, and drive components with dependable runout control and balanced alignment.',
    manufacturingMethod: 'CNC Cutting, Turning & Secondary Keyway Machining',
    material: 'Alloy Steels, Stainless Steel (Contact us for specifications)',
    dimensions: 'Per engineering print dimensions',
    applications: 'Custom rotary drives, gearboxes, industrial couplings, and machinery rebuilds.',
    keyFeatures: [
      'Controlled concentricity and keyway tolerances',
      'Chamfered lead-ins for easy assembly',
      'Granite surface metrological verification',
      'Custom prototype to production runs'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Custom Laser-Engraved Executive Brass Nameplate',
    category: 'Custom Nameplates',
    image: '/images/custom-nameplate.jpg',
    description: 'Personalized brass and stainless steel desk nameplates with laser engraved logos and sharp typography.',
    manufacturingMethod: 'Laser Engraving'
  },
  {
    id: 'gal-2',
    title: 'Decorative Laser-Cut Backlit Wall Panel',
    category: 'Decorative Designs',
    image: '/images/decorative-panel.jpg',
    description: 'Custom geometric patterns and architectural backlit panel cut with precision fiber laser.',
    manufacturingMethod: 'Laser Cutting'
  },
  {
    id: 'gal-3',
    title: 'Fiber Laser Marking on Anodized Aluminum Component',
    category: 'Laser Engraved Products',
    image: '/images/laser-marking-action.jpg',
    description: 'High-contrast laser marking of serial numbering, 2D QR codes, and custom company branding.',
    manufacturingMethod: 'Laser Marking'
  },
  {
    id: 'gal-4',
    title: 'Personalised Corporate Executive Gift Collection',
    category: 'Personalised Products',
    image: '/images/personalized-gifts.jpg',
    description: 'Custom engraved pens, wooden key fobs, metallic card cases, and acrylic display pieces.',
    manufacturingMethod: 'Personalised Laser Engraving'
  },
  {
    id: 'gal-5',
    title: 'CNC-Cut Precision Turned & Threaded Fittings',
    category: 'CNC-Cut Products',
    image: '/images/cnc-parts.jpg',
    description: 'Finished cylindrical fittings and brass threaded couplings manufactured with CNC accuracy.',
    manufacturingMethod: 'CNC Turning & Cutting'
  },
  {
    id: 'gal-6',
    title: 'Laser-Cut Structural Sheet Metal Brackets',
    category: 'Laser-Cut Designs',
    image: '/images/laser-parts.jpg',
    description: 'Cleanly deburred stainless steel structural brackets and perforated mounting grilles.',
    manufacturingMethod: 'Laser Cutting'
  },
  {
    id: 'gal-7',
    title: 'Custom Fabricated Fixtures & Heavy-Duty Bases',
    category: 'Custom Components',
    image: '/images/fabrication-parts.jpg',
    description: 'Bespoke welded fixture frames and precision machined baseplates built to customer prints.',
    manufacturingMethod: 'Fabrication & CNC'
  },
  {
    id: 'gal-8',
    title: 'Machined Splined Shafts & Precision Flanges',
    category: 'Other Customer-Specific Products',
    image: '/images/precision-parts.jpg',
    description: 'Custom customer-specific transmission shafts, circular flanges, and bearing sleeves.',
    manufacturingMethod: 'CNC Precision Cutting'
  }
];

export const FOUR_STEP_PROCESS = [
  {
    step: '01',
    title: 'SHARE YOUR IDEA',
    description: 'Share your product idea, text, logo, design, or reference image with our team through our website form, email, or WhatsApp.'
  },
  {
    step: '02',
    title: 'SELECT THE WORK TYPE',
    description: 'Indicate whether you require laser engraving/marking, laser cutting, CNC cutting, or custom product development.'
  },
  {
    step: '03',
    title: 'DISCUSS AND CONFIRM',
    description: 'Our team reviews your design, material, dimensions, quantity, and machine compatibility before confirming the quotation and lead schedule.'
  },
  {
    step: '04',
    title: 'PRODUCTION',
    description: 'After the specifications, price, and delivery arrangements are agreed upon, your customized order proceeds directly to production.'
  }
];

export const ABOUT_SECTIONS = [
  {
    title: 'Company Overview',
    description: 'Aanant Enterprises operates from Krushiraj Building, Sinhgad Road, Pandurang Industrial Area, Nanded Phata, Pune. We specialize in custom laser engraving, laser cutting, CNC cutting, and bespoke product development for individual and business clients.',
    iconName: 'Building2'
  },
  {
    title: 'Our Manufacturing Approach',
    description: 'We blend modern digital cutting and marking technology with careful engineering review. Every custom product begins with your idea or digital artwork, which we translate into clean, physical creations.',
    iconName: 'Cpu'
  },
  {
    title: 'Customisation Capabilities',
    description: 'From personalized nameplates, engraved gifts, and custom signage to precision laser-cut sheet parts and CNC-machined components, we tailor each piece to your exact aesthetic and functional requirements.',
    iconName: 'Sliders'
  },
  {
    title: 'Customer Requirements',
    description: 'We listen carefully to your dimensions, material preferences, and design vision. We provide honest feedback on machine feasibility and deliver dependable products that bring your ideas to life.',
    iconName: 'CheckCircle2'
  }
];

export const ENQUIRY_TYPES = [
  'Custom Product Request',
  'Laser Engraving / Marking Enquiry',
  'Laser Cutting Enquiry',
  'CNC Cutting Enquiry',
  'Custom Nameplates & Signage',
  'Personalised / Corporate Gifts',
  'General Enquiry'
];

// Compatibility alias for generic service cards
export const SERVICES_CATALOGUE: ServiceItem[] = SERVICES_DATA;

export const CAPABILITIES_DATA = {
  cnc: {
    title: 'CNC Cutting & Machining',
    description: 'Use CNC machine technology to cut and produce components according to customer-provided dimensions, drawings, shapes, and design requirements.',
    processes: [
      'Custom-shaped components',
      'Design-based precision cutting',
      'Decorative components & trims',
      'Custom panels & plates',
      'Specially designed parts'
    ],
    materialsNote: 'Machinable materials, tooling parameters, and thickness limits are reviewed against your submitted drawings and specifications.'
  },
  laser: {
    title: 'Laser Cutting & Engraving',
    description: 'Create customised shapes, patterns, markings, and designs using laser cutting and engraving, subject to material compatibility and machine specifications.',
    processes: [
      'Custom vector shape cutting',
      'Decorative architectural patterns',
      'Personalised nameplates & signage',
      'Permanent logo marking & engraving',
      'Pattern cutting & custom components'
    ],
    materialsNote: 'Laser capabilities depend on material type, reflective properties, and machine power. Feasibility is confirmed per customer requirement.'
  }
};

export const BUSINESS_APPROACH_POINTS = [
  {
    title: 'Drawing-Centric Execution',
    description: 'We cut and engrave strictly to customer designs, vector artwork, CAD drawings, or clear physical samples.',
    iconName: 'Cog'
  },
  {
    title: 'Custom Product Flexibility',
    description: 'Whether producing a single personalised creation or repeatable batch quantities, we tailor setups to project requirements.',
    iconName: 'Layers'
  },
  {
    title: 'Dimensional Accuracy',
    description: 'Consistent cutting tolerances and clean edge finishes through programmed CNC and laser machine controls.',
    iconName: 'CheckCircle2'
  },
  {
    title: 'Transparent Technical Reviews',
    description: 'We evaluate drawing files honestly, confirming machine feasibility and material compatibility before taking orders.',
    iconName: 'MessageSquare'
  },
  {
    title: 'Design Confidentiality',
    description: 'Customer artwork, vector logos, and engineering prints are kept strictly confidential for production use only.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Direct Collaborative Support',
    description: 'Direct communication with our Pune workshop via phone, email, and WhatsApp to discuss revisions and custom requests.',
    iconName: 'Handshake'
  }
];

