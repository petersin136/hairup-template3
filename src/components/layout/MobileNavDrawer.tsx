"use client";

import Image from "next/image";
import { useEffect } from "react";
import { designTokens } from "@/lib/design-tokens";
import { mw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { NavigationItem } from "@/types/content";

type Props = {
  open: boolean;
  onClose: () => void;
  brandName: string;
  items: NavigationItem[];
  bookingUrl: string;
  announcement?: {
    message: string;
    bgColor?: string;
    textColor?: string;
  } | null;
};

export function MobileNavDrawer({
  open,
  onClose,
  brandName,
  items,
  bookingUrl,
  announcement,
}: Props) {
  const { color } = designTokens;
  const m = designTokens.mobile;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-white md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="메뉴"
    >
      {announcement ? (
        <div
          className="flex w-full shrink-0 items-center justify-center"
          style={{
            height: mw(m.announcementHeight),
            backgroundColor:
              announcement.bgColor ?? designTokens.color.announcementBg,
            color: announcement.textColor ?? designTokens.color.white,
            fontFamily: fontFamilies.sans,
            fontSize: mw(m.announcementFont),
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          <p
            className="text-center leading-none"
            style={{
              paddingLeft: mw(m.sidePadding),
              paddingRight: mw(m.sidePadding),
            }}
          >
            {announcement.message}
          </p>
        </div>
      ) : null}

      {/* 헤더 — 로고 + 닫기 */}
      <div
        className="flex shrink-0 items-center justify-between"
        style={{
          height: mw(m.headerHeight),
          paddingLeft: mw(m.sidePadding),
          paddingRight: mw(m.sidePadding),
        }}
      >
        <a
          href="#home"
          className="relative inline-flex shrink-0 items-center"
          style={{ width: mw(m.logoW), height: mw(m.logoH) }}
          aria-label={brandName}
          onClick={onClose}
        >
          <Image
            src="/images/hair-up-logo.png"
            alt={brandName}
            fill
            className="object-contain object-left"
            sizes={`${m.logoW}px`}
            priority
          />
        </a>

        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={onClose}
          className="flex items-center justify-center text-black"
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
              d="M5 5l14 14M19 5L5 19"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="butt"
            />
          </svg>
        </button>
      </div>

      <nav
        className="flex flex-col"
        style={{
          paddingLeft: mw(m.sidePadding),
          paddingRight: mw(m.sidePadding),
          paddingTop: mw(m.navPadTop),
          rowGap: mw(m.navGap),
        }}
      >
        {items.map((item) => {
          const active = item.is_active_state;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="uppercase"
              style={{
                fontFamily: fontFamilies.logo,
                fontSize: mw(m.navFont),
                fontWeight: 400,
                letterSpacing: "0.02em",
                lineHeight: 1,
                color: active ? color.navActive : color.navInactive,
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div
        style={{
          paddingLeft: mw(m.sidePadding),
          paddingRight: mw(m.sidePadding),
          paddingTop: mw(m.navToCta),
        }}
      >
        <a
          href={bookingUrl}
          onClick={onClose}
          className="cta-btn inline-flex w-full items-center justify-between transition-colors"
          style={{
            boxSizing: "border-box",
            height: mw(m.ctaHeight),
            paddingLeft: mw(m.ctaPadX),
            paddingRight: mw(m.ctaPadX),
            backgroundColor: color.ctaBg,
            color: color.ctaText,
            fontFamily: fontFamilies.sans,
            fontSize: mw(m.ctaFont),
            fontWeight: 400,
            letterSpacing: "-0.01em",
            borderRadius: m.ctaRadius,
          }}
        >
          <span>실시간 예약하기</span>
          <MobileCtaChevron />
        </a>
      </div>
    </div>
  );
}

function MobileCtaChevron() {
  const m = designTokens.mobile;
  return (
    <svg
      width={mw(m.ctaChevronW)}
      height={mw(m.ctaChevronH)}
      viewBox="0 0 12 18"
      fill="none"
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M2.5 1.5l7 7.5-7 7.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
