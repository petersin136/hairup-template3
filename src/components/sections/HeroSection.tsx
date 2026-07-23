import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import type { HeroSection as HeroSectionData } from "@/types/content";

type Props = {
  data: HeroSectionData;
  leftImageUrl: string;
  rightImageUrl: string;
};

export function HeroSection({ data, leftImageUrl, rightImageUrl }: Props) {
  const { size, font, color } = designTokens;

  return (
    <section
      id="home"
      className="w-full"
      style={{
        paddingLeft: size.pageSidePadding,
        paddingRight: size.pageSidePadding,
        paddingTop: size.headerToHeroGap,
        paddingBottom: size.pageSidePadding,
      }}
    >
      <div
        className="relative grid w-full grid-cols-2 overflow-hidden"
        style={{
          height: size.heroHeight,
          borderRadius: size.heroRadius,
        }}
      >
        {/* Left: woman portrait + EN copy */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={leftImageUrl}
            alt=""
            fill
            priority
            unoptimized
            sizes="720px"
            className="object-cover object-[center_22%]"
          />
          <div
            className="absolute inset-x-0 bottom-0 z-10"
            style={{
              paddingLeft: size.heroTextPadX,
              paddingRight: size.heroTextPadX,
              paddingBottom: size.heroTextPadBottom,
            }}
          >
            <p
              className="uppercase text-white"
              style={{
                fontSize: font.heroEyebrow,
                fontWeight: 400,
                letterSpacing: "0.14em",
                lineHeight: 1.2,
                marginBottom: 18,
              }}
            >
              {data.left_eyebrow}
            </p>
            <h1
              className="text-white"
              style={{
                fontSize: font.heroTitle,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
              }}
            >
              {data.left_title_line1}
              <br />
              {data.left_title_line2}
            </h1>
          </div>
        </div>

        {/* Right: hands + KO copy */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={rightImageUrl}
            alt=""
            fill
            priority
            unoptimized
            sizes="720px"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-x-0 bottom-0 z-10 text-right"
            style={{
              paddingLeft: size.heroTextPadX,
              paddingRight: size.heroTextPadX,
              paddingBottom: size.heroTextPadBottom,
              color: color.white,
            }}
          >
            <h2
              style={{
                fontSize: font.heroRightHeadline,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
                marginBottom: 14,
              }}
            >
              {data.right_headline}
            </h2>
            <p
              style={{
                fontSize: font.heroRightBody,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.6,
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
