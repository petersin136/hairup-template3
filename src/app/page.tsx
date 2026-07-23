import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { BrandTickerSection } from "@/components/sections/BrandTickerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { getHomePageData } from "@/lib/content/home";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const {
    settings,
    announcement,
    navItems,
    hero,
    leftImageUrl,
    rightImageUrl,
    about,
    brands,
  } = await getHomePageData();

  return (
    <main className="site-shell mx-auto w-full bg-white">
      {announcement ? (
        <AnnouncementBar
          message={announcement.message}
          bgColor={announcement.bg_color}
          textColor={announcement.text_color}
        />
      ) : null}

      <Header
        brandName={settings?.brand_name ?? "HAIR UP"}
        items={navItems}
        bookingUrl={settings?.booking_url}
      />

      {hero && leftImageUrl && rightImageUrl ? (
        <HeroSection
          data={hero}
          leftImageUrl={leftImageUrl}
          rightImageUrl={rightImageUrl}
        />
      ) : null}

      {about ? <AboutSection data={about} /> : null}

      {brands.length ? <BrandTickerSection logos={brands} /> : null}
    </main>
  );
}
