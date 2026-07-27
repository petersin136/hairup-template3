"use client";

import { useEffect, useRef, type Ref } from "react";
import { designTokens } from "@/lib/design-tokens";
import { vw } from "@/lib/fluid";
import type { BrandLogo } from "@/types/content";

type Props = {
  logos: BrandLogo[];
};

/** 시안 광학 맞춤 — SVG 여백·PARIS 줄 때문에 브랜드마다 잉크 비율이 다름 */
function logoScale(name: string): number {
  const key = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "") as keyof typeof designTokens.brandLogoScale;

  return designTokens.brandLogoScale[key] ?? 1;
}

function LogoTrack({
  logos,
  trackRef,
  ariaHidden,
}: {
  logos: BrandLogo[];
  trackRef?: Ref<HTMLUListElement>;
  ariaHidden?: boolean;
}) {
  const { size } = designTokens;
  const baseH = size.brandLogoHeight;

  return (
    <ul
      ref={trackRef}
      className="brand-marquee__track m-0 flex shrink-0 list-none items-center p-0"
      aria-hidden={ariaHidden || undefined}
      style={{
        columnGap: vw(size.brandLogoGap),
        paddingRight: vw(size.brandLogoGap),
      }}
    >
      {logos.map((logo) => {
        const heightPx = baseH * logoScale(logo.name);
        return (
          <li
            key={`${ariaHidden ? "b" : "a"}-${logo.id}`}
            className="flex shrink-0 list-none items-center justify-center"
            style={{ height: vw(heightPx) }}
          >
            {/* SVG: native img keeps vectors crisp (next/image rasterizes) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.imageUrl}
              alt={ariaHidden ? "" : logo.name}
              className="block h-full w-auto object-contain object-center"
              draggable={false}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function BrandTickerSection({ logos }: Props) {
  const { color, size } = designTokens;
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track || !logos.length) return;

    const sync = () => {
      const w = track.getBoundingClientRect().width;
      if (w > 0) rail.style.setProperty("--marquee-shift", `${w}px`);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(track);

    const imgs = [...track.querySelectorAll("img")];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", sync);
    });

    return () => {
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", sync));
    };
  }, [logos]);

  if (!logos.length) return null;

  return (
    <section
      className="brand-marquee w-full overflow-hidden"
      aria-label="Brand partners"
      style={{
        backgroundColor: color.brandTickerBg,
        height: vw(size.brandTickerHeight),
      }}
    >
      <div className="brand-marquee__viewport flex h-full items-center">
        <div ref={railRef} className="brand-marquee__rail flex w-max items-center">
          <LogoTrack logos={logos} trackRef={trackRef} />
          <LogoTrack logos={logos} ariaHidden />
        </div>
      </div>
    </section>
  );
}
