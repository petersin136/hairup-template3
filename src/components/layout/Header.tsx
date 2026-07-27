import Image from "next/image";
import { CtaChevron } from "@/components/icons/CtaChevron";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { NavigationItem } from "@/types/content";

type Props = {
  brandName: string;
  items: NavigationItem[];
  bookingUrl?: string | null;
};

export function Header({ brandName, items, bookingUrl }: Props) {
  const href = bookingUrl || "#reservation";
  const { size, font, color } = designTokens;

  return (
    <header
      className="relative flex w-full items-center bg-white"
      style={{
        height: vw(size.headerHeight),
        paddingLeft: vw(size.pageSidePadding),
        paddingRight: vw(size.pageSidePadding),
      }}
    >
      <a
        href="#home"
        className="relative inline-flex shrink-0 items-center"
        style={{
          width: vw(size.logoW),
          height: vw(size.logoH),
        }}
        aria-label={brandName}
      >
        <Image
          src="/images/hair-up-logo.png"
          alt={brandName}
          fill
          className="object-contain object-left"
          sizes={`${size.logoW}px`}
          priority
        />
      </a>

      <nav
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
        style={{ gap: vw(size.navGap) }}
      >
        {items.map((item) => {
          const active = item.is_active_state;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link uppercase ${active ? "is-active" : ""}`}
              style={{
                fontFamily: fontFamilies.logo,
                fontSize: fluidFont(font.nav),
                fontWeight: 400,
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <a
        href={href}
        className="cta-btn ml-auto inline-flex shrink-0 items-center justify-between transition-colors"
        style={{
          boxSizing: "border-box",
          width: vw(size.ctaWidth),
          height: vw(size.ctaHeight),
          paddingLeft: vw(size.ctaPadX),
          paddingRight: vw(size.ctaPadX),
          backgroundColor: color.ctaBg,
          color: color.ctaText,
          fontFamily: fontFamilies.sans,
          fontSize: fluidFont(font.cta),
          fontWeight: 400,
          letterSpacing: "-0.01em",
          borderRadius: size.ctaRadius,
        }}
      >
        <span>실시간 예약하기</span>
        <CtaChevron />
      </a>
    </header>
  );
}
