import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { AboutContent } from "@/types/content";

type Props = {
  data: AboutContent;
};

/** 시안: 숫자 Regular 48 · 기호(+/%) Light 34 */
function splitStatValue(value: string): { num: string; suffix: string } {
  const m = value.trim().match(/^([\d.]+)(.*)$/);
  if (!m) return { num: value, suffix: "" };
  return { num: m[1], suffix: m[2] };
}

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
      {/* Header block */}
      <div>
        <p
          className="uppercase"
          style={{
            color: color.aboutEyebrow,
            fontFamily: fontFamilies.logo,
            fontSize: fluidFont(font.aboutEyebrow),
            fontWeight: weight.aboutEyebrow,
            letterSpacing: "0.12em",
            lineHeight: 1.2,
            marginBottom: vw(size.aboutEyebrowToTitle),
          }}
        >
          {data.eyebrow}
        </p>
        <h2
          style={{
            color: color.aboutTitle,
            fontFamily: fontFamilies.logo,
            fontSize: fluidFont(font.aboutTitle),
            fontWeight: weight.aboutTitle,
            letterSpacing: "-0.025em",
            lineHeight: vw(size.aboutTitleLineHeight),
            marginBottom: vw(size.aboutTitleToSubtitle),
          }}
        >
          {data.titleLine1}
          <br />
          {data.titleLine2}
        </h2>
        <p
          style={{
            color: color.aboutTitle,
            fontSize: fluidFont(font.aboutSubtitle),
            fontWeight: weight.aboutSubtitle,
            letterSpacing: "-0.01em",
            lineHeight: 1.5,
          }}
        >
          {data.subtitle}
        </p>
      </div>

      {/* Stats — 4 columns · 숫자→32→라인→32→라벨→20→설명 */}
      <div
        className="flex w-full"
        style={{
          marginTop: vw(size.aboutStatsGapTop),
          marginBottom: vw(size.aboutStatsGapBottom),
        }}
      >
        {data.stats.map((stat, index) => {
          const { num, suffix } = splitStatValue(stat.value);
          const gapAfter =
            index === data.stats.length - 1
              ? 0
              : index === 0
                ? size.aboutStatsGapFirst
                : size.aboutStatsColGap;

          return (
            <div
              key={stat.id}
              style={{
                flex: 1,
                minWidth: 0,
                marginRight: gapAfter ? vw(gapAfter) : 0,
              }}
            >
              <p
                style={{
                  color: color.aboutTitle,
                  fontFamily: fontFamilies.logo,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: vw(size.aboutStatNumberToLine),
                }}
              >
                <span
                  style={{
                    fontSize: fluidFont(font.aboutStatValue),
                    fontWeight: weight.aboutStatValue,
                  }}
                >
                  {num}
                </span>
                {suffix ? (
                  <span
                    style={{
                      fontSize: fluidFont(font.aboutStatSuffix),
                      fontWeight: weight.aboutStatSuffix,
                    }}
                  >
                    {suffix}
                  </span>
                ) : null}
              </p>
              <div
                style={{
                  height: 1,
                  backgroundColor: color.aboutLine,
                  marginBottom: vw(size.aboutStatLineToLabel),
                }}
              />
              <p
                style={{
                  color: color.aboutTitle,
                  fontFamily: fontFamilies.logo,
                  fontSize: fluidFont(font.aboutStatLabel),
                  fontWeight: weight.aboutStatLabel,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginBottom: vw(size.aboutStatLabelToDesc),
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
                  lineHeight: vw(size.aboutStatDescLineHeight),
                  whiteSpace: "pre-line",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Text + images */}
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
            lineHeight: vw(size.aboutBodyLineHeight),
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
                  i === data.paragraphs.length - 1
                    ? 0
                    : vw(size.aboutParagraphGap),
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
