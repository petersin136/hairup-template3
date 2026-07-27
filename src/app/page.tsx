import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutSection } from "@/components/sections/AboutSection";
import { BrandTickerSection } from "@/components/sections/BrandTickerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ReservationSection } from "@/components/sections/ReservationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { getHomePageData } from "@/lib/content/home";
import { getPublicStorageUrl } from "@/lib/supabase/storage";

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
    teamMembers,
    services,
    reviews,
    footer,
  } = await getHomePageData();

  const bookingBgUrl = getPublicStorageUrl(
    "marius-dumitrascu-xmExDmDklKI-unsplash (1).jpg",
  );
  /** 시안 07 디자이너 목록 (미나 / 소라 / 준우) */
  const bookingDesigners = [
    { id: "mina", name: "미나" },
    { id: "sora", name: "소라" },
    { id: "junwoo", name: "준우" },
  ];

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
        announcement={
          announcement
            ? {
                message: announcement.message,
                bgColor: announcement.bg_color ?? undefined,
                textColor: announcement.text_color ?? undefined,
              }
            : null
        }
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

      {teamMembers.length ? <TeamSection members={teamMembers} /> : null}

      {services.length ? (
        <ServicesSection
          categories={services}
          bookingUrl={settings?.booking_url}
        />
      ) : null}

      {reviews ? <ReviewsSection data={reviews} /> : null}

      <ReservationSection
        bgUrl={bookingBgUrl}
        designers={bookingDesigners}
        categories={services}
      />

      <SiteFooter data={footer} />
    </main>
  );
}
