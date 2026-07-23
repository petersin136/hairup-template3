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
    ctaBg: "#202020",
    ctaHover: "#424242",
    ctaText: "#FFFFFF",
    aboutEyebrow: "#9D9D9D",
    aboutTitle: "#111111",
    aboutBody: "#3A3A3A",
    aboutMuted: "#4A4A4A",
    aboutLine: "#BDBDBD",
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
    ctaWidth: 200,
    ctaHeight: 49,
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
  },
  font: {
    announcement: 13,
    /** 시안 cap-height ≈22.5px → Medium 24 */
    logo: 24,
    nav: 13,
    cta: 14,
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
  },
  tracking: {
    /** 시안 로고: 살짝만 벌림 (0.12는 찐빵처럼 납작해 보임) */
    logo: "0.04em",
  },
  weight: {
    logo: 500,
    heroEyebrow: 400,
    heroTitle: 500,
    heroRightHeadline: 500,
    heroRightBody: 300,
    aboutEyebrow: 400,
    aboutTitle: 600,
    aboutSubtitle: 400,
    aboutStatValue: 700,
    aboutStatLabel: 700,
    aboutStatDesc: 500,
    aboutBody: 400,
  },
} as const;

export type DesignTokens = typeof designTokens;
