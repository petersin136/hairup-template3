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

export type BrandLogoRow = {
  id: number;
  name: string;
  image_path: string;
  sort_order: number;
  is_visible: boolean;
};

export type BrandLogo = {
  id: number;
  name: string;
  imageUrl: string;
  sort_order: number;
};

export type TeamMemberRow = {
  id: number;
  name: string;
  role_title: string | null;
  bio: string | null;
  image_path: string;
  sort_order: number;
  is_featured: boolean;
  is_visible: boolean;
};

export type TeamMember = {
  id: number;
  name: string;
  roleTitle: string;
  imageUrl: string;
  sort_order: number;
  isFeatured: boolean;
  instagramUrl: string | null;
  objectPosition: string;
};

export type ServiceCategoryRow = {
  id: number;
  slug: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  media_path: string | null;
  cta_label: string | null;
  cta_href: string | null;
  sort_order: number;
  is_visible: boolean;
};

export type ServiceMenuItemRow = {
  id: number;
  category_id: number;
  name: string;
  price_label: string;
  sort_order: number;
  is_visible: boolean;
};

export type ServiceMenuItem = {
  id: number;
  name: string;
  priceLabel: string;
};

export type ServiceCategory = {
  id: number;
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  imageUrl: string | null;
  ctaLabel: string;
  ctaHref: string | null;
  items: ServiceMenuItem[];
};

export type ReviewRow = {
  id: number;
  body: string;
  author_name: string;
  service_label: string | null;
  variant: string;
  sort_order: number;
  is_visible: boolean;
};

export type Review = {
  id: number;
  quote: string;
  artistName: string;
  serviceLabel: string;
  handle: string;
  date: string;
  variant: "light" | "dark";
  sort_order: number;
};

export type ReviewsContent = {
  title: string;
  imageUrl: string;
  items: Review[];
};

export type FooterSettingsRow = {
  id: number;
  address: string | null;
  hours: string | null;
  phone: string | null;
  email: string | null;
  copyright_text: string | null;
};

export type SocialLinkRow = {
  id: number;
  platform: string;
  url: string;
  sort_order: number;
  is_visible: boolean;
};

export type FooterHourRow = {
  days: string;
  time: string;
};

export type FooterContent = {
  brandName: string;
  hours: FooterHourRow[];
  address: string;
  phone: string;
  email: string;
  socials: { id: number; label: string; href: string }[];
  businessLine: string;
  creditLine: string;
  adminLabel: string;
  adminHref: string;
};

