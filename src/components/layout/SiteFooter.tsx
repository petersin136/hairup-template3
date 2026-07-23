import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { FooterContent } from "@/types/content";

type Props = {
  data: FooterContent;
};

export function SiteFooter({ data }: Props) {
  const { size, font, weight, color, tracking } = designTokens;

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: color.footerBg,
        color: color.footerText,
        paddingLeft: vw(size.footerSidePadding),
        paddingRight: vw(size.footerSidePadding),
        paddingTop: vw(size.footerPadTop),
        paddingBottom: vw(size.footerPadBottom),
        fontFamily: fontFamilies.sans,
      }}
    >
      <div
        className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        style={{ marginBottom: vw(size.footerMainToDivider) }}
      >
        {/* Brand */}
        <div>
          <a
            href="#home"
            className="inline-block uppercase"
            style={{
              fontFamily: fontFamilies.logo,
              fontSize: fluidFont(font.footerBrand),
              fontWeight: weight.footerBrand,
              letterSpacing: tracking.logo,
              lineHeight: 1.1,
              color: color.footerText,
            }}
          >
            {data.brandName}
          </a>
        </div>

        {/* Opening Hours */}
        <div>
          <h3
            style={{
              fontSize: fluidFont(font.footerHeading),
              fontWeight: weight.footerHeading,
              marginBottom: vw(size.footerHoursGap),
              lineHeight: 1.3,
            }}
          >
            Opening Hours
          </h3>
          <ul className="flex flex-col" style={{ gap: vw(size.footerHoursGap) }}>
            {data.hours.map((row) => (
              <li
                key={row.days}
                style={{
                  fontSize: fluidFont(font.footerBody),
                  fontWeight: weight.footerBody,
                  lineHeight: 1.45,
                }}
              >
                {row.days}: {row.time}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col" style={{ gap: vw(size.footerContactBlockGap) }}>
          <div>
            <h3
              style={{
                fontSize: fluidFont(font.footerHeading),
                fontWeight: weight.footerHeading,
                marginBottom: vw(10),
                lineHeight: 1.3,
              }}
            >
              Address
            </h3>
            <p
              style={{
                fontSize: fluidFont(font.footerBody),
                fontWeight: weight.footerBody,
                lineHeight: 1.5,
              }}
            >
              {data.address}
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: fluidFont(font.footerHeading),
                fontWeight: weight.footerHeading,
                marginBottom: vw(10),
                lineHeight: 1.3,
              }}
            >
              Phone Number
            </h3>
            <a
              href={`tel:${data.phone.replace(/\s/g, "")}`}
              style={{
                fontSize: fluidFont(font.footerBody),
                fontWeight: weight.footerBody,
                lineHeight: 1.5,
                color: color.footerText,
              }}
            >
              {data.phone}
            </a>
          </div>
          <div>
            <h3
              style={{
                fontSize: fluidFont(font.footerHeading),
                fontWeight: weight.footerHeading,
                marginBottom: vw(10),
                lineHeight: 1.3,
              }}
            >
              E-mail
            </h3>
            <a
              href={`mailto:${data.email}`}
              style={{
                fontSize: fluidFont(font.footerBody),
                fontWeight: weight.footerBody,
                lineHeight: 1.5,
                color: color.footerText,
              }}
            >
              {data.email}
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3
            style={{
              fontSize: fluidFont(font.footerHeading),
              fontWeight: weight.footerHeading,
              marginBottom: vw(size.footerSocialGap),
              lineHeight: 1.3,
            }}
          >
            Follow Us
          </h3>
          <ul className="flex flex-col" style={{ gap: vw(size.footerSocialGap) }}>
            {data.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase transition-opacity hover:opacity-70"
                  style={{
                    fontSize: fluidFont(font.footerBody),
                    fontWeight: weight.footerBody,
                    letterSpacing: "0.04em",
                    lineHeight: 1.4,
                    color: color.footerText,
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
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p
            style={{
              color: color.footerMuted,
              fontSize: fluidFont(font.footerLegal),
              fontWeight: weight.footerLegal,
              lineHeight: 1.5,
            }}
          >
            {data.businessLine}
          </p>
          <p
            className="lg:text-right"
            style={{
              color: color.footerMuted,
              fontSize: fluidFont(font.footerLegal),
              fontWeight: weight.footerLegal,
              lineHeight: 1.5,
            }}
          >
            {data.creditLine}
            {" | "}
            <a
              href={data.adminHref}
              className="footer-admin-link"
              style={{ fontWeight: 600 }}
            >
              {data.adminLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
