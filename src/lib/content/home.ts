import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import { designTokens } from "@/lib/design-tokens";
import type {
  AboutBodyPayload,
  AboutContent,
  AboutMediaRow,
  AboutSectionRow,
  AboutStat,
  AboutStatRow,
  AnnouncementBar,
  BrandLogo,
  BrandLogoRow,
  HeroSection,
  NavigationItem,
  Review,
  ReviewRow,
  ReviewsContent,
  ServiceCategory,
  ServiceCategoryRow,
  ServiceMenuItemRow,
  SiteSettings,
  SocialLinkRow,
  TeamMember,
  TeamMemberRow,
  FooterContent,
  FooterHourRow,
  FooterSettingsRow,
} from "@/types/content";

const ABOUT_FALLBACK = {
  subtitle: "감각적인 변화가 시작되는 곳, HAIR UP STUDIO",
  title_line1: "Where Your",
  title_line2: "True Beauty Elevates.",
  paragraphs: [
    "헤어 업은 단순한 헤어 시술을 넘어,\n당신이 가진 고유의 분위기와 아름다움을\n가장 정점으로 끌어올리는 공간입니다.",
    "정형화된 트렌드를 똑같이 쫓아가지 않고,\n개인의 두상과 모질, 라이프스타일까지\n섬세하게 분석하여 가장 나다운 스타일을\n제안합니다.",
    "아늑하고 감각적인 인테리어 속에서\n일상의 피로를 잠시 내려놓으세요.\n헤어업을 나서는 순간, 한층 더 빛나는\n나를 마주하게 될 것입니다.\n당신의 소중한 일상에 특별한 변화의\n가치를 더해드립니다.",
  ],
};

/** Storage에 올린 시안 로고 순서 (Aveda → … → Moroccanoil) */
const BRAND_LOGO_FALLBACK: Omit<BrandLogoRow, "id" | "is_visible">[] = [
  { name: "Aveda", image_path: "brands/aveda.svg", sort_order: 1 },
  { name: "Kérastase", image_path: "brands/kerastase.svg", sort_order: 2 },
  { name: "Shiseido", image_path: "brands/shiseido.svg", sort_order: 3 },
  { name: "Olaplex", image_path: "brands/olaplex.svg", sort_order: 4 },
  { name: "Moroccanoil", image_path: "brands/moroccanoil.svg", sort_order: 5 },
];

function parseAboutBody(row: AboutSectionRow): AboutBodyPayload {
  const raw = row.body;

  if (raw) {
    try {
      const json = JSON.parse(raw) as AboutBodyPayload;
      if (json && (json.paragraphs || json.subtitle || json.title_line1)) {
        return {
          subtitle: json.subtitle || row.subtitle || ABOUT_FALLBACK.subtitle,
          title_line1:
            json.title_line1 || row.title_line1 || ABOUT_FALLBACK.title_line1,
          title_line2:
            json.title_line2 || row.title_line2 || ABOUT_FALLBACK.title_line2,
          paragraphs: json.paragraphs?.length
            ? json.paragraphs
            : ABOUT_FALLBACK.paragraphs,
        };
      }
    } catch {
      // plain-text body
    }
  }

  const paragraphs = (raw ?? "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    subtitle: row.subtitle || ABOUT_FALLBACK.subtitle,
    title_line1: row.title_line1 || ABOUT_FALLBACK.title_line1,
    title_line2: row.title_line2 || ABOUT_FALLBACK.title_line2,
    paragraphs: paragraphs.length ? paragraphs : ABOUT_FALLBACK.paragraphs,
  };
}

const STAT_DESCRIPTION_BREAKS: Record<string, string> = {
  "10+":
    "10년 이상의 풍부한 실무 경험을 가진\n베테랑 디자이너들이 상주합니다.",
  "1500+":
    "트렌디한 감각으로 완성한\n맞춤형 퍼스널 헤어 디자인 건수입니다.",
  "100%":
    "모발과 두피 손상을 최소화하는 검증된\n프리미엄 정품만을 사용합니다.",
  "4.9":
    "꼼꼼한 시술과 세심한 서비스로 증명하는\n실제 방문 고객만족도 평점입니다.",
};

function resolveStat(s: AboutStatRow): AboutStat {
  let label = s.label ?? "";
  let description = s.description ?? "";

  if (!description && label.includes("||")) {
    const [title, ...rest] = label.split("||");
    label = title ?? "";
    description = rest.join("||");
  }

  if (!description.includes("\n") && STAT_DESCRIPTION_BREAKS[s.value]) {
    description = STAT_DESCRIPTION_BREAKS[s.value];
  }

  return {
    id: s.id,
    value: s.value,
    label,
    description,
    sort_order: s.sort_order,
  };
}

function resolveBrandLogos(rows: BrandLogoRow[]): BrandLogo[] {
  return rows.map((row) => {
    const imagePath = row.image_path.replace(/\.png$/i, ".svg");
    return {
      id: row.id,
      name: row.name,
      imageUrl: `${getPublicStorageUrl(imagePath)}?v=3`,
      sort_order: row.sort_order,
    };
  });
}

function parseInstagramUrl(bio: string | null): string | null {
  if (!bio) return null;
  const m = bio.match(/instagram:(https?:\/\/\S+)/i);
  return m?.[1] ?? null;
}

function resolveTeamMembers(rows: TeamMemberRow[]): TeamMember[] {
  const crops = designTokens.teamImageCrop;
  const pathOverride = designTokens.teamImagePathOverride;

  return rows.map((row) => {
    const byOrder = String(row.sort_order) as keyof typeof crops;
    const crop =
      crops[byOrder] ??
      (row.is_featured ? crops.featured : { position: "50% 8%" });
    const imagePath =
      pathOverride[row.sort_order] ?? row.image_path;

    return {
      id: row.id,
      name: row.name,
      roleTitle: row.role_title ?? "",
      imageUrl: getPublicStorageUrl(imagePath),
      sort_order: row.sort_order,
      isFeatured: row.is_featured,
      instagramUrl: parseInstagramUrl(row.bio),
      objectPosition: crop.position,
    };
  });
}

function parseServiceDescription(raw: string | null): {
  subtitle: string;
  body: string;
} {
  if (!raw) return { subtitle: "", body: "" };
  try {
    const parsed = JSON.parse(raw) as { subtitle?: string; body?: string };
    if (parsed && typeof parsed === "object") {
      return {
        subtitle: parsed.subtitle ?? "",
        body: parsed.body ?? "",
      };
    }
  } catch {
    // plain text
  }
  return { subtitle: "", body: raw };
}

function resolveServices(
  categories: ServiceCategoryRow[],
  items: ServiceMenuItemRow[],
): ServiceCategory[] {
  return categories.map((cat) => {
    const { subtitle, body } = parseServiceDescription(cat.description);
    return {
      id: cat.id,
      slug: cat.slug,
      eyebrow: cat.eyebrow ?? "",
      title: cat.title,
      subtitle,
      body,
      imageUrl: cat.media_path ? getPublicStorageUrl(cat.media_path) : null,
      ctaLabel: cat.cta_label ?? "원하는 시술로 바로 예약하기",
      ctaHref: cat.cta_href,
      items: items
        .filter((it) => it.category_id === cat.id)
        .map((it) => ({
          id: it.id,
          name: it.name,
          priceLabel: it.price_label,
        })),
    };
  });
}

const REVIEWS_IMAGE_PATH = "260716_HU_TEMPLATE.png";

function parseReviewBody(raw: string): {
  quote: string;
  handle: string;
  date: string;
} {
  try {
    const parsed = JSON.parse(raw) as {
      quote?: string;
      handle?: string;
      date?: string;
    };
    if (parsed && typeof parsed === "object" && parsed.quote) {
      return {
        quote: parsed.quote,
        handle: parsed.handle ?? "",
        date: parsed.date ?? "",
      };
    }
  } catch {
    // plain text quote
  }
  return { quote: raw, handle: "", date: "" };
}

function resolveReviews(rows: ReviewRow[]): Review[] {
  return rows.map((row) => {
    const { quote, handle, date } = parseReviewBody(row.body);
    return {
      id: row.id,
      quote,
      artistName: row.author_name,
      serviceLabel: row.service_label ?? "",
      handle,
      date,
      variant: row.variant === "dark" ? "dark" : "light",
      sort_order: row.sort_order,
    };
  });
}

const FOOTER_HOURS_FALLBACK: FooterHourRow[] = [
  { days: "MON - FRI", time: "10:00 AM – 08:00 PM" },
  { days: "SAT", time: "10:00 AM – 09:00 PM" },
  { days: "SUN", time: "10:00 AM – 07:00 PM" },
];

const FOOTER_FALLBACK = {
  address: "서울특별시 강남구 청담동 123-4, 2층",
  phone: "02. 1234. 5678",
  email: "info@hairup.com",
  business:
    "(주)헤어업 | 대표자 홍길동 | 사업자등록번호 123-45-67890 | 주소 서울특별시 강남구 청담동 123-4, 2층",
  credit: "© 2026 COPYRIGHT BY HAIR UP | DESIGNED BY MARANATHA STUDIO",
  adminLabel: "ADMIN",
  adminHref: "/admin",
};

function parseFooterHours(raw: string | null): FooterHourRow[] {
  if (!raw) return FOOTER_HOURS_FALLBACK;
  try {
    const parsed = JSON.parse(raw) as FooterHourRow[];
    if (Array.isArray(parsed) && parsed.length) {
      return parsed.map((row) => ({
        days: row.days ?? "",
        time: row.time ?? "",
      }));
    }
  } catch {
    // plain multiline: "DAYS: TIME"
  }
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return FOOTER_HOURS_FALLBACK;
  return lines.map((line) => {
    const [days, ...rest] = line.split(":");
    return {
      days: (days ?? "").trim(),
      time: rest.join(":").trim(),
    };
  });
}

function parseFooterCopyright(raw: string | null): {
  business: string;
  credit: string;
  adminLabel: string;
  adminHref: string;
} {
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as {
        business?: string;
        credit?: string;
        adminLabel?: string;
        adminHref?: string;
      };
      if (parsed && typeof parsed === "object") {
        return {
          business: parsed.business ?? FOOTER_FALLBACK.business,
          credit: parsed.credit ?? FOOTER_FALLBACK.credit,
          adminLabel: parsed.adminLabel ?? FOOTER_FALLBACK.adminLabel,
          adminHref: parsed.adminHref ?? FOOTER_FALLBACK.adminHref,
        };
      }
    } catch {
      // plain copyright string
      return {
        ...FOOTER_FALLBACK,
        credit: raw,
      };
    }
  }
  return { ...FOOTER_FALLBACK };
}

function resolveFooter(
  brandName: string,
  row: FooterSettingsRow | null,
  socials: SocialLinkRow[],
): FooterContent {
  const legal = parseFooterCopyright(row?.copyright_text ?? null);
  const socialItems = socials.length
    ? socials.map((s) => ({
        id: s.id,
        label: s.platform,
        href: s.url,
      }))
    : [
        { id: 1, label: "FACEBOOK", href: "https://facebook.com" },
        { id: 2, label: "INSTAGRAM", href: "https://instagram.com" },
        { id: 3, label: "YOUTUBE", href: "https://youtube.com" },
      ];

  return {
    brandName,
    hours: parseFooterHours(row?.hours ?? null),
    address: row?.address || FOOTER_FALLBACK.address,
    phone: row?.phone || FOOTER_FALLBACK.phone,
    email: row?.email || FOOTER_FALLBACK.email,
    socials: socialItems,
    businessLine: legal.business,
    creditLine: legal.credit,
    adminLabel: legal.adminLabel,
    adminHref: legal.adminHref,
  };
}

export async function getHomePageData() {
  const supabase = createSupabaseServerClient();

  const [
    settingsRes,
    announcementRes,
    navRes,
    heroRes,
    aboutRes,
    brandsRes,
    teamRes,
    serviceCatsRes,
    serviceItemsRes,
    reviewsRes,
    footerRes,
    socialRes,
  ] = await Promise.all([
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
    supabase
      .from("about_section")
      .select("*")
      .eq("status", "published")
      .limit(1)
      .maybeSingle(),
    supabase
      .from("brand_logos")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("team_members")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("service_categories")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("service_menu_items")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("reviews")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase.from("footer_settings").select("*").limit(1).maybeSingle(),
    supabase
      .from("social_links")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
  ]);

  if (settingsRes.error) throw settingsRes.error;
  if (announcementRes.error) throw announcementRes.error;
  if (navRes.error) throw navRes.error;
  if (heroRes.error) throw heroRes.error;
  if (aboutRes.error) throw aboutRes.error;
  // brands / team / services / reviews / footer — optional
  if (brandsRes.error) {
    console.error("[home] brand_logos:", brandsRes.error.message);
  }
  if (teamRes.error) {
    console.error("[home] team_members:", teamRes.error.message);
  }
  if (serviceCatsRes.error) {
    console.error("[home] service_categories:", serviceCatsRes.error.message);
  }
  if (serviceItemsRes.error) {
    console.error("[home] service_menu_items:", serviceItemsRes.error.message);
  }
  if (reviewsRes.error) {
    console.error("[home] reviews:", reviewsRes.error.message);
  }
  if (footerRes.error) {
    console.error("[home] footer_settings:", footerRes.error.message);
  }
  if (socialRes.error) {
    console.error("[home] social_links:", socialRes.error.message);
  }

  const settings = settingsRes.data as SiteSettings | null;
  const announcement = announcementRes.data as AnnouncementBar | null;
  const navItems = (navRes.data ?? []) as NavigationItem[];
  const hero = heroRes.data as HeroSection | null;
  const aboutRow = aboutRes.data as AboutSectionRow | null;

  let about: AboutContent | null = null;

  if (aboutRow) {
    const [statsRes, mediaRes] = await Promise.all([
      supabase
        .from("about_stats")
        .select("*")
        .eq("about_id", aboutRow.id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("about_media")
        .select("*")
        .eq("about_id", aboutRow.id)
        .order("sort_order", { ascending: true }),
    ]);

    if (statsRes.error) throw statsRes.error;
    if (mediaRes.error) throw mediaRes.error;

    const statsRows = (statsRes.data ?? []) as AboutStatRow[];
    const mediaRows = (mediaRes.data ?? []) as AboutMediaRow[];
    const payload = parseAboutBody(aboutRow);

    const interior = mediaRows.find((m) => m.sort_order === 1) ?? mediaRows[0];
    const portrait = mediaRows.find((m) => m.sort_order === 2) ?? mediaRows[1];

    about = {
      id: aboutRow.id,
      eyebrow: aboutRow.eyebrow ?? "ABOUT HAIR UP",
      titleLine1: payload.title_line1,
      titleLine2: payload.title_line2,
      subtitle: payload.subtitle,
      paragraphs: payload.paragraphs,
      stats: statsRows.map(resolveStat),
      interiorUrl: interior
        ? getPublicStorageUrl(interior.image_path)
        : "",
      portraitUrl: portrait
        ? getPublicStorageUrl(portrait.image_path)
        : "",
    };
  }

  const brandRows =
    !brandsRes.error && brandsRes.data?.length
      ? (brandsRes.data as BrandLogoRow[])
      : BRAND_LOGO_FALLBACK.map((row, i) => ({
          ...row,
          id: i + 1,
          is_visible: true,
        }));

  const teamMembers = resolveTeamMembers(
    !teamRes.error ? ((teamRes.data ?? []) as TeamMemberRow[]) : [],
  );

  const services = resolveServices(
    !serviceCatsRes.error
      ? ((serviceCatsRes.data ?? []) as ServiceCategoryRow[])
      : [],
    !serviceItemsRes.error
      ? ((serviceItemsRes.data ?? []) as ServiceMenuItemRow[])
      : [],
  );

  const reviewItems = resolveReviews(
    !reviewsRes.error ? ((reviewsRes.data ?? []) as ReviewRow[]) : [],
  );

  const reviews: ReviewsContent | null = reviewItems.length
    ? {
        title: "Reviews From Customers",
        imageUrl: getPublicStorageUrl(REVIEWS_IMAGE_PATH),
        items: reviewItems,
      }
    : null;

  const footer = resolveFooter(
    settings?.brand_name ?? "HAIR UP",
    !footerRes.error
      ? ((footerRes.data as FooterSettingsRow | null) ?? null)
      : null,
    !socialRes.error ? ((socialRes.data ?? []) as SocialLinkRow[]) : [],
  );

  return {
    settings,
    announcement,
    navItems,
    hero,
    leftImageUrl: hero ? getPublicStorageUrl(hero.left_image_path) : null,
    rightImageUrl: hero ? getPublicStorageUrl(hero.right_image_path) : null,
    about,
    brands: resolveBrandLogos(brandRows),
    teamMembers,
    services,
    reviews,
    footer,
  };
}

/** @deprecated use getHomePageData */
export async function getHomeHeaderData() {
  return getHomePageData();
}
