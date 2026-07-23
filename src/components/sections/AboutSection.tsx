import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { AboutContent } from "@/types/content";

type Props = {
  data: AboutContent;
};

export function AboutSection({ data }: Props) {
  const { size, font, weight, color } = designTokens;

  return (
    <section
      id="about"
      className="w-full bg-white"
      style={{
        paddingLeft: vw(size.aboutSidePadding),
        paddingRight: vw(size.aboutSidePadding),
        paddingTop: vw(size.aboutPadTop),
        paddingBottom: vw(size.aboutPadBottom),
        fontFamily: fontFamilies.sans,
      }}
    >
      <div style={{ maxWidth: vw(720) }}>
        <p
          className="uppercase"
          style={{
            color: color.aboutEyebrow,
            fontSize: fluidFont(font.aboutEyebrow),
            fontWeight: weight.aboutEyebrow,
            letterSpacing: "0.16em",
            lineHeight: 1.2,
            marginBottom: vw(20),
          }}
        >
          {data.eyebrow}
        </p>
        <h2
          style={{
            color: color.aboutTitle,
            fontSize: fluidFont(font.aboutTitle),
            fontWeight: weight.aboutTitle,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            marginBottom: vw(18),
          }}
        >
          {data.titleLine1}
          <br />
          {data.titleLine2}
        </h2>
        <p
          style={{
            color: color.aboutBody,
            fontSize: fluidFont(font.aboutSubtitle),
            fontWeight: weight.aboutSubtitle,
            letterSpacing: "-0.01em",
            lineHeight: 1.5,
          }}
        >
          {data.subtitle}
        </p>
      </div>

      <div
        className="grid grid-cols-4"
        style={{
          marginTop: vw(size.aboutStatsGapTop),
          marginBottom: vw(size.aboutStatsGapBottom),
          columnGap: vw(size.aboutStatsColGap),
        }}
      >
        {data.stats.map((stat) => (
          <div key={stat.id}>
            <p
              style={{
                color: color.aboutTitle,
                fontSize: fluidFont(font.aboutStatValue),
                fontWeight: weight.aboutStatValue,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: vw(14),
              }}
            >
              {stat.value}
            </p>
            <div
              style={{
                height: 2,
                backgroundColor: color.aboutLine,
                marginBottom: vw(14),
              }}
            />
            <p
              style={{
                color: color.aboutTitle,
                fontSize: fluidFont(font.aboutStatLabel),
                fontWeight: weight.aboutStatLabel,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
                marginBottom: vw(10),
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                color: color.aboutMuted,
                fontSize: fluidFont(font.aboutStatDesc),
                fontWeight: weight.aboutStatDesc,
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

      <div className="flex w-full items-start">
        <div
          style={{
            width: vw(size.aboutTextCol),
            flexShrink: 0,
            marginRight: vw(size.aboutTextMediaGap),
            color: color.aboutBody,
            fontSize: fluidFont(font.aboutBody),
            fontWeight: weight.aboutBody,
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
                marginBottom:
                  i === data.paragraphs.length - 1 ? 0 : vw(28),
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
            width: vw(size.aboutInteriorW),
            height: vw(size.aboutInteriorH),
            borderRadius: vw(size.aboutImageRadius),
          }}
        >
          {data.interiorUrl ? (
            <Image
              src={data.interiorUrl}
              alt=""
              fill
              unoptimized
              sizes="45vw"
              className="object-cover object-center"
            />
          ) : null}
        </div>

        <div
          className="relative shrink-0 overflow-hidden"
          style={{
            width: vw(size.aboutPortraitW),
            height: vw(size.aboutPortraitH),
            borderRadius: vw(size.aboutImageRadius),
            marginLeft: vw(size.aboutMediaGap),
          }}
        >
          {data.portraitUrl ? (
            <Image
              src={data.portraitUrl}
              alt=""
              fill
              unoptimized
              sizes="20vw"
              className="object-cover object-[center_18%]"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
