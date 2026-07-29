"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { CtaChevron } from "@/components/icons/CtaChevron";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, mw, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { ServiceCategory } from "@/types/content";

type Props = {
  categories: ServiceCategory[];
  bookingUrl?: string | null;
};

/** 시안 슬라이더 갈매기 — 13×23 · 꼭지각≈85° · stroke 2.5 (문자 `<` `>` 금지) */
function SliderChevron({ dir }: { dir: "left" | "right" }) {
  const { servicesChevronW: w, servicesChevronH: h } = designTokens.size;
  return (
    <svg
      width={vw(w)}
      height={vw(h)}
      viewBox="0 0 14 23"
      fill="none"
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d={
          dir === "left"
            ? "M12.5 1.5L1.5 11.5l11 10"
            : "M1.5 1.5L12.5 11.5l-11 10"
        }
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

const NOTE = "※ 기장 및 디자이너에 따라 추가금이 발생할 수 있습니다";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function ServicesSection({ categories, bookingUrl }: Props) {
  const { size, font, weight, color } = designTokens;
  const m = designTokens.mobile;
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const count = categories.length;
  const active = categories[index] ?? categories[0];
  const atStart = index <= 0;
  const atEnd = index >= count - 1;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!count) return;
      setIndex((i) => {
        const next = i + dir;
        if (next < 0 || next >= count) return i;
        return next;
      });
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!active) return null;

  const href = active.ctaHref || bookingUrl || "#reservation";
  const ctaLabel = active.ctaLabel.replace(/\s*>\s*$/, "").trim();
  const badgeLabel = `${pad2(index + 1)} / ${pad2(count)}`;

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return;
    const x = e.changedTouches[0]?.clientX;
    if (x == null) return;
    const dx = x - touchX.current;
    touchX.current = null;
    if (dx < -40) go(1);
    else if (dx > 40) go(-1);
  };

  return (
    <section
      id="services"
      className="services-section w-full"
      style={{
        backgroundColor: color.servicesBg,
        paddingLeft: vw(size.servicesSidePadding),
        paddingRight: vw(size.servicesSidePadding),
        paddingTop: vw(size.servicesPadTop),
        paddingBottom: vw(size.servicesPadBottom),
        fontFamily: fontFamilies.sans,
      }}
    >
      {/* 데스크톱 — 좌 카피 / 우 이미지 */}
      <div
        className="mx-auto hidden items-stretch justify-between md:flex"
        style={{
          width: "100%",
          maxWidth: vw(
            size.servicesTextW + size.servicesGap + size.servicesImageW,
          ),
          columnGap: vw(size.servicesGap),
        }}
      >
        <div
          className="flex shrink-0 flex-col self-stretch"
          style={{
            width: vw(size.servicesTextW),
            minWidth: 0,
          }}
        >
          <p
            className="uppercase"
            style={{
              margin: 0,
              marginBottom: vw(size.servicesEyebrowToTitle),
              color: color.servicesEyebrow,
              fontFamily: fontFamilies.logo,
              fontSize: fluidFont(font.servicesEyebrow),
              fontWeight: weight.servicesEyebrow,
              letterSpacing: "0.08em",
              lineHeight: 1.2,
            }}
          >
            {active.eyebrow}
          </p>

          <h2
            style={{
              margin: 0,
              marginBottom: vw(size.servicesTitleToSubtitle),
              color: color.aboutTitle,
              fontFamily: fontFamilies.logo,
              fontSize: fluidFont(font.servicesTitle),
              fontWeight: weight.servicesTitle,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {active.title}
          </h2>

          <p
            style={{
              margin: 0,
              marginBottom: vw(size.servicesSubtitleToBody),
              color: color.aboutTitle,
              fontSize: fluidFont(font.servicesSubtitle),
              fontWeight: weight.servicesSubtitle,
              letterSpacing: "-0.01em",
              lineHeight: 1.45,
            }}
          >
            {active.subtitle}
          </p>

          <p
            style={{
              margin: 0,
              marginBottom: vw(size.servicesBodyToList),
              color: color.aboutTitle,
              fontSize: fluidFont(font.servicesBody),
              fontWeight: weight.servicesBody,
              letterSpacing: "-0.01em",
              lineHeight: vw(size.servicesBodyLineHeight),
            }}
          >
            {active.body}
          </p>

          <ul
            className="list-none"
            style={{
              margin: 0,
              padding: 0,
              display: "grid",
              gridTemplateColumns: `minmax(0, 1fr) ${vw(size.servicesPriceColW)}`,
              columnGap: vw(24),
              rowGap: vw(size.servicesListItemGap),
              width: "100%",
              maxWidth: vw(size.servicesListW),
            }}
          >
            {active.items.map((item) => (
              <li key={item.id} className="contents">
                <span
                  style={{
                    minWidth: 0,
                    color: color.aboutTitle,
                    fontSize: fluidFont(font.servicesItem),
                    fontWeight: weight.servicesItem,
                    letterSpacing: "-0.01em",
                    lineHeight: size.servicesListLineHeight,
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontFamily: fontFamilies.logo,
                    fontSize: fluidFont(font.servicesPrice),
                    fontWeight: weight.servicesPrice,
                    fontVariantNumeric: "tabular-nums",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    color: color.aboutTitle,
                    lineHeight: size.servicesListLineHeight,
                  }}
                >
                  {item.priceLabel}
                </span>
              </li>
            ))}
          </ul>

          <p
            style={{
              margin: 0,
              marginTop: vw(size.servicesListToNote),
              color: color.servicesNote,
              fontSize: fluidFont(font.servicesNote),
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            {NOTE}
          </p>

          <div
            style={{
              marginTop: "auto",
              paddingTop: vw(size.servicesNoteToCta),
            }}
          >
            <a
              href={href}
              className="cta-btn flex items-center transition-colors"
              style={{
                boxSizing: "border-box",
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: vw(size.servicesCtaW),
                height: vw(size.servicesCtaH),
                paddingLeft: vw(size.servicesCtaPadX),
                paddingRight: vw(size.servicesCtaPadX + 12),
                backgroundColor: color.ctaBg,
                color: color.servicesCtaText,
                fontFamily: fontFamilies.sans,
                fontSize: fluidFont(font.servicesCta),
                fontWeight: weight.servicesCta,
                letterSpacing: "-0.01em",
                lineHeight: 1,
                borderRadius: vw(size.servicesCtaRadius),
                textDecoration: "none",
              }}
            >
              <span style={{ lineHeight: 1, whiteSpace: "nowrap" }}>
                {ctaLabel}
              </span>
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  right: vw(size.servicesCtaPadX),
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CtaChevron />
              </span>
            </a>
          </div>
        </div>

        <div
          className="flex shrink-0 flex-col"
          style={{
            width: vw(size.servicesImageW),
          }}
        >
          <div
            className="ml-auto flex items-center"
            style={{
              marginBottom: vw(size.servicesNavToImage),
              height: vw(size.servicesNavH),
              columnGap: vw(size.servicesNavGap),
            }}
          >
            <button
              type="button"
              aria-label="이전 서비스"
              aria-disabled={atStart}
              disabled={atStart}
              onClick={() => go(-1)}
              style={{
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: vw(size.servicesChevronW),
                height: vw(size.servicesNavH),
                padding: 0,
                margin: 0,
                border: "none",
                background: "transparent",
                color: color.servicesNav,
                opacity: atStart ? 0.4 : 1,
                cursor: atStart ? "default" : "pointer",
              }}
            >
              <SliderChevron dir="left" />
            </button>

            <button
              type="button"
              aria-label="다음 서비스"
              aria-disabled={atEnd}
              disabled={atEnd}
              onClick={() => go(1)}
              style={{
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: vw(size.servicesChevronW),
                height: vw(size.servicesNavH),
                padding: 0,
                margin: 0,
                border: "none",
                background: "transparent",
                color: color.servicesNav,
                opacity: atEnd ? 0.4 : 1,
                cursor: atEnd ? "default" : "pointer",
              }}
            >
              <SliderChevron dir="right" />
            </button>
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              width: "100%",
              height: vw(size.servicesImageH),
              borderRadius: vw(size.servicesImageRadius),
              backgroundColor: "#000000",
            }}
          >
            {active.imageUrl ? (
              <Image
                key={active.id}
                src={active.imageUrl}
                alt={active.title}
                fill
                unoptimized
                sizes="40vw"
                className="object-cover object-center"
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* 모바일 — 세로 스택 · 스와이프 · 시안 11·12·13 */}
      <div className="flex w-full flex-col md:hidden">
        <p
          className="uppercase"
          style={{
            margin: 0,
            marginBottom: mw(m.servicesEyebrowToTitle),
            color: color.servicesEyebrow,
            fontFamily: fontFamilies.logo,
            fontSize: mw(m.servicesEyebrow),
            fontWeight: weight.servicesEyebrow,
            letterSpacing: "0.08em",
            lineHeight: 1.2,
          }}
        >
          {active.eyebrow}
        </p>

        <h2
          style={{
            margin: 0,
            marginBottom: mw(m.servicesTitleToSubtitle),
            color: "#111111",
            fontFamily: fontFamilies.logo,
            fontSize: mw(m.servicesTitle),
            fontWeight: weight.servicesTitle,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {active.title}
        </h2>

        {/* .service_desc — subtitle medium + body regular · 15 / LH 1.67 */}
        <div
          style={{
            marginBottom: mw(m.servicesBodyToImage),
            color: "#111111",
            fontFamily: fontFamilies.sans,
            fontSize: mw(m.servicesBody),
            lineHeight: m.servicesBodyLineHeight,
            letterSpacing: "-0.01em",
          }}
        >
          <p
            style={{
              margin: 0,
              marginBottom: mw(m.servicesSubtitleToBody),
              fontWeight: weight.servicesSubtitle,
            }}
          >
            {active.subtitle}
          </p>
          <p
            style={{
              margin: 0,
              fontWeight: weight.servicesBody,
              /* 1줄/2줄 전환 시 이미지 Y 고정 — 시안 2줄 높이 */
              minHeight: `calc(${mw(m.servicesBody)} * ${m.servicesBodyLineHeight} * 2)`,
            }}
          >
            {active.body}
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            width: "100%",
            height: mw(m.servicesImageH),
            borderRadius: mw(m.servicesImageRadius),
            backgroundColor: "#000000",
            marginBottom: mw(m.servicesImageToList),
            touchAction: "pan-y",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="img"
          aria-label={`${active.title}, ${badgeLabel}`}
        >
          {active.imageUrl ? (
            <Image
              key={`m-${active.id}`}
              src={active.imageUrl}
              alt={active.title}
              fill
              unoptimized
              sizes="100vw"
              className="pointer-events-none object-cover object-center"
              draggable={false}
            />
          ) : null}

          {/* .page_num — 57×24 · r12 · Poppins 12 */}
          <span
            aria-hidden
            className="inline-flex items-center justify-center"
            style={{
              position: "absolute",
              right: mw(m.servicesBadgePadR),
              bottom: mw(m.servicesBadgePadB),
              boxSizing: "border-box",
              width: mw(m.servicesBadgeW),
              height: mw(m.servicesBadgeH),
              borderRadius: mw(m.servicesBadgeRadius),
              backgroundColor: m.servicesBadgeBg,
              color: "#FFFFFF",
              fontFamily: fontFamilies.logo,
              fontSize: mw(m.servicesBadgeFont),
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {badgeLabel}
          </span>
        </div>

        <ul
          className="list-none"
          style={{
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            columnGap: mw(16),
            rowGap: mw(m.servicesListItemGap),
            width: "100%",
          }}
        >
          {active.items.map((item) => (
            <li key={`m-${item.id}`} className="contents">
              <span
                style={{
                  minWidth: 0,
                  color: "#111111",
                  fontFamily: fontFamilies.sans,
                  fontSize: mw(m.servicesItem),
                  fontWeight: weight.servicesItem,
                  letterSpacing: "-0.01em",
                  lineHeight: m.servicesItemLineHeight,
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: fontFamilies.logo,
                  fontSize: mw(m.servicesPrice),
                  fontWeight: weight.servicesPrice,
                  fontVariantNumeric: "tabular-nums",
                  textAlign: "right",
                  whiteSpace: "nowrap",
                  color: "#111111",
                  lineHeight: m.servicesItemLineHeight,
                }}
              >
                {item.priceLabel}
              </span>
            </li>
          ))}
        </ul>

        <p
          style={{
            margin: 0,
            marginTop: mw(m.servicesListToNote),
            marginBottom: mw(m.servicesNoteToCta),
            color: color.servicesNote,
            fontFamily: fontFamilies.sans,
            fontSize: mw(m.servicesNote),
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: 1.5,
          }}
        >
          {NOTE}
        </p>

        <a
          href={href}
          className="cta-btn relative flex w-full items-center justify-between transition-colors"
          style={{
            boxSizing: "border-box",
            width: "100%",
            height: mw(m.servicesCtaH),
            paddingLeft: mw(m.servicesCtaPadX),
            paddingRight: mw(m.servicesCtaPadX),
            backgroundColor: color.ctaBg,
            color: color.servicesCtaText,
            fontFamily: fontFamilies.sans,
            fontSize: mw(m.servicesCtaFont),
            fontWeight: weight.servicesCta,
            letterSpacing: "-0.01em",
            lineHeight: 1,
            borderRadius: mw(m.servicesCtaRadius),
            textDecoration: "none",
          }}
        >
          <span style={{ lineHeight: 1, whiteSpace: "nowrap" }}>{ctaLabel}</span>
          <CtaChevron
            width={mw(m.servicesCtaChevronW)}
            height={mw(m.servicesCtaChevronH)}
            strokeWidth={m.servicesCtaChevronStroke}
          />
        </a>
      </div>
    </section>
  );
}
