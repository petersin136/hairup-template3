import Image from "next/image";
import { ShowreelVideo } from "@/components/sections/ShowreelVideo";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { Review, ReviewsContent } from "@/types/content";

type Props = {
  data: ReviewsContent;
};

function ReviewCard({ review }: { review: Review }) {
  const { size, font, weight, color, tracking } = designTokens;
  const isDark = review.variant === "dark";
  const bodyColor = isDark ? color.reviewsDarkText : color.reviewsLightText;

  return (
    <article
      className="flex flex-col text-left"
      style={{
        width: vw(size.reviewsCardSize),
        height: vw(size.reviewsCardSize),
        backgroundColor: isDark ? color.reviewsDarkBg : color.reviewsLightBg,
        color: bodyColor,
        borderRadius: vw(size.reviewsCardRadius),
        padding: vw(size.reviewsCardPad),
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: fluidFont(font.reviewsQuote),
          fontWeight: weight.reviewsQuote,
          letterSpacing: tracking.reviewsQuote,
          lineHeight: vw(size.reviewsQuoteLineHeight),
          wordBreak: "keep-all",
          overflowWrap: "normal",
        }}
      >
        {review.quote.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 ? <br /> : null}
            <span style={{ whiteSpace: "nowrap" }}>{line}</span>
          </span>
        ))}
      </p>

      <div style={{ marginTop: "auto" }}>
        <p
          style={{
            margin: 0,
            fontSize: fluidFont(font.reviewsArtist),
            fontWeight: weight.reviewsArtist,
            letterSpacing: tracking.reviewsArtist,
            lineHeight: vw(size.reviewsSubLineHeight),
            color: bodyColor,
          }}
        >
          Artist. {review.artistName}
        </p>

        <p
          style={{
            margin: 0,
            fontSize: fluidFont(font.reviewsService),
            fontWeight: weight.reviewsService,
            letterSpacing: 0,
            textTransform: "uppercase",
            lineHeight: vw(size.reviewsSubLineHeight),
            color: color.reviewsService,
          }}
        >
          {review.serviceLabel}
        </p>

        <p
          style={{
            margin: 0,
            fontSize: fluidFont(font.reviewsMeta),
            fontWeight: weight.reviewsMeta,
            letterSpacing: 0,
            lineHeight: vw(size.reviewsSubLineHeight),
            color: color.reviewsMeta,
          }}
        >
          {review.handle} / {review.date}
        </p>
      </div>
    </article>
  );
}

export function ReviewsSection({ data }: Props) {
  const { size, font, weight, color } = designTokens;

  if (!data.items.length) return null;

  return (
    <>
      {/* 쇼릴 — 섹션 배경 흰색 · 미디어에 검정 프레임 없음 */}
      <div
        className="w-full"
        style={{
          backgroundColor: color.reviewsMediaBg,
          paddingTop: vw(size.reviewsMediaPadY),
          paddingBottom: vw(size.reviewsMediaPadY),
          paddingLeft: vw(size.reviewsImageSidePadding),
          paddingRight: vw(size.reviewsImageSidePadding),
        }}
        aria-hidden
      >
        <div
          className="relative mx-auto w-full overflow-hidden"
          style={{
            maxWidth: vw(1392),
            height: vw(size.reviewsImageH),
            borderRadius: vw(size.reviewsImageRadius),
          }}
        >
          {data.videoUrl ? (
            <ShowreelVideo src={data.videoUrl} playbackRate={0.7} />
          ) : (
            <Image
              src={data.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: color.reviewsMediaOverlay }}
          />
        </div>
      </div>

      <section
        id="review"
        className="w-full bg-white"
        style={{
          paddingBottom: vw(size.reviewsPadBottom),
          fontFamily: fontFamilies.sans,
        }}
      >
        <h2
          className="text-center"
          style={{
            margin: 0,
            marginBottom: vw(size.reviewsTitleToGrid),
            color: color.aboutTitle,
            fontFamily: fontFamilies.logo,
            fontSize: fluidFont(font.reviewsTitle),
            fontWeight: weight.reviewsTitle,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            paddingLeft: vw(size.reviewsSidePadding),
            paddingRight: vw(size.reviewsSidePadding),
          }}
        >
          {data.title}
        </h2>

        <div
          className="mx-auto grid justify-center"
          style={{
            width: "100%",
            boxSizing: "border-box",
            paddingLeft: vw(size.reviewsSidePadding),
            paddingRight: vw(size.reviewsSidePadding),
            gridTemplateColumns: `repeat(3, ${vw(size.reviewsCardSize)})`,
            gap: vw(size.reviewsGridGap),
          }}
        >
          {data.items.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </>
  );
}
