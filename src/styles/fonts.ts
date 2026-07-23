/**
 * 폰트 설정 단일 진입점
 * 영어: Poppins · 한글: Noto Sans KR
 * (브라우저가 글리프별로 폴백 — 라틴→Poppins, 한글→Noto Sans KR)
 */
export const fontFamilies = {
  sans: 'var(--font-poppins), var(--font-noto-sans-kr), "Noto Sans KR", sans-serif',
  display:
    'var(--font-poppins), var(--font-noto-sans-kr), "Noto Sans KR", sans-serif',
  logo: 'var(--font-poppins), var(--font-noto-sans-kr), "Noto Sans KR", sans-serif',
} as const;
