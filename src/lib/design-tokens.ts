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
  },
  size: {
    announcementHeight: 45,
    headerHeight: 90,
    headerToHeroGap: 22,
    /** 시안 01 / 래퍼런스 기준 좌우 여백 */
    pageSidePadding: 24,
    heroHeight: 700,
    /** 래퍼런스에서 둥근 모서리가 뚜렷함 — 확정값 오면 교체 */
    heroRadius: 40,
    ctaWidth: 200,
    ctaHeight: 49,
    ctaRadius: 4,
    heroTextPadX: 48,
    heroTextPadBottom: 48,
  },
  font: {
    announcement: 13,
    logo: 18,
    nav: 13,
    cta: 14,
    heroEyebrow: 13,
    heroTitle: 52,
    heroRightHeadline: 24,
    heroRightBody: 15,
  },
} as const;

export type DesignTokens = typeof designTokens;
