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
      <div className="flex w-full items-stretch justify-between">
        {/* Left copy */}
        <div
          className="flex shrink-0 flex-col"
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
              marginTop: vw(18),
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
              marginTop: vw(16),
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
              marginTop: vw(12),
              color: color.servicesMuted,
              fontSize: fluidFont(font.servicesBody),
              fontWeight: weight.servicesBody,
              letterSpacing: "-0.01em",
              lineHeight: 1.6,
            }}
          >
            {active.body}
          </p>

          <ul
            className="list-none"
            style={{
              margin: 0,
              marginTop: vw(36),
              padding: 0,
              display: "flex",
              flexDirection: "column",
              rowGap: vw(14),
            }}
          >
            {active.items.map((item) => (
              <li
                key={item.id}
                className="flex items-baseline justify-between"
                style={{
                  color: color.aboutTitle,
                  fontSize: fluidFont(font.servicesItem),
                  fontWeight: weight.servicesItem,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.4,
                  columnGap: vw(16),
                }}
              >
                <span>{item.name}</span>
                <span style={{ flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
                  {item.priceLabel}
                </span>
              </li>
            ))}
          </ul>

          <p
            style={{
              margin: 0,
              marginTop: vw(18),
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
            className="cta-btn mt-auto inline-flex items-center justify-between text-white transition-colors"
            style={{
              boxSizing: "border-box",
              marginTop: vw(40),
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
                fontSize: fluidFont(20),
                lineHeight: 1,
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
            className="flex items-center justify-between"
            style={{
              marginBottom: vw(10),
              height: vw(size.servicesNavSize),
            }}
          >
            <button
              type="button"
              aria-label="이전 서비스"
              onClick={() => go(-1)}
              className="flex items-center justify-center transition-opacity hover:opacity-60"
              style={{
                width: vw(size.servicesNavSize),
                height: vw(size.servicesNavSize),
                color: color.aboutTitle,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span style={{ width: vw(22), height: vw(22), display: "block" }}>
                <Chevron dir="left" />
              </span>
            </button>

            <button
              type="button"
              aria-label="다음 서비스"
              onClick={() => go(1)}
              className="flex items-center justify-center transition-opacity hover:opacity-60"
              style={{
                width: vw(size.servicesNavSize),
                height: vw(size.servicesNavSize),
                color: color.aboutTitle,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span style={{ width: vw(22), height: vw(22), display: "block" }}>
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
