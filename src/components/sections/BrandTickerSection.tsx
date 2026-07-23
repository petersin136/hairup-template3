import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { vw } from "@/lib/fluid";
import type { BrandLogo } from "@/types/content";

type Props = {
  logos: BrandLogo[];
};

function logoScale(name: string): number {
  const key = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "") as keyof typeof designTokens.brandLogoScale;

  return designTokens.brandLogoScale[key] ?? 1;
}

function LogoTrack({ logos, ariaHidden }: { logos: BrandLogo[]; ariaHidden?: boolean }) {
  const { size } = designTokens;
  const baseH = size.brandLogoHeight;

  return (
    <ul
      className="brand-marquee__track m-0 flex shrink-0 list-none items-center p-0"
      aria-hidden={ariaHidden || undefined}
      style={{
        columnGap: vw(size.brandLogoGap),
        paddingRight: vw(size.brandLogoGap),
      }}
    >
      {logos.map((logo) => {
        const scale = logoScale(logo.name);
        const heightPx = baseH * scale;

        return (
          <li
            key={`${ariaHidden ? "b" : "a"}-${logo.id}`}
            className="flex shrink-0 list-none items-center"
          >
            <Image
              src={logo.imageUrl}
              alt={ariaHidden ? "" : logo.name}
              width={Math.round(180 * scale)}
              height={Math.round(40 * scale)}
              unoptimized
              className="block w-auto object-contain object-center"
              style={{ height: vw(heightPx) }}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function BrandTickerSection({ logos }: Props) {
  const { color, size } = designTokens;

  if (!logos.length) return null;

  return (
    <section
      className="brand-marquee w-full overflow-hidden"
      aria-label="Brand partners"
      style={{
        backgroundColor: color.brandTickerBg,
        height: vw(size.brandTickerHeight),
      }}
    >
      <div className="brand-marquee__viewport flex h-full items-center">
        <div className="brand-marquee__rail flex w-max items-center">
          <LogoTrack logos={logos} />
          <LogoTrack logos={logos} ariaHidden />
        </div>
      </div>
    </section>
  );
}
