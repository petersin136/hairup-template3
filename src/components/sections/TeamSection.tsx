"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { TeamMember } from "@/types/content";

type Props = {
  members: TeamMember[];
};

function InstagramIcon({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{
        display: "block",
        flexShrink: 0,
        width: vw(size),
        height: vw(size),
      }}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.85" />
      <circle cx="17.5" cy="6.5" r="1.15" fill="currentColor" />
    </svg>
  );
}

/** 시안: 한글 Noto Regular · 영문 Poppins Medium */
function MemberName({ name }: { name: string }) {
  const { font, weight } = designTokens;
  const parts = name.trim().split(/\s+/);

  return (
    <p
      style={{
        margin: 0,
        fontSize: fluidFont(font.teamName),
        letterSpacing: "-0.01em",
        lineHeight: 1.15,
        whiteSpace: "nowrap",
      }}
    >
      {parts.map((part, i) => {
        const isKo = /[\uac00-\ud7af]/.test(part);
        return (
          <span
            key={`${part}-${i}`}
            style={{
              fontFamily: isKo
                ? 'var(--font-noto-sans-kr), "Noto Sans KR", sans-serif'
                : 'var(--font-poppins), sans-serif',
              fontWeight: isKo ? 400 : weight.teamName,
            }}
          >
            {i > 0 ? " " : ""}
            {part}
          </span>
        );
      })}
    </p>
  );
}

/** 시안: 좌단 0/10 · 중간 10 · 우단 10/0 */
function panelRadius(
  index: number,
  total: number,
  radius: number,
): CSSProperties {
  const r = vw(radius);
  if (total <= 1) return { borderRadius: r };
  if (index === 0) {
    return {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: r,
      borderBottomRightRadius: r,
    };
  }
  if (index === total - 1) {
    return {
      borderTopLeftRadius: r,
      borderBottomLeftRadius: r,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  }
  return { borderRadius: r };
}

export function TeamSection({ members }: Props) {
  const { size, font, weight, color, tracking } = designTokens;
  const initialId =
    members.find((m) => m.isFeatured)?.id ?? members[0]?.id ?? null;
  const [activeId, setActiveId] = useState<number | null>(initialId);

  if (!members.length) return null;

  return (
    <section
      id="artists"
      className="w-full bg-white"
      style={{
        // 좌우 여백은 section에 고정 — 카드 폭이 넘쳐도 우측이 잘리지 않음
        paddingLeft: vw(size.teamSidePadding),
        paddingRight: vw(size.teamSidePadding),
        paddingTop: vw(size.teamPadTop),
        paddingBottom: vw(size.teamPadBottom),
        fontFamily: fontFamilies.sans,
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: color.black,
          fontFamily: fontFamilies.logo,
          fontSize: fluidFont(font.teamTitle),
          fontWeight: weight.teamTitle,
          letterSpacing: tracking.teamTitle,
          lineHeight: 1.15,
          margin: 0,
          marginBottom: vw(size.teamTitleGap),
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        Professional Team
      </h2>

      <div
        className="flex w-full items-stretch"
        style={{
          height: vw(size.teamCollageH),
          columnGap: vw(size.teamGap),
        }}
        role="list"
      >
        {members.map((member, index) => {
          const isActive = member.id === activeId;
          const basis = isActive ? size.teamFeaturedW : size.teamStripW;

          return (
            <article
              key={member.id}
              role="listitem"
              className="relative cursor-pointer overflow-hidden"
              style={{
                // 폭만 애니메이션 — 이미지 스케일/줌 없음
                flex: `${basis} 1 0px`,
                minWidth: 0,
                height: "100%",
                ...panelRadius(index, members.length, size.teamRadius),
                transition: "flex 480ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={() => setActiveId(member.id)}
              onFocus={() => setActiveId(member.id)}
              onClick={() => setActiveId(member.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId(member.id);
                }
              }}
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`${member.name}, ${member.roleTitle}`}
            >
              {/*
                이미지는 항상 featured 폭으로 고정 → 패널이 옆으로 열릴 때만
                클리핑 창이 넓어짐 (아코디언). object-fit이 폭에 맞춰 줌인하지 않음.
              */}
              <div
                className="pointer-events-none absolute top-0 left-1/2 h-full"
                style={{
                  width: vw(size.teamFeaturedW),
                  transform: "translateX(-50%)",
                }}
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  unoptimized
                  sizes={`${Math.round((size.teamFeaturedW / 1440) * 100)}vw`}
                  className="object-cover"
                  style={{
                    objectFit: "cover",
                    objectPosition: member.objectPosition,
                    filter: isActive ? "none" : "grayscale(1)",
                    transition: "filter 420ms ease",
                  }}
                />
              </div>

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0"
                style={{
                  height: "42%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 320ms ease",
                }}
              />
              <div
                className="absolute"
                style={{
                  left: vw(size.teamOverlayPadX),
                  bottom: vw(size.teamOverlayPadY),
                  color: "#FFFFFF",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 320ms ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    margin: 0,
                    marginBottom: vw(size.teamRoleToName),
                    fontFamily: fontFamilies.logo,
                    fontSize: fluidFont(font.teamRole),
                    fontWeight: weight.teamRole,
                    letterSpacing: tracking.teamRole,
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {member.roleTitle}
                </p>
                <div
                  className="flex items-center"
                  style={{ columnGap: vw(10) }}
                >
                  <MemberName name={member.name} />
                  <a
                    href={member.instagramUrl ?? "https://www.instagram.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-opacity hover:opacity-70"
                    aria-label={`${member.name} Instagram`}
                    style={{ lineHeight: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <InstagramIcon size={size.teamInstagramSize} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
