/**
 * 폰트 설정 단일 진입점
 * 실제 브랜드 폰트 파일 수령 시 여기만 교체하면 됩니다.
 *
 * 현재: Pretendard Variable (로고·UI 공통)
 * — Montserrat는 자간 넓힐 때 납작(짜부)해 보여 제외
 */
export const fontFamilies = {
  sans: '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  display:
    '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  logo: '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
} as const;

/** layout <head> — Variable이 weight 표현에 더 정확 */
export const pretendardStylesheet =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css";
