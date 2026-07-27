import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { HeroSection as HeroSectionData } from "@/types/content";

type Props = {
  data: HeroSectionData;
  leftImageUrl: string;
  rightImageUrl: string;
};

export function HeroSection({ data, leftImageUrl, rightImageUrl }: Props) {
  const { size, font, weight, color } = designTokens;

  return (
    <section
      id="home"
      className="w-full"
      style={{
        paddingLeft: vw(size.pageSidePadding),
        paddingRight: vw(size.pageSidePadding),
        paddingTop: size.headerToHeroGap,
        /* Hero→다음 섹션 간격은 아래 marginBottom (시안 160) */
        marginBottom: vw(size.heroToAboutGap),
        fontFamily: fontFamilies.display,
      }}
    >
      <div
        className="relative grid w-full grid-cols-2 overflow-hidden"
        style={{
          height: vw(size.heroHeight),
          borderRadius: vw(size.heroRadius),
        }}
      >
        {/* 좌 696×700 @1440 — (1440-48)/2 */}
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
    </section>
  );
}
