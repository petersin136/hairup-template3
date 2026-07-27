"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CtaChevron } from "@/components/icons/CtaChevron";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
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

export function ServicesSection({ categories, bookingUrl }: Props) {
  const { size, font, weight, color } = designTokens;
  const [index, setIndex] = useState(0);

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

  return (
    <section
      id="services"
      className="w-full"
      style={{
        backgroundColor: color.servicesBg,
        paddingLeft: vw(size.servicesSidePadding),
        paddingRight: vw(size.servicesSidePadding),
        paddingTop: vw(size.servicesPadTop),
        paddingBottom: vw(size.servicesPadBottom),
        fontFamily: fontFamilies.sans,
      }}
    >
      <div
        className="mx-auto flex items-stretch justify-between"
        style={{
          width: "100%",
          maxWidth: vw(
            size.servicesTextW + size.servicesGap + size.servicesImageW,
          ),
          columnGap: vw(size.servicesGap),
        }}
      >
        {/* Left copy */}
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
              {/* 시안: 글자 좌 / 갈매기 우 — 우측 여백 24 고정 · SVG 7×12 */}
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

        {/* Right: nav above image — 시안: 화살표 간격 27 · 이미지와 32 · #444 / 40% */}
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
    </section>
  );
}
