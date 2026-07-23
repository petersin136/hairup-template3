export type AnnouncementBar = {
  id: number;
  message: string;
  is_active: boolean;
  bg_color: string;
  text_color: string;
};

export type NavigationItem = {
  id: number;
  label: string;
  href: string;
  is_active_state: boolean;
  sort_order: number;
};

export type SiteSettings = {
  id: number;
  brand_name: string;
  booking_url: string | null;
};

export type HeroSection = {
  id: number;
  left_image_path: string;
  left_eyebrow: string;
  left_title_line1: string;
  left_title_line2: string;
  right_image_path: string;
  right_headline: string;
  right_body_line1: string;
  right_body_line2: string;
};

export type AboutBodyPayload = {
  subtitle: string;
  title_line1: string;
  title_line2: string;
  paragraphs: string[];
};

export type AboutSectionRow = {
  id: number;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  subtitle?: string | null;
  title_line1?: string | null;
  title_line2?: string | null;
};

export type AboutStatRow = {
  id: number;
  about_id?: number;
  value: string;
  label: string;
  description?: string | null;
  sort_order: number;
};

export type AboutMediaRow = {
  id: number;
  image_path: string;
  sort_order: number;
};

export type AboutStat = {
  id: number;
  value: string;
  label: string;
  description: string;
  sort_order: number;
};

export type AboutContent = {
  id: number;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  paragraphs: string[];
  stats: AboutStat[];
  interiorUrl: string;
  portraitUrl: string;
};
