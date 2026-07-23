"use client";

import Image from "next/image";
import { useState } from "react";
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
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
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
        paddingLeft: vw(size.teamSidePadding),
        paddingRight: vw(size.teamSidePadding),
        paddingTop: vw(size.teamPadTop),
        paddingBottom: vw(size.teamPadBottom),
        fontFamily: fontFamilies.sans,
      }}
    >
      <h2
        style={{
          color: color.aboutTitle,
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
        {members.map((member) => {
          const isActive = member.id === activeId;

          return (
            <article
              key={member.id}
              role="listitem"
              className="relative min-w-0 cursor-pointer overflow-hidden"
              style={{
                flexGrow: isActive ? size.teamFeaturedW : size.teamStripW,
                flexShrink: 1,
                flexBasis: 0,
                height: "100%",
                borderRadius: vw(size.teamRadius),
                transition:
                  "flex-grow 480ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
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
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                unoptimized
                sizes={isActive ? "45vw" : "15vw"}
                className="object-cover"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: isActive ? "none" : "grayscale(1)",
                  transition: "filter 420ms ease",
                }}
              />

              {/* Overlay + copy — only when expanded */}
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
                    marginBottom: vw(8),
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
                  style={{ columnGap: vw(8) }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: fluidFont(font.teamName),
                      fontWeight: weight.teamName,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.15,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {member.name}
                  </p>
                  {member.instagramUrl ? (
                    <a
                      href={member.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white"
                      aria-label={`${member.name} Instagram`}
                      style={{ lineHeight: 0 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <InstagramIcon size={18} />
                    </a>
                  ) : (
                    <span className="text-white" style={{ lineHeight: 0 }}>
                      <InstagramIcon size={18} />
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
