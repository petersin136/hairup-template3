import Image from "next/image";
import { ShowreelVideo } from "@/components/sections/ShowreelVideo";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, mw, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { Review, ReviewsContent } from "@/types/content";

type Props = {
  data: ReviewsContent;
};

function ReviewCard({
  review,
  sizeCss,
  padCss,
  radiusCss,
  quoteSize,
  quoteLh,
  artistSize,
  serviceSize,
  metaSize,
  subLh,
  quoteGap,
}: {
  review: Review;
  sizeCss: string;
  padCss: string;
  radiusCss: string;
  quoteSize: string;
  quoteLh: string | number;
  artistSize: string;
  serviceSize: string;
  metaSize: string;
  subLh: string | number;
  quoteGap?: string;
}) {
  const { weight, color, tracking } = designTokens;
  const isDark = review.variant === "dark";
  const bodyColor = isDark ? color.reviewsDarkText : color.reviewsLightText;
  const serviceColor = isDark
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(60, 53, 48, 0.7)";
  const metaColor = isDark
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(60, 53, 48, 0.4)";

  return (
    <article
      className="flex shrink-0 flex-col text-left"
      style={{
        width: sizeCss,
        height: sizeCss,
        backgroundColor: isDark ? color.reviewsDarkBg : color.reviewsLightBg,
        color: bodyColor,
        borderRadius: radiusCss,
        padding: padCss,
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: quoteGap,
          fontFamily: fontFamilies.sans,
          fontSize: quoteSize,
          fontWeight: weight.reviewsQuote,
          letterSpacing: tracking.reviewsQuote,
          lineHeight: quoteLh,
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
            fontFamily: fontFamilies.sans,
            fontSize: artistSize,
            fontWeight: weight.reviewsArtist,
            letterSpacing: tracking.reviewsArtist,
            lineHeight: subLh,
            color: bodyColor,
          }}
        >
          Artist. {review.artistName}
        </p>

        <p
          style={{
            margin: 0,
            fontFamily: fontFamilies.sans,
            fontSize: serviceSize,
            fontWeight: weight.reviewsService,
            letterSpacing: 0,
            textTransform: "uppercase",
            lineHeight: subLh,
            color: serviceColor,
          }}
        >
          {review.serviceLabel}
        </p>

        <p
          style={{
            margin: 0,
            fontFamily: fontFamilies.sans,
            fontSize: metaSize,
            fontWeight: weight.reviewsMeta,
            letterSpacing: 0,
            lineHeight: subLh,
            color: metaColor,
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
  const m = designTokens.mobile;

  if (!data.items.length) return null;

  const titleLines = data.title.includes("\n")
    ? data.title.split("\n")
    : data.title.split(/\s+From\s+/i).length === 2
      ? [
          data.title.split(/\s+From\s+/i)[0]!,
          `From ${data.title.split(/\s+From\s+/i)[1]}`,
        ]
      : [data.title];

  const mobileCardPad = `${mw(m.reviewsCardPadY)} ${mw(m.reviewsCardPadX)}`;

  return (
    <>
      {/* 쇼릴 — 시안 .video_container */}
      <div
        className="reviews-media w-full"
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
          className="reviews-media__frame relative mx-auto w-full overflow-hidden"
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
        className="reviews-section w-full bg-white"
        style={{
          paddingBottom: vw(size.reviewsPadBottom),
          fontFamily: fontFamilies.sans,
        }}
      >
        {/* 데스크톱 타이틀 · 그리드 */}
        <h2
          className="reviews-title-desktop hidden text-center md:block"
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
          className="mx-auto hidden justify-center md:grid"
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
            <ReviewCard
              key={review.id}
              review={review}
              sizeCss={vw(size.reviewsCardSize)}
              padCss={vw(size.reviewsCardPad)}
              radiusCss={vw(size.reviewsCardRadius)}
              quoteSize={fluidFont(font.reviewsQuote)}
              quoteLh={vw(size.reviewsQuoteLineHeight)}
              artistSize={fluidFont(font.reviewsArtist)}
              serviceSize={fluidFont(font.reviewsService)}
              metaSize={fluidFont(font.reviewsMeta)}
              subLh={vw(size.reviewsSubLineHeight)}
            />
          ))}
        </div>

        {/* 모바일 — 시안 17 */}
        <h2
          className="reviews-title-mobile md:hidden"
          style={{
            margin: 0,
            marginBottom: mw(m.reviewsTitleToGrid),
            color: "#111111",
            fontFamily: fontFamilies.logo,
            fontSize: mw(m.reviewsTitle),
            fontWeight: weight.reviewsTitle,
            letterSpacing: "-0.02em",
            lineHeight: m.reviewsTitleLineHeight,
            paddingLeft: mw(m.reviewsSidePadding),
            paddingRight: mw(m.reviewsSidePadding),
            textAlign: "left",
          }}
        >
          {titleLines.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h2>

        <div
          className="reviews-gallery-scroll flex overflow-x-auto md:hidden"
          style={{
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: mw(m.reviewsSidePadding),
            scrollPaddingRight: mw(m.reviewsSidePadding),
            WebkitOverflowScrolling: "touch",
          }}
          role="list"
        >
          <div
            aria-hidden
            className="shrink-0"
            style={{ width: mw(m.reviewsSidePadding) }}
          />
          {data.items.map((review, i) => (
            <div
              key={`m-${review.id}`}
              role="listitem"
              className="shrink-0"
              style={{
                scrollSnapAlign: "start",
                marginRight:
                  i < data.items.length - 1 ? mw(m.reviewsCardGap) : 0,
              }}
            >
              <ReviewCard
                review={review}
                sizeCss={mw(m.reviewsCardSize)}
                padCss={mobileCardPad}
                radiusCss={mw(m.reviewsCardRadius)}
                quoteSize={mw(m.reviewsQuote)}
                quoteLh={m.reviewsQuoteLineHeight}
                artistSize={mw(m.reviewsArtist)}
                serviceSize={mw(m.reviewsService)}
                metaSize={mw(m.reviewsMeta)}
                subLh={m.reviewsSubLineHeight}
                quoteGap={mw(m.reviewsQuoteToMeta)}
              />
            </div>
          ))}
          <div
            aria-hidden
            className="shrink-0"
            style={{ width: mw(m.reviewsSidePadding) }}
          />
        </div>
      </section>
    </>
  );
}
