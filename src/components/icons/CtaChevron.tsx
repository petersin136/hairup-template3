import { designTokens } from "@/lib/design-tokens";
import { vw } from "@/lib/fluid";

type Props = {
  width?: string;
  height?: string;
  strokeWidth?: number;
};

/** 시안 CTA 갈매기 — SVG only (문자 ›/`>` 글리프 크기·베이스라인 불일치) */
export function CtaChevron({ width, height, strokeWidth = 2.4 }: Props) {
  const { ctaChevronW: w, ctaChevronH: h } = designTokens.size;
  return (
    <svg
      width={width ?? vw(w)}
      height={height ?? vw(h)}
      viewBox="0 0 12 18"
      fill="none"
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M2.5 1.5l7 7.5-7 7.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
