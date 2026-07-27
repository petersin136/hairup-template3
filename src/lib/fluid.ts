/** 1440 시안 px → 뷰포트 비율 환산 (전폭 반응형) */
export const DESIGN_WIDTH = 1440;

/** 모바일 시안(HUM) 아트보드 폭 */
export const MOBILE_DESIGN_WIDTH = 375;

/** 모바일 레이아웃 적용 최대 폭 (md 미만) */
export const MOBILE_MAX_WIDTH_PX = 767;

/**
 * 예: 24 → calc(24 / 1440 * 100vw)
 *
 * 시안 가이드(전체 레이아웃 및 스케일링 스펙):
 * - 아트보드 기준 1440px
 * - 고정 컨테이너로 가두어 대형 화면에서 여백만 늘리는 방식 금지
 * - 글자·박스·여백이 화면 너비에 비례해 함께 확장/축소
 */
export function vw(px: number): string {
  return `calc(${px} / ${DESIGN_WIDTH} * 100vw)`;
}

/** 모바일 375 시안 px → 100vw 비례 */
export function mw(px: number): string {
  return `calc(${px} / ${MOBILE_DESIGN_WIDTH} * 100vw)`;
}

/**
 * 폰트도 레이아웃과 동일하게 1440 기준 순수 비례 스케일.
 * (과거 clamp min/max는 대형·소형에서 비율이 깨져 가이드와 충돌 → 제거)
 */
export function fluidFont(px: number): string {
  return vw(px);
}

/** 모바일 폰트 — 375 기준 */
export function mobileFont(px: number): string {
  return mw(px);
}
