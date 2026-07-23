import { designTokens } from "@/lib/design-tokens";
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
        height: designTokens.size.headerHeight,
        paddingLeft: designTokens.size.pageSidePadding,
        paddingRight: designTokens.size.pageSidePadding,
      }}
    >
      <a
        href="#home"
        className="shrink-0 font-semibold uppercase tracking-[0.08em]"
        style={{
          color: designTokens.color.black,
          fontSize: designTokens.font.logo,
          lineHeight: 1,
        }}
      >
        {brandName}
      </a>

      <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-10">
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
                fontSize: designTokens.font.nav,
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
        className="cta-btn ml-auto inline-flex shrink-0 items-center justify-center gap-2 text-white transition-colors"
        style={{
          width: designTokens.size.ctaWidth,
          height: designTokens.size.ctaHeight,
          backgroundColor: designTokens.color.ctaBg,
          fontSize: designTokens.font.cta,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          borderRadius: designTokens.size.ctaRadius,
        }}
      >
        <span>실시간 예약하기</span>
        <span aria-hidden className="text-[12px] leading-none">
          ›
        </span>
      </a>
    </header>
  );
}
