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
