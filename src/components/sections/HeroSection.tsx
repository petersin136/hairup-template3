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
        paddingBottom: vw(size.pageSidePadding),
        fontFamily: fontFamilies.display,
      }}
    >
      <div
        className="relative grid w-full grid-cols-2 overflow-hidden"
        style={{
          height: vw(size.heroHeight),
          minHeight: 420,
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
            className="absolute inset-x-0 bottom-0 z-10"
            style={{
              paddingLeft: vw(size.heroTextPadX),
              paddingRight: vw(size.heroTextPadX),
              paddingBottom: vw(size.heroTextPadBottom),
            }}
          >
            <p
              className="uppercase text-white"
              style={{
                fontSize: fluidFont(font.heroEyebrow),
                fontWeight: weight.heroEyebrow,
                letterSpacing: "0.14em",
                lineHeight: 1.2,
                marginBottom: vw(18),
              }}
            >
              {data.left_eyebrow}
            </p>
            <h1
              className="text-white"
              style={{
                fontSize: fluidFont(font.heroTitle),
                fontWeight: weight.heroTitle,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
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
            className="absolute inset-x-0 bottom-0 z-10 text-right"
            style={{
              paddingLeft: vw(size.heroTextPadX),
              paddingRight: vw(size.heroTextPadX),
              paddingBottom: vw(size.heroTextPadBottom),
              color: color.white,
            }}
          >
            <h2
              style={{
                fontSize: fluidFont(font.heroRightHeadline),
                fontWeight: weight.heroRightHeadline,
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                marginBottom: vw(14),
              }}
            >
              {data.right_headline}
            </h2>
            <p
              style={{
                fontSize: fluidFont(font.heroRightBody),
                fontWeight: weight.heroRightBody,
                letterSpacing: "-0.01em",
                lineHeight: 1.65,
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
