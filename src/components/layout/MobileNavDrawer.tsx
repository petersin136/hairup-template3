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
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {announcement ? (
        <div
          className="announcement-bar flex w-full shrink-0 items-center justify-center"
          style={{
            height: mw(m.announcementHeight),
            backgroundColor:
              announcement.bgColor || designTokens.color.announcementBg,
            color: announcement.textColor || designTokens.color.white,
            fontFamily: fontFamilies.sans,
            fontSize: mw(m.announcementFont),
            fontWeight: 400,
            lineHeight: m.announcementLineHeight,
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          <p className="announcement-bar__text m-0 text-center">
            {announcement.message}
          </p>
        </div>
      ) : null}

      {/* 헤더 — 로고 114×24 · 닫기 24×24 */}
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

        {/* 시안 .CLOSE — 24×24 · stroke 1.5 #111 */}
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={onClose}
          className="flex items-center justify-center"
          style={{
            width: mw(m.closeIcon),
            height: mw(m.closeIcon),
            padding: 0,
            border: "none",
            background: "transparent",
            color: "#111111",
            cursor: "pointer",
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
              d="M4 4l16 16M20 4L4 20"
              stroke="currentColor"
              strokeWidth={m.closeStroke}
              strokeLinecap="butt"
            />
          </svg>
        </button>
      </div>

      {/* 시안 .MENU — padTop 60 · gap 40 · Poppins 36 / LH 1.81 */}
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
                lineHeight: m.navLineHeight,
                color: active ? color.navActive : color.navInactive,
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* 시안 CTA — REVIEW→60 · 343×56 · r6 · padX 24 */}
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
          className="cta-btn inline-flex items-center justify-between transition-colors"
          style={{
            boxSizing: "border-box",
            width: mw(m.ctaWidth),
            height: mw(m.ctaHeight),
            paddingLeft: mw(m.ctaPadX),
            paddingRight: mw(m.ctaPadX),
            backgroundColor: color.ctaBg,
            color: color.ctaText,
            fontFamily: fontFamilies.sans,
            fontSize: mw(m.ctaFont),
            fontWeight: 400,
            letterSpacing: "-0.01em",
            borderRadius: mw(m.ctaRadius),
          }}
        >
          <span>실시간 예약하기</span>
          <MobileCtaChevron />
        </a>
      </div>
    </div>
  );
}

/** 시안 .옆_화살표 — 5×9 · stroke 2 #F4EEEE */
function MobileCtaChevron() {
  const m = designTokens.mobile;
  return (
    <svg
      width={mw(m.ctaChevronW)}
      height={mw(m.ctaChevronH)}
      viewBox={`0 0 ${m.ctaChevronW} ${m.ctaChevronH}`}
      fill="none"
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d={`M1 1l${m.ctaChevronW - 2} ${m.ctaChevronH / 2 - 1}L1 ${m.ctaChevronH - 1}`}
        stroke={m.ctaChevronColor}
        strokeWidth={m.ctaChevronStroke}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
