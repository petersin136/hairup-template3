import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";

/** 시안 07 — 예약 UI 미완성 플레이스홀더 (앵커·톤·높이만 확보) */
export function ReservationSection() {
  const { size, font, weight, color } = designTokens;

  return (
    <section
      id="reservation"
      aria-label="예약"
      className="flex w-full items-center justify-center"
      style={{
        minHeight: vw(size.reservationMinH),
        backgroundColor: color.reservationBg,
        fontFamily: fontFamilies.sans,
      }}
    >
      <p
        style={{
          color: color.reservationText,
          fontSize: fluidFont(font.reservationPlaceholder),
          fontWeight: weight.reservationPlaceholder,
          letterSpacing: "-0.01em",
          lineHeight: 1.4,
        }}
      >
        예약 파트 미완성
      </p>
    </section>
  );
}
