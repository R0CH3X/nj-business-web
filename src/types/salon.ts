export type Lang = "en" | "es";

export interface BilingualText {
  en: string;
  es: string;
}

export interface Service {
  icon: string;
  name: BilingualText;
  description: BilingualText;
}

export interface Review {
  author: string;
  stars: number;
  text: string;
  date?: string;
}

export interface FAQItem {
  question: BilingualText;
  answer: BilingualText;
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface SalonData {
  slug: string;
  name: string;
  tagline: BilingualText;
  heroSubtitle: BilingualText;
  phone: string;
  address: string;
  addressDisplay: string;
  mapQuery: string;
  instagram?: string;
  bookingUrl?: string;
  hours: BilingualText;
  rating: number;
  reviewCount: number;
  badges: string[];
  about: BilingualText;
  services: Service[];
  reviews: Review[];
  gallery: GalleryImage[];
  faq: FAQItem[];
  theme: {
    primary: string;       // Tailwind color class e.g. "rose"
    heroGradient: string;  // Tailwind gradient e.g. "from-rose-900/80 to-rose-700/60"
    accent: string;        // hex or tailwind class
    badge: string;         // badge bg class
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}
