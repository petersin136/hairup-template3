/** 1440 시안 px → 뷰포트 비율 환산 (전폭 반응형) */
export const DESIGN_WIDTH = 1440;

/** 예: 24 → calc(24 / 1440 * 100vw) */
export function vw(px: number): string {
  return `calc(${px} / ${DESIGN_WIDTH} * 100vw)`;
}

/**
 * 폰트: 너무 작아지거나 커지지 않게 clamp
 * 기준은 1440 시안 px
 */
export function fluidFont(px: number, minRatio = 0.82, maxRatio = 1.2): string {
  return `clamp(${px * minRatio}px, calc(${px} / ${DESIGN_WIDTH} * 100vw), ${px * maxRatio}px)`;
}
