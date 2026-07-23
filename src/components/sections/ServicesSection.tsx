"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { ServiceCategory } from "@/types/content";

type Props = {
  categories: ServiceCategory[];
  bookingUrl?: string | null;
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d={dir === "left" ? "M14.5 5.5L8.5 12l6 6.5" : "M9.5 5.5L15.5 12l-6 6.5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
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

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!count) return;
      setIndex((i) => (i + dir + count) % count);
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
        className="mx-auto flex items-stretch justify-center"
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
            minWidth: 280,
          }}
        >
          <p
            className="uppercase"
            style={{
              margin: 0,
              color: color.servicesEyebrow,
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
              marginTop: vw(size.servicesEyebrowToTitle),
              color: color.aboutTitle,
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
              marginTop: vw(size.servicesTitleToSubtitle),
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
              marginTop: vw(size.servicesSubtitleToBody),
              color: color.aboutTitle,
              fontSize: fluidFont(font.servicesBody),
              fontWeight: weight.servicesBody,
              letterSpacing: "-0.01em",
              lineHeight: 1.65,
            }}
          >
            {active.body}
          </p>

          <ul
            className="list-none"
            style={{
              margin: 0,
              marginTop: vw(size.servicesBodyToList),
              padding: 0,
              display: "grid",
              gridTemplateColumns: `minmax(0, 1fr) ${vw(size.servicesPriceColW)}`,
              columnGap: vw(24),
              rowGap: vw(size.servicesListItemGap),
              width: vw(size.servicesListW),
              maxWidth: "100%",
            }}
          >
            {active.items.map((item) => (
              <li
                key={item.id}
                className="contents"
                style={{
                  color: color.aboutTitle,
                  fontSize: fluidFont(font.servicesItem),
                  fontWeight: weight.servicesItem,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ minWidth: 0 }}>{item.name}</span>
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    textAlign: "right",
                    whiteSpace: "nowrap",
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
              lineHeight: 1.5,
            }}
          >
            {NOTE}
          </p>

          <a
            href={href}
            className="cta-btn inline-flex items-center justify-between text-white transition-colors"
            style={{
              boxSizing: "border-box",
              marginTop: "auto",
              width: vw(size.servicesCtaW),
              height: vw(size.servicesCtaH),
              minWidth: 240,
              minHeight: 44,
              paddingLeft: vw(22),
              paddingRight: vw(18),
              backgroundColor: color.ctaBg,
              color: color.ctaText,
              fontSize: fluidFont(font.servicesCta),
              fontWeight: weight.servicesCta,
              letterSpacing: "-0.01em",
              borderRadius: size.ctaRadius,
              textDecoration: "none",
            }}
          >
            <span>{active.ctaLabel}</span>
            <span
              aria-hidden
              style={{
                fontSize: fluidFont(32),
                lineHeight: 1,
                fontWeight: 400,
                transform: "translateY(-1px)",
              }}
            >
              ›
            </span>
          </a>
        </div>

        {/* Right: nav above image (outside) */}
        <div
          className="flex shrink-0 flex-col"
          style={{
            width: vw(size.servicesImageW),
            minWidth: 280,
          }}
        >
          <div
            className="ml-auto flex items-center"
            style={{
              marginBottom: vw(10),
              height: vw(size.servicesNavSize),
              columnGap: vw(6),
            }}
          >
            <button
              type="button"
              aria-label="이전 서비스"
              onClick={() => go(-1)}
              className="flex items-center justify-center transition-opacity hover:opacity-60"
              style={{
                width: vw(32),
                height: vw(size.servicesNavSize),
                color: color.aboutTitle,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span style={{ width: vw(20), height: vw(20), display: "block" }}>
                <Chevron dir="left" />
              </span>
            </button>

            <button
              type="button"
              aria-label="다음 서비스"
              onClick={() => go(1)}
              className="flex items-center justify-center transition-opacity hover:opacity-60"
              style={{
                width: vw(32),
                height: vw(size.servicesNavSize),
                color: color.aboutTitle,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span style={{ width: vw(20), height: vw(20), display: "block" }}>
                <Chevron dir="right" />
              </span>
            </button>
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              width: "100%",
              height: vw(size.servicesImageH),
              minHeight: 360,
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
