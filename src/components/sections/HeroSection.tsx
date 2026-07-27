import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, mw, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { HeroSection as HeroSectionData } from "@/types/content";

type Props = {
  data: HeroSectionData;
  leftImageUrl: string;
  rightImageUrl: string;
};

export function HeroSection({ data, leftImageUrl, rightImageUrl }: Props) {
  const { size, font, weight, color } = designTokens;
  const m = designTokens.mobile;

  return (
    <section
      id="home"
      className="hero-section w-full"
      style={{
        paddingLeft: vw(size.pageSidePadding),
        paddingRight: vw(size.pageSidePadding),
        paddingTop: size.headerToHeroGap,
        marginBottom: vw(size.heroToAboutGap),
        fontFamily: fontFamilies.display,
      }}
    >
      {/* 데스크톱 — 좌우 2열 */}
      <div
        className="hero-desktop relative hidden w-full grid-cols-2 overflow-hidden md:grid"
        style={{
          height: vw(size.heroHeight),
          borderRadius: vw(size.heroRadius),
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={leftImageUrl}
            alt=""
            fill
            priority
            unoptimized
            sizes="50vw"
            className="object-cover object-[center_22%]"
          />
          <div
            className="absolute bottom-0 left-0 z-10"
            style={{
              paddingLeft: vw(size.heroLeftPadX),
              paddingBottom: vw(size.heroLeftPadBottom),
            }}
          >
            <p
              className="uppercase text-white"
              style={{
                fontFamily: fontFamilies.logo,
                fontSize: fluidFont(font.heroEyebrow),
                fontWeight: weight.heroEyebrow,
                letterSpacing: "0.14em",
                lineHeight: 1.2,
                marginBottom: vw(size.heroEyebrowToTitle),
              }}
            >
              {data.left_eyebrow}
            </p>
            <h1
              className="text-white"
              style={{
                fontFamily: fontFamilies.logo,
                fontSize: fluidFont(font.heroTitle),
                fontWeight: weight.heroTitle,
                letterSpacing: "-0.02em",
                lineHeight: vw(size.heroTitleLineHeight),
              }}
            >
              {data.left_title_line1}
              <br />
              {data.left_title_line2}
            </h1>
          </div>
        </div>

        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={rightImageUrl}
            alt=""
            fill
            priority
            unoptimized
            sizes="50vw"
            className="object-cover object-center"
          />
          <div
            className="absolute bottom-0 right-0 z-10 text-right"
            style={{
              paddingRight: vw(size.heroRightPadX),
              paddingBottom: vw(size.heroRightPadBottom),
              color: color.white,
              fontFamily: fontFamilies.sans,
            }}
          >
            <h2
              style={{
                fontSize: fluidFont(font.heroRightHeadline),
                fontWeight: weight.heroRightHeadline,
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                marginBottom: vw(size.heroRightTitleToBody),
              }}
            >
              {data.right_headline}
            </h2>
            <p
              style={{
                fontSize: fluidFont(font.heroRightBody),
                fontWeight: weight.heroRightBody,
                letterSpacing: "-0.01em",
                lineHeight: vw(size.heroRightBodyLineHeight),
              }}
            >
              {data.right_body_line1}
              <br />
              {data.right_body_line2}
            </p>
          </div>
        </div>
      </div>

      {/* 모바일 — 상하 스택 · 시안 HUM_01-1_HERO */}
      <div
        className="hero-mobile flex w-full flex-col md:hidden"
        style={{
          rowGap: mw(m.heroCardGap),
        }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: mw(m.heroCardH),
            borderTopLeftRadius: mw(m.heroCardRadius),
            borderTopRightRadius: mw(m.heroCardRadius),
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Image
            src={leftImageUrl}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[center_22%]"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: "45%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 z-10"
            style={{
              paddingLeft: mw(m.heroPadX),
              paddingBottom: mw(m.heroPadBottom),
            }}
          >
            <p
              className="uppercase text-white"
              style={{
                fontFamily: fontFamilies.logo,
                fontSize: mw(m.heroEyebrow),
                fontWeight: weight.heroEyebrow,
                letterSpacing: "0.12em",
                lineHeight: 1.2,
                marginBottom: mw(m.heroEyebrowToTitle),
              }}
            >
              {data.left_eyebrow}
            </p>
            <h1
              className="text-white"
              style={{
                fontFamily: fontFamilies.logo,
                fontSize: mw(m.heroTitle),
                fontWeight: weight.heroTitle,
                letterSpacing: "-0.02em",
                lineHeight: mw(m.heroTitleLineHeight),
              }}
            >
              {data.left_title_line1}
              <br />
              {data.left_title_line2}
            </h1>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            height: mw(m.heroCardH),
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: mw(m.heroCardRadius),
            borderBottomRightRadius: mw(m.heroCardRadius),
          }}
        >
          <Image
            src={rightImageUrl}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 z-10 text-left"
            style={{
              paddingLeft: mw(m.heroPadX),
              paddingRight: mw(m.heroPadX),
              paddingBottom: mw(m.heroPadBottom),
              color: color.white,
              fontFamily: fontFamilies.sans,
            }}
          >
            <h2
              style={{
                fontSize: mw(m.heroRightHeadline),
                fontWeight: weight.heroRightHeadline,
                letterSpacing: "-0.01em",
                lineHeight: 1.35,
                marginBottom: mw(m.heroRightTitleToBody),
              }}
            >
              {data.right_headline}
            </h2>
            <p
              style={{
                fontSize: mw(m.heroRightBody),
                fontWeight: weight.heroRightBody,
                letterSpacing: "-0.01em",
                lineHeight: mw(m.heroRightBodyLineHeight),
                wordBreak: "keep-all",
              }}
            >
              {data.right_body_line1}
              <br />
              {data.right_body_line2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
