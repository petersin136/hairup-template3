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

  return (
    <header
      className="relative flex w-full items-center bg-white"
      style={{
        height: vw(designTokens.size.headerHeight),
        minHeight: 64,
        paddingLeft: vw(designTokens.size.pageSidePadding),
        paddingRight: vw(designTokens.size.pageSidePadding),
      }}
    >
      <a
        href="#home"
        className="shrink-0 uppercase"
        style={{
          color: designTokens.color.black,
          fontFamily: fontFamilies.logo,
          fontSize: fluidFont(designTokens.font.logo),
          fontWeight: designTokens.weight.logo,
          letterSpacing: designTokens.tracking.logo,
          lineHeight: 1,
        }}
      >
        {brandName}
      </a>

      <nav
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
        style={{ gap: vw(40) }}
      >
        {items.map((item) => {
          const active = item.is_active_state;
          return (
            <a
              key={item.id}
              href={item.href}
              className="uppercase transition-colors hover:text-[#151515]"
              style={{
                color: active
                  ? designTokens.color.black
                  : designTokens.color.navInactive,
                fontSize: fluidFont(designTokens.font.nav),
                fontWeight: active ? 600 : 400,
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
        className="cta-btn ml-auto inline-flex shrink-0 items-center justify-between text-white transition-colors"
        style={{
          boxSizing: "border-box",
          width: vw(designTokens.size.ctaWidth),
          height: vw(designTokens.size.ctaHeight),
          minWidth: 148,
          minHeight: 36,
          paddingLeft: vw(18),
          paddingRight: vw(14),
          backgroundColor: designTokens.color.ctaBg,
          color: designTokens.color.ctaText,
          fontFamily: fontFamilies.sans,
          fontSize: fluidFont(designTokens.font.cta),
          fontWeight: 500,
          letterSpacing: "-0.01em",
          borderRadius: designTokens.size.ctaRadius,
        }}
      >
        <span>실시간 예약하기</span>
        <span
          aria-hidden
          style={{
            fontSize: fluidFont(18),
            fontWeight: 400,
            lineHeight: 1,
            transform: "translateY(-1px)",
          }}
        >
          ›
        </span>
      </a>
    </header>
  );
}
