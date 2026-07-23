import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type {
  AnnouncementBar,
  HeroSection,
  NavigationItem,
  SiteSettings,
} from "@/types/content";

export async function getHomeHeaderData() {
  const supabase = createSupabaseServerClient();

  const [settingsRes, announcementRes, navRes, heroRes] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
    supabase
      .from("announcement_bar")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("navigation_items")
      .select("*")
      .eq("is_visible", true)
      .eq("location", "header")
      .order("sort_order", { ascending: true }),
    supabase
      .from("hero_section")
      .select("*")
      .eq("status", "published")
      .limit(1)
      .maybeSingle(),
  ]);

  if (settingsRes.error) throw settingsRes.error;
  if (announcementRes.error) throw announcementRes.error;
  if (navRes.error) throw navRes.error;
  if (heroRes.error) throw heroRes.error;

  const settings = settingsRes.data as SiteSettings | null;
  const announcement = announcementRes.data as AnnouncementBar | null;
  const navItems = (navRes.data ?? []) as NavigationItem[];
  const hero = heroRes.data as HeroSection | null;

  return {
    settings,
    announcement,
    navItems,
    hero,
    leftImageUrl: hero ? getPublicStorageUrl(hero.left_image_path) : null,
    rightImageUrl: hero ? getPublicStorageUrl(hero.right_image_path) : null,
  };
}
