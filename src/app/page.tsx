import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { getHomeHeaderData } from "@/lib/content/home";
import { designTokens } from "@/lib/design-tokens";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { settings, announcement, navItems, hero, leftImageUrl, rightImageUrl } =
    await getHomeHeaderData();

  return (
    <main
      className="mx-auto w-full bg-white"
      style={{ maxWidth: designTokens.canvas.width }}
    >
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
    </main>
  );
}
