"use client";

import Image from "next/image";
import { useState } from "react";
import { CtaChevron } from "@/components/icons/CtaChevron";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, mw, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { NavigationItem } from "@/types/content";

type Props = {
  brandName: string;
  items: NavigationItem[];
  bookingUrl?: string | null;
  announcement?: {
    message: string;
    bgColor?: string;
    textColor?: string;
  } | null;
};

export function Header({
  brandName,
  items,
  bookingUrl,
  announcement,
}: Props) {
  const href = bookingUrl || "#reservation";
  const { size, font, color } = designTokens;
  const m = designTokens.mobile;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="site-header relative flex w-full items-center bg-white"
        style={{
          height: vw(size.headerHeight),
          paddingLeft: vw(size.pageSidePadding),
          paddingRight: vw(size.pageSidePadding),
        }}
      >
        <a
          href="#home"
          className="site-logo relative inline-flex shrink-0 items-center"
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
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center md:flex"
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
          className="cta-btn ml-auto hidden shrink-0 items-center justify-between transition-colors md:inline-flex"
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

        <button
          type="button"
          className="ml-auto flex items-center justify-center text-black md:hidden"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          style={{
            width: mw(m.menuIcon),
            height: mw(m.menuIcon),
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="butt"
            />
          </svg>
        </button>
      </header>

      <MobileNavDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        brandName={brandName}
        items={items}
        bookingUrl={href}
        announcement={announcement}
      />
    </>
  );
}
