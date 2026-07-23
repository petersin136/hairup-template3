/**
 * Design tokens — 1440px desktop 시안 기준
 * 폰트/컬러 교체 시 이 파일과 styles/fonts.ts 만 수정
 */
export const designTokens = {
  canvas: {
    width: 1440,
  },
  color: {
    white: "#FFFFFF",
    black: "#151515",
    announcementBg: "#3D3630",
    navInactive: "#A9A9A9",
    ctaBg: "#000000",
    ctaHover: "#222222",
    ctaText: "#FFFFFF",
    aboutEyebrow: "#9D9D9D",
    aboutTitle: "#111111",
    aboutBody: "#3A3A3A",
    aboutMuted: "#4A4A4A",
    aboutLine: "#BDBDBD",
    /** Brand ticker — 시안 크림 배경 */
    brandTickerBg: "#F5F2EE",
    /** Services — 시안 크림 배경 */
    servicesBg: "#F7F4EF",
    servicesEyebrow: "#9D9D9D",
    servicesMuted: "#8A8A8A",
    servicesNote: "#A3A3A3",
  },
  size: {
    announcementHeight: 45,
    headerHeight: 90,
    /** 시안: 헤더 바로 아래 Hero 시작 (로고 수직 중앙이 여백을 만듦) */
    headerToHeroGap: 0,
    pageSidePadding: 24,
    heroHeight: 700,
    /** 시안: 약하게 보이되 확실히 곡선 (4는 부족, 40은 과함) */
    heroRadius: 12,
    ctaWidth: 176,
    ctaHeight: 42,
    ctaRadius: 4,
    heroTextPadX: 48,
    heroTextPadBottom: 48,
    // About — 본문 폭↑ · 중앙 이미지↑
    // About — 시안 02 실측 (1440)
    aboutSidePadding: 120,
    aboutPadTop: 100,
    aboutPadBottom: 100,
    aboutStatsGapTop: 48,
    aboutStatsGapBottom: 56,
    aboutStatsColGap: 36,
    aboutTextCol: 260,
    aboutTextMediaGap: 46,
    aboutInteriorW: 586,
    aboutInteriorH: 741,
    aboutPortraitW: 276,
    aboutPortraitH: 373,
    aboutMediaGap: 32,
    aboutImageRadius: 12,
    // Brand ticker — 시안 03 (단일 라인 기준 높이; Kérastase는 scale로 보정)
    brandTickerHeight: 120,
    brandLogoHeight: 22,
    brandLogoGap: 110,
    // Team — 시안 04 실측 (1440 ← 1024 mock × 1.406)
    teamSidePadding: 24,
    teamPadTop: 100,
    teamPadBottom: 100,
    teamTitleGap: 28,
    teamCollageH: 523,
    teamFeaturedW: 581,
    teamStripW: 191,
    teamGap: 12,
    teamRadius: 12,
    teamOverlayPadX: 28,
    teamOverlayPadY: 28,
    // Services — 시안 05 실측 (1440 ← 1024 mock × 1.406)
    servicesSidePadding: 120,
    servicesPadTop: 100,
    servicesPadBottom: 100,
    servicesTextW: 470,
    servicesImageW: 483,
    servicesImageH: 596,
    servicesImageRadius: 12,
    servicesGap: 246,
    servicesCtaW: 320,
    servicesCtaH: 52,
    servicesNavSize: 44,
  },
  /** 시안 실측 광학 비율 — Kérastase(+PARIS) ≈ 1.7× */
  brandLogoScale: {
    aveda: 0.95,
    kerastase: 1.7,
    shiseido: 1.12,
    olaplex: 1,
    moroccanoil: 1,
  },
  /**
   * Team collage — 이미지는 정수리 상단 크롭본(team/*.jpg) 기준
   * object-position은 top으로 고정해 펼침/축소 시 얼굴 높이 유지
   */
  teamObjectPosition: {
    featured: "50% 0%",
    1: "50% 0%",
    2: "50% 0%",
    3: "50% 0%",
    4: "50% 0%",
    5: "50% 0%",
  },
  font: {
    announcement: 13,
    /** 시안 cap-height ≈22.5px → Medium 24 */
    logo: 24,
    nav: 13,
    cta: 13,
    heroEyebrow: 13,
    heroTitle: 52,
    heroRightHeadline: 24,
    heroRightBody: 15,
    aboutEyebrow: 12,
    aboutTitle: 44,
    aboutSubtitle: 17,
    aboutStatValue: 44,
    aboutStatLabel: 15,
    aboutStatDesc: 13,
    aboutBody: 15,
    /** 시안 04 실측 ≈46 — 32는 너무 작음 */
    teamTitle: 48,
    teamRole: 12,
    teamName: 22,
    servicesEyebrow: 12,
    servicesTitle: 42,
    servicesSubtitle: 16,
    servicesBody: 14,
    servicesItem: 14,
    servicesNote: 12,
    servicesCta: 14,
  },
  tracking: {
    /** 시안 로고: 살짝만 벌림 (0.12는 찐빵처럼 납작해 보임) */
    logo: "0.04em",
    teamRole: "0.08em",
    teamTitle: "-0.015em",
  },
  weight: {
    logo: 500,
    heroEyebrow: 400,
    heroTitle: 500,
    heroRightHeadline: 500,
    heroRightBody: 300,
    aboutEyebrow: 400,
    /** 시안: Regular~Medium — 600은 영문이 두껍게 보임 */
    aboutTitle: 500,
    aboutSubtitle: 400,
    aboutStatValue: 500,
    aboutStatLabel: 500,
    aboutStatDesc: 400,
    aboutBody: 400,
    /** Regular — Medium(500)보다 부드럽게 */
    teamTitle: 400,
    teamRole: 400,
    teamName: 700,
    servicesEyebrow: 400,
    servicesTitle: 600,
    servicesSubtitle: 500,
    servicesBody: 400,
    servicesItem: 400,
    servicesCta: 500,
  },
} as const;

export type DesignTokens = typeof designTokens;
