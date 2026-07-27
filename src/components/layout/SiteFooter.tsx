import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, mobileFont, mw, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { FooterContent } from "@/types/content";

type Props = {
  data: FooterContent;
};

/** 사업자 한 줄 → 모바일 2줄 (주소 분리) */
function splitBusinessLines(businessLine: string): [string, string | null] {
  const marker = "주소";
  const idx = businessLine.indexOf(marker);
  if (idx <= 0) return [businessLine, null];
  const line1 = businessLine.slice(0, idx).replace(/\s*\|\s*$/, "").trim();
  const line2 = businessLine.slice(idx).trim();
  return [line1, line2 || null];
}

/** 크레딧 한 줄 → copyright / designed */
function splitCreditLines(creditLine: string): [string, string | null] {
  const parts = creditLine.split("|").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) return [parts[0]!, parts.slice(1).join(" | ")];
  return [creditLine, null];
}

export function SiteFooter({ data }: Props) {
  const { size, font, weight, color, tracking } = designTokens;
  const m = designTokens.mobile;
  const [biz1, biz2] = splitBusinessLines(data.businessLine);
  const [credit1, credit2] = splitCreditLines(data.creditLine);
  const phoneDisplay = data.phone.replace(/\s/g, "");

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

  const mHeading = {
    margin: 0,
    color: color.footerText,
    fontFamily: fontFamilies.logo,
    fontSize: mobileFont(m.footerHeading),
    fontWeight: m.footerHeadingWeight,
    lineHeight: 1,
  } as const;

  const mBodyEn = {
    margin: 0,
    color: color.footerText,
    fontFamily: fontFamilies.logo,
    fontSize: mobileFont(m.footerBodyEn),
    fontWeight: m.footerBodyWeight,
    lineHeight: 1,
  } as const;

  const mDay = {
    ...mBodyEn,
    fontWeight: m.footerDayWeight,
  } as const;

  const mBodyKo = {
    margin: 0,
    color: color.footerText,
    fontFamily: fontFamilies.sans,
    fontSize: mobileFont(m.footerBodyKo),
    fontWeight: m.footerBodyWeight,
    lineHeight: 1,
  } as const;

  const mLegal = {
    margin: 0,
    color: color.footerMuted,
    fontFamily: fontFamilies.sans,
    fontSize: mobileFont(m.footerLegal),
    fontWeight: m.footerLegalWeight,
    letterSpacing: tracking.footerLegalKo,
    lineHeight: 1,
  } as const;

  const mLegalEn = {
    ...mLegal,
    fontFamily: fontFamilies.logo,
    letterSpacing: tracking.footerLegalEn,
  } as const;

  return (
    <footer
      className="relative w-full"
      style={{
        boxSizing: "border-box",
        backgroundColor: color.footerBg,
        color: color.footerText,
        fontFamily: fontFamilies.sans,
        zIndex: 0,
      }}
    >
      {/* —— Desktop (md+) —— */}
      <div
        className="hidden md:block"
        style={{
          boxSizing: "border-box",
          minHeight: vw(size.footerH),
          paddingLeft: vw(size.footerSidePadding),
          paddingRight: vw(size.footerSidePadding),
          paddingTop: vw(size.footerPadTop),
          paddingBottom: vw(size.footerPadBottom),
        }}
      >
        <div
          className="flex w-full items-start"
          style={{ marginBottom: vw(size.footerMainToDivider) }}
        >
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
                href={`tel:${phoneDisplay}`}
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
      </div>

      {/* —— Mobile (HUM 06) —— */}
      <div
        className="md:hidden"
        style={{
          boxSizing: "border-box",
          paddingLeft: mw(m.footerSidePad),
          paddingRight: mw(m.footerSidePad),
          paddingTop: mw(m.footerPadTop),
          paddingBottom: mw(m.footerPadBottom),
        }}
      >
        <a
          href="#home"
          className="relative inline-flex items-center"
          style={{
            width: mw(m.footerLogoW),
            height: mw(m.footerLogoH),
            marginBottom: mw(m.footerLogoToHours),
          }}
          aria-label={data.brandName}
        >
          <Image
            src="/images/hair-up-logo-white.png"
            alt={data.brandName}
            fill
            className="object-contain object-left"
            sizes={`${m.footerLogoW}px`}
          />
        </a>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: mw(m.footerSectionGap),
          }}
        >
          {/* Opening Hours */}
          <div>
            <h3 style={{ ...mHeading, marginBottom: mw(m.footerHeadingToBody) }}>
              Opening Hours
            </h3>
            <ul
              className="list-none"
              style={{
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: mw(m.footerHoursBlockGap),
                lineHeight: 1,
              }}
            >
              {data.hours.map((row) => (
                <li key={row.days} style={{ lineHeight: 1 }}>
                  <p
                    style={{
                      ...mDay,
                      marginBottom: mw(m.footerHoursDayToTime),
                    }}
                  >
                    {row.days}
                  </p>
                  <p style={mBodyEn}>{row.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 style={{ ...mHeading, marginBottom: mw(m.footerHeadingToBody) }}>
              Address
            </h3>
            <p style={mBodyKo}>{data.address}</p>
          </div>

          {/* Phone */}
          <div>
            <h3 style={{ ...mHeading, marginBottom: mw(m.footerHeadingToBody) }}>
              Phone Number
            </h3>
            <a
              href={`tel:${phoneDisplay}`}
              style={{
                ...mBodyEn,
                display: "block",
                textDecoration: "none",
              }}
            >
              {phoneDisplay}
            </a>
          </div>

          {/* E-mail */}
          <div>
            <h3 style={{ ...mHeading, marginBottom: mw(m.footerHeadingToBody) }}>
              E-mail
            </h3>
            <a
              href={`mailto:${data.email}`}
              style={{
                ...mBodyEn,
                display: "block",
                textDecoration: "none",
              }}
            >
              {data.email}
            </a>
          </div>

          {/* Follow Us */}
          <div>
            <h3
              style={{ ...mHeading, marginBottom: mw(m.footerFollowToSocial) }}
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
                gap: mw(m.footerSocialItemGap),
                lineHeight: 1,
              }}
            >
              {data.socials.map((s) => (
                <li key={s.id} style={{ lineHeight: 1 }}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uppercase transition-opacity hover:opacity-70"
                    style={{
                      ...mBodyEn,
                      display: "block",
                      fontWeight: m.footerSocialWeight,
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

        {/* Divider + legal */}
        <div
          style={{
            marginTop: mw(m.footerSocialToDivider),
            borderTop: `1px solid ${color.footerDividerMobile}`,
            paddingTop: mw(m.footerDividerToLegal),
          }}
        >
          <p style={mLegal}>{biz1}</p>
          {biz2 ? (
            <p style={{ ...mLegal, marginTop: mw(m.footerLegalBizGap) }}>
              {biz2}
            </p>
          ) : null}

          <p
            style={{
              ...mLegalEn,
              marginTop: mw(m.footerLegalToCredit),
            }}
          >
            <span style={{ fontFamily: fontFamilies.sans, fontWeight: 400 }}>
              ©
            </span>
            {` ${credit1.replace(/^©\s*/, "")}`}
          </p>
          {credit2 ? (
            <p style={{ ...mLegalEn, marginTop: mw(m.footerCreditGap) }}>
              {credit2}
            </p>
          ) : null}

          <p
            style={{
              margin: 0,
              marginTop: mw(m.footerDesignedToAdmin),
              lineHeight: 1,
            }}
          >
            <a
              href={data.adminHref}
              className="footer-admin-link"
              style={{
                display: "inline-block",
                fontFamily: fontFamilies.logo,
                fontSize: mobileFont(m.footerLegal),
                fontWeight: m.footerLegalWeight,
                letterSpacing: tracking.footerLegalEn,
                lineHeight: 1,
              }}
            >
              {data.adminLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
