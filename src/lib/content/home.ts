import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
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
  SiteSettings,
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
const BRAND_LOGO_FALLBACK: Omit<BrandLogoRow, "id" | "is_active">[] = [
  { name: "Aveda", image_path: "brands/aveda.png", sort_order: 1 },
  { name: "Kérastase", image_path: "brands/kerastase.png", sort_order: 2 },
  { name: "Shiseido", image_path: "brands/shiseido.png", sort_order: 3 },
  { name: "Olaplex", image_path: "brands/olaplex.png", sort_order: 4 },
  { name: "Moroccanoil", image_path: "brands/moroccanoil.png", sort_order: 5 },
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
          paragraphs:
            json.paragraphs?.length
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

  // legacy: "Title||description" packed into label
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
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    // cache-bust after logo asset re-upload
    imageUrl: `${getPublicStorageUrl(row.image_path)}?v=2`,
    sort_order: row.sort_order,
  }));
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
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  if (settingsRes.error) throw settingsRes.error;
  if (announcementRes.error) throw announcementRes.error;
  if (navRes.error) throw navRes.error;
  if (heroRes.error) throw heroRes.error;
  if (aboutRes.error) throw aboutRes.error;

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
          id: i + 1,
          is_active: true,
          ...row,
        }));

  return {
    settings,
    announcement,
    navItems,
    hero,
    leftImageUrl: hero ? getPublicStorageUrl(hero.left_image_path) : null,
    rightImageUrl: hero ? getPublicStorageUrl(hero.right_image_path) : null,
    about,
    brands: resolveBrandLogos(brandRows),
  };
}

/** @deprecated use getHomePageData */
export async function getHomeHeaderData() {
  return getHomePageData();
}
