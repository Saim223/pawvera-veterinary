export type Specialization =
  | "Small Animal Care"
  | "Surgery"
  | "Dermatology"
  | "Dental Care"
  | "Emergency Care"
  | "Exotic Animals";

export type ConsultationType = "Video consult" | "In-clinic visit";

export type AvatarPalette = "brand" | "accent" | "gold" | "slate";

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  credentials: string;
  specialization: Specialization;
  hospital: string;
  city: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  fee: number;
  availableToday: boolean;
  nextAvailable: string;
  consultationTypes: ConsultationType[];
  languages: string[];
  bio: string;
  focusAreas: string[];
  palette: AvatarPalette;
  photo: string;
}

export interface Testimonial {
  id: string;
  ownerName: string;
  petName: string;
  petType: string;
  quote: string;
  rating: number;
  palette: AvatarPalette;
}

export interface HealthTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  tips: string[];
}

export interface HowItWorksStep {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface TrustStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}
