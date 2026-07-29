"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, mw, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { TeamMember } from "@/types/content";

type Props = {
  members: TeamMember[];
};

function InstagramIcon({
  sizeCss,
}: {
  sizeCss: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{
        display: "block",
        flexShrink: 0,
        width: sizeCss,
        height: sizeCss,
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
function MemberName({
  name,
  fontSize,
}: {
  name: string;
  fontSize: string;
}) {
  const { weight } = designTokens;
  const parts = name.trim().split(/\s+/);

  return (
    <p
      style={{
        margin: 0,
        fontSize,
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

function MemberOverlay({
  member,
  padX,
  padY,
  roleToName,
  roleSize,
  nameSize,
  igSize,
  nameGap,
  visible,
}: {
  member: TeamMember;
  padX: string;
  padY: string;
  roleToName: string;
  roleSize: string;
  nameSize: string;
  igSize: string;
  nameGap: string;
  visible: boolean;
}) {
  const { weight, tracking } = designTokens;

  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "42%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 320ms ease",
        }}
      />
      <div
        className="absolute"
        style={{
          left: padX,
          bottom: padY,
          color: "#FFFFFF",
          opacity: visible ? 1 : 0,
          transition: "opacity 320ms ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <p
          className="uppercase"
          style={{
            margin: 0,
            marginBottom: roleToName,
            fontFamily: fontFamilies.logo,
            fontSize: roleSize,
            fontWeight: weight.teamRole,
            letterSpacing: tracking.teamRole,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            color: designTokens.mobile.teamRoleColor,
          }}
        >
          {member.roleTitle}
        </p>
        <div className="flex items-center" style={{ columnGap: nameGap }}>
          <MemberName name={member.name} fontSize={nameSize} />
          <a
            href={member.instagramUrl ?? "https://www.instagram.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-opacity hover:opacity-70"
            aria-label={`${member.name} Instagram`}
            style={{ lineHeight: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <InstagramIcon sizeCss={igSize} />
          </a>
        </div>
      </div>
    </>
  );
}

export function TeamSection({ members }: Props) {
  const { size, font, weight, color, tracking } = designTokens;
  const m = designTokens.mobile;
  const initialId =
    members.find((mem) => mem.isFeatured)?.id ?? members[0]?.id ?? null;
  const [activeId, setActiveId] = useState<number | null>(initialId);

  if (!members.length) return null;

  return (
    <section
      id="artists"
      className="team-section w-full bg-white"
      style={{
        paddingLeft: vw(size.teamSidePadding),
        paddingRight: vw(size.teamSidePadding),
        paddingTop: vw(size.teamPadTop),
        paddingBottom: vw(size.teamPadBottom),
        fontFamily: fontFamilies.sans,
        boxSizing: "border-box",
      }}
    >
      <h2
        className="team-title"
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

      {/* 데스크톱 — 아코디언 콜라주 */}
      <div
        className="hidden w-full items-stretch md:flex"
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

              <MemberOverlay
                member={member}
                padX={vw(size.teamOverlayPadX)}
                padY={vw(size.teamOverlayPadY)}
                roleToName={vw(size.teamRoleToName)}
                roleSize={fluidFont(font.teamRole)}
                nameSize={fluidFont(font.teamName)}
                igSize={vw(size.teamInstagramSize)}
                nameGap={vw(10)}
                visible={isActive}
              />
            </article>
          );
        })}
      </div>

      {/* 모바일 — 가로 스크롤 카드 (리뷰 갤러리와 동일 패턴) */}
      <div
        className="team-gallery-scroll flex overflow-x-auto md:hidden"
        style={{
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: mw(m.teamSidePadding),
          scrollPaddingRight: mw(m.teamSidePadding),
          WebkitOverflowScrolling: "touch",
        }}
        role="list"
      >
        {/* overflow 스크롤에서 padding이 무시되는 경우 대비 — 좌우 스페이서 */}
        <div
          aria-hidden
          className="shrink-0"
          style={{ width: mw(m.teamSidePadding) }}
        />
        {members.map((member, i) => (
          <div
            key={`m-${member.id}`}
            role="listitem"
            className="shrink-0"
            style={{
              scrollSnapAlign: "start",
              marginRight: i < members.length - 1 ? mw(m.teamCardGap) : 0,
            }}
          >
            <article
              className="relative overflow-hidden"
              style={{
                width: mw(m.teamCardW),
                height: mw(m.teamCardH),
                borderRadius: mw(m.teamRadius),
              }}
              aria-label={`${member.name}, ${member.roleTitle}`}
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                unoptimized
                sizes="85vw"
                className="object-cover"
                style={{
                  objectFit: "cover",
                  objectPosition: member.objectPosition,
                }}
              />

              <MemberOverlay
                member={member}
                padX={mw(m.teamOverlayPadX)}
                padY={mw(m.teamOverlayPadY)}
                roleToName={mw(m.teamRoleToName)}
                roleSize={mw(m.teamRole)}
                nameSize={mw(m.teamName)}
                igSize={mw(m.teamInstagramSize)}
                nameGap={mw(m.teamNameToIg)}
                visible
              />
            </article>
          </div>
        ))}
        <div
          aria-hidden
          className="shrink-0"
          style={{ width: mw(m.teamSidePadding) }}
        />
      </div>
    </section>
  );
}
