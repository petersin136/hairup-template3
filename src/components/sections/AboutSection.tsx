import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { fontFamilies } from "@/styles/fonts";
import type { AboutContent } from "@/types/content";

type Props = {
  data: AboutContent;
};

export function AboutSection({ data }: Props) {
  const pad = designTokens.size.aboutSidePadding;

  return (
    <section
      id="about"
      className="w-full bg-white"
      style={{
        paddingLeft: pad,
        paddingRight: pad,
        paddingTop: designTokens.size.aboutPadTop,
        paddingBottom: designTokens.size.aboutPadBottom,
        fontFamily: fontFamilies.sans,
      }}
    >
      {/* Header */}
      <div className="max-w-[720px]">
        <p
          className="uppercase"
          style={{
            color: designTokens.color.aboutEyebrow,
            fontSize: designTokens.font.aboutEyebrow,
            fontWeight: designTokens.weight.aboutEyebrow,
            letterSpacing: "0.16em",
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          {data.eyebrow}
        </p>
        <h2
          style={{
            color: designTokens.color.aboutTitle,
            fontSize: designTokens.font.aboutTitle,
            fontWeight: designTokens.weight.aboutTitle,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            marginBottom: 18,
          }}
        >
          {data.titleLine1}
          <br />
          {data.titleLine2}
        </h2>
        <p
          style={{
            color: designTokens.color.aboutBody,
            fontSize: designTokens.font.aboutSubtitle,
            fontWeight: designTokens.weight.aboutSubtitle,
            letterSpacing: "-0.01em",
            lineHeight: 1.5,
          }}
        >
          {data.subtitle}
        </p>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-4"
        style={{
          marginTop: designTokens.size.aboutStatsGapTop,
          marginBottom: designTokens.size.aboutStatsGapBottom,
          columnGap: designTokens.size.aboutStatsColGap,
        }}
      >
        {data.stats.map((stat) => (
          <div key={stat.id}>
            <p
              style={{
                color: designTokens.color.aboutTitle,
                fontSize: designTokens.font.aboutStatValue,
                fontWeight: designTokens.weight.aboutStatValue,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 14,
              }}
            >
              {stat.value}
            </p>
            <div
              style={{
                height: 2,
                backgroundColor: designTokens.color.aboutLine,
                marginBottom: 14,
              }}
            />
            <p
              style={{
                color: designTokens.color.aboutTitle,
                fontSize: designTokens.font.aboutStatLabel,
                fontWeight: designTokens.weight.aboutStatLabel,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
                marginBottom: 10,
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                color: designTokens.color.aboutMuted,
                fontSize: designTokens.font.aboutStatDesc,
                fontWeight: designTokens.weight.aboutStatDesc,
                letterSpacing: "-0.01em",
                lineHeight: 1.55,
                whiteSpace: "pre-line",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Content grid: text | gap | interior | gap | portrait */}
      <div className="flex items-start">
        <div
          style={{
            width: designTokens.size.aboutTextCol,
            minWidth: designTokens.size.aboutTextCol,
            marginRight: designTokens.size.aboutTextMediaGap,
            color: designTokens.color.aboutBody,
            fontSize: designTokens.font.aboutBody,
            fontWeight: designTokens.weight.aboutBody,
            letterSpacing: "-0.01em",
            lineHeight: 1.75,
            wordBreak: "keep-all",
            overflowWrap: "normal",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          {data.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                marginBottom: i === data.paragraphs.length - 1 ? 0 : 28,
              }}
            >
              {p.split("\n").map((line, j) => (
                <span key={j}>
                  {j > 0 ? <br /> : null}
                  <span style={{ whiteSpace: "nowrap" }}>{line}</span>
                </span>
              ))}
            </p>
          ))}
        </div>

        <div
          className="relative shrink-0 overflow-hidden"
          style={{
            width: designTokens.size.aboutInteriorW,
            height: designTokens.size.aboutInteriorH,
            borderRadius: designTokens.size.aboutImageRadius,
          }}
        >
          {data.interiorUrl ? (
            <Image
              src={data.interiorUrl}
              alt=""
              fill
              unoptimized
              sizes="586px"
              className="object-cover object-[center_45%]"
            />
          ) : null}
        </div>

        <div
          className="relative shrink-0 overflow-hidden"
          style={{
            width: designTokens.size.aboutPortraitW,
            height: designTokens.size.aboutPortraitH,
            borderRadius: designTokens.size.aboutImageRadius,
            marginLeft: designTokens.size.aboutMediaGap,
          }}
        >
          {data.portraitUrl ? (
            <Image
              src={data.portraitUrl}
              alt=""
              fill
              unoptimized
              sizes="276px"
              className="object-cover object-[center_18%]"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
