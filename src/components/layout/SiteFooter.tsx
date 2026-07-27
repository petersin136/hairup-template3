import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { FooterContent } from "@/types/content";

type Props = {
  data: FooterContent;
};

export function SiteFooter({ data }: Props) {
  const { size, font, weight, color, tracking } = designTokens;

  const headingStyle = {
    margin: 0,
    color: color.footerText,
    fontFamily: fontFamilies.logo,
    fontSize: fluidFont(font.footerHeading),
    fontWeight: weight.footerHeading,
    lineHeight: 1.2,
  } as const;

  const bodyEnStyle = {
    margin: 0,
    color: color.footerText,
    fontFamily: fontFamilies.logo,
    fontSize: fluidFont(font.footerBodyEn),
    fontWeight: weight.footerBody,
    lineHeight: 1.4,
  } as const;

  const bodyKoStyle = {
    margin: 0,
    color: color.footerText,
    fontFamily: fontFamilies.sans,
    fontSize: fluidFont(font.footerBodyKo),
    fontWeight: weight.footerBody,
    lineHeight: 1.5,
  } as const;

  return (
    <footer
      className="relative w-full"
      style={{
        boxSizing: "border-box",
        minHeight: vw(size.footerH),
        backgroundColor: color.footerBg,
        color: color.footerText,
        paddingLeft: vw(size.footerSidePadding),
        paddingRight: vw(size.footerSidePadding),
        paddingTop: vw(size.footerPadTop),
        paddingBottom: vw(size.footerPadBottom),
        fontFamily: fontFamilies.sans,
        zIndex: 0,
      }}
    >
      {/* 상단: 로고 + Opening Hours + Contact + Follow Us */}
      <div
        className="flex w-full items-start"
        style={{
          marginBottom: vw(size.footerMainToDivider),
        }}
      >
        {/* Logo — 시안 175×37 */}
        <a
          href="#home"
          className="relative inline-flex shrink-0 items-center"
          style={{
            width: vw(size.footerLogoW),
            height: vw(size.footerLogoH),
            marginRight: vw(size.footerLogoToHours),
          }}
          aria-label={data.brandName}
        >
          <Image
            src="/images/hair-up-logo-white.png"
            alt={data.brandName}
            fill
            className="object-contain object-left"
            sizes={`${size.footerLogoW}px`}
          />
        </a>

        {/* Opening Hours */}
        <div
          className="shrink-0"
          style={{ marginRight: vw(size.footerColGap) }}
        >
          <h3
            style={{
              ...headingStyle,
              marginBottom: vw(size.footerHoursTitleGap),
            }}
          >
            Opening Hours
          </h3>
          <ul
            className="list-none"
            style={{
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: vw(size.footerHoursBlockGap),
            }}
          >
            {data.hours.map((row) => (
              <li key={row.days}>
                <p
                  style={{
                    ...bodyEnStyle,
                    marginBottom: vw(size.footerHoursDayToTime),
                  }}
                >
                  {row.days}
                </p>
                <p style={bodyEnStyle}>{row.time}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Address / Phone / E-mail */}
        <div
          className="flex shrink-0 flex-col"
          style={{ marginRight: vw(size.footerColGap) }}
        >
          <div style={{ marginBottom: vw(size.footerContactBlockGap) }}>
            <h3
              style={{
                ...headingStyle,
                marginBottom: vw(size.footerContactTitleGap),
              }}
            >
              Address
            </h3>
            <p style={bodyKoStyle}>{data.address}</p>
          </div>

          <div style={{ marginBottom: vw(size.footerContactBlockGap) }}>
            <h3
              style={{
                ...headingStyle,
                marginBottom: vw(size.footerContactTitleGap),
              }}
            >
              Phone Number
            </h3>
            <a
              href={`tel:${data.phone.replace(/\s/g, "")}`}
              style={{ ...bodyEnStyle, textDecoration: "none" }}
            >
              {data.phone}
            </a>
          </div>

          <div>
            <h3
              style={{
                ...headingStyle,
                marginBottom: vw(size.footerContactTitleGap),
              }}
            >
              E-mail
            </h3>
            <a
              href={`mailto:${data.email}`}
              style={{ ...bodyEnStyle, textDecoration: "none" }}
            >
              {data.email}
            </a>
          </div>
        </div>

        {/* Follow Us */}
        <div className="shrink-0">
          <h3
            style={{
              ...headingStyle,
              marginBottom: vw(size.footerSocialTitleGap),
            }}
          >
            Follow Us
          </h3>
          <ul
            className="list-none"
            style={{
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: vw(size.footerSocialItemGap),
            }}
          >
            {data.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase transition-opacity hover:opacity-70"
                  style={{
                    ...bodyEnStyle,
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                  }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 구분선 + 하단 법적 고지 */}
      <div
        style={{
          borderTop: `1px solid ${color.footerDivider}`,
          paddingTop: vw(size.footerDividerToBottom),
        }}
      >
        <div
          className="flex w-full items-start justify-between"
          style={{ columnGap: vw(24) }}
        >
          <p
            style={{
              margin: 0,
              color: color.footerMuted,
              fontFamily: fontFamilies.sans,
              fontSize: fluidFont(font.footerLegal),
              fontWeight: weight.footerLegal,
              letterSpacing: tracking.footerLegalKo,
              lineHeight: 1.5,
            }}
          >
            {data.businessLine}
          </p>

          <p
            style={{
              margin: 0,
              flexShrink: 0,
              color: color.footerMuted,
              fontFamily: fontFamilies.logo,
              fontSize: fluidFont(font.footerLegal),
              fontWeight: weight.footerLegalEn,
              letterSpacing: tracking.footerLegalEn,
              lineHeight: 1.5,
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontFamily: fontFamilies.sans, fontWeight: 400 }}>
              ©
            </span>
            {` ${data.creditLine.replace(/^©\s*/, "")}`}
            {" | "}
            <a href={data.adminHref} className="footer-admin-link">
              {data.adminLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
