import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { Review, ReviewsContent } from "@/types/content";

type Props = {
  data: ReviewsContent;
};

function ReviewCard({ review }: { review: Review }) {
  const { size, font, weight, color } = designTokens;
  const isDark = review.variant === "dark";
  const bodyColor = isDark ? color.white : color.aboutTitle;

  return (
    <article
      className="flex flex-col text-left"
      style={{
        aspectRatio: "1 / 1",
        backgroundColor: isDark ? color.reviewsDarkBg : color.reviewsLightBg,
        color: bodyColor,
        borderRadius: vw(size.reviewsCardRadius),
        paddingLeft: vw(size.reviewsCardPadX),
        paddingRight: vw(size.reviewsCardPadX),
        paddingTop: vw(size.reviewsCardPadY),
        paddingBottom: vw(size.reviewsCardPadY),
      }}
    >
      <p
        style={{
          fontSize: fluidFont(font.reviewsQuote),
          fontWeight: weight.reviewsQuote,
          lineHeight: 1.65,
        }}
      >
        “{review.quote}”
      </p>

      <div style={{ marginTop: "auto" }}>
        <p
          style={{
            fontSize: fluidFont(font.reviewsArtist),
            fontWeight: weight.reviewsArtist,
            lineHeight: 1.35,
            marginBottom: vw(size.reviewsArtistToService),
          }}
        >
          Artist. {review.artistName}
        </p>

        <p
          style={{
            fontSize: fluidFont(font.reviewsService),
            fontWeight: weight.reviewsService,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.35,
            marginBottom: vw(size.reviewsServiceToMeta),
          }}
        >
          {review.serviceLabel}
        </p>

        <p
          style={{
            fontSize: fluidFont(font.reviewsMeta),
            fontWeight: weight.reviewsMeta,
            color: isDark ? color.reviewsMetaDark : color.reviewsMetaLight,
            lineHeight: 1.35,
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
    <section
      id="review"
      className="w-full bg-white"
      style={{
        paddingTop: vw(size.reviewsPadTop),
        paddingBottom: vw(size.reviewsPadBottom),
        fontFamily: fontFamilies.sans,
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          paddingLeft: vw(size.reviewsImageSidePadding),
          paddingRight: vw(size.reviewsImageSidePadding),
          marginBottom: vw(size.reviewsImageToTitle),
        }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: vw(size.reviewsImageH),
            borderRadius: vw(size.reviewsImageRadius),
          }}
        >
          <Image
            src={data.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
      </div>

      <h2
        className="text-center"
        style={{
          color: color.aboutTitle,
          fontSize: fluidFont(font.reviewsTitle),
          fontWeight: weight.reviewsTitle,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginBottom: vw(size.reviewsTitleToGrid),
          paddingLeft: vw(size.reviewsSidePadding),
          paddingRight: vw(size.reviewsSidePadding),
        }}
      >
        {data.title}
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          gap: vw(size.reviewsGridGap),
          paddingLeft: vw(size.reviewsSidePadding),
          paddingRight: vw(size.reviewsSidePadding),
        }}
      >
        {data.items.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
