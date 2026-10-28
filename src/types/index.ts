export interface CompanyInfo {
  name: string;
  tagline: string;
  address: {
    line1: string;
    line2: string;
    landmark: string;
    area: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    fullFormatted: string;
  };
  phones: string[];
  primaryWhatsApp: string;
  email: string;
  gstin: string;
  googleMapsUrl: string;
  instagramUrl: string;
}

export type ProductCategory =
  | 'Laser Engraved Products'
  | 'Laser-Cut Designs'
  | 'CNC-Cut Products'
  | 'Custom Nameplates'
  | 'Personalised Products'
  | 'Decorative Designs'
  | 'Custom Components'
  | 'Other Customer-Specific Products';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  galleryImages?: string[];
  shortDescription: string;
  fullDescription: string;
  manufacturingMethod: string;
  material: string;
  dimensions?: string;
  applications?: string;
  keyFeatures: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  description?: string;
  applications: string[];
  materialNote: string;
  iconName: string;
  isPlaceholder?: boolean;
  features?: string[];
}

export type GalleryCategory =
  | 'All'
  | 'Laser Engraved Products'
  | 'Laser-Cut Designs'
  | 'CNC-Cut Products'
  | 'Custom Nameplates'
  | 'Personalised Products'
  | 'Decorative Designs'
  | 'Custom Components'
  | 'Other Customer-Specific Products';

export interface GalleryItem {
  id: string;
  title: string;
  category: ProductCategory;
  image: string;
  description: string;
  manufacturingMethod: string;
}

export interface CustomProductFormData {
  customerName: string;
  companyName?: string;
  mobileNumber: string;
  email: string;
  productName: string;
  typeOfWork:
    | 'Laser Engraving/Marking'
    | 'Laser Cutting'
    | 'CNC Cutting'
    | 'Custom Product Development'
    | 'Not Sure — Need Guidance';
  material?: string;
  productDimensions?: string;
  quantity: string;
  designDescription: string;
  textToBeEngraved?: string;
  logoOrArtwork?: string;
  referenceImageFileName?: string;
  referenceImageBase64?: string;
  referenceImageSize?: number;
  technicalDrawingFileName?: string;
  technicalDrawingBase64?: number | string;
  technicalDrawingSize?: number;
  additionalRequirements?: string;
  deliveryDate?: string;
  consent: boolean;
  botCatch?: string;
}

export type QuoteFormData = CustomProductFormData;

export interface EnquiryFormData {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  enquiryType: string;
  subject: string;
  message: string;
  consent: boolean;
  botCatch?: string;
}

export interface SubmissionResponse {
  success: boolean;
  referenceId?: string;
  message?: string;
  error?: string;
  storedLocally?: boolean;
  emailDispatched?: boolean;
}

export type EnquiryResponse = SubmissionResponse;
