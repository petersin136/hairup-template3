/**
 * 폰트 설정 단일 진입점
 * 실제 브랜드 폰트 파일 수령 시 여기만 교체하면 됩니다.
 *
 * 현재 대체:
 * - Pretendard: 국문/UI (시안 산세리프와 가장 유사, 웹 상용)
 * - Inter: 영문 헤드라인 보조 (기하학적 산세리프)
 */
export const fontFamilies = {
  sans: '"Pretendard", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  display: '"Inter", "Pretendard", sans-serif',
} as const;

/** layout <head> 에 넣을 CDN (Pretendard) */
export const pretendardStylesheet =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css";
