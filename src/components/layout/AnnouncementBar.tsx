import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";

type Props = {
  message: string;
  bgColor?: string;
  textColor?: string;
};

export function AnnouncementBar({
  message,
  bgColor = designTokens.color.announcementBg,
  textColor = designTokens.color.white,
}: Props) {
  return (
    <div
      className="announcement-bar flex w-full items-center justify-center"
      style={{
        height: vw(designTokens.size.announcementHeight),
        backgroundColor: bgColor || designTokens.color.announcementBg,
        color: textColor || designTokens.color.white,
        fontFamily: fontFamilies.sans,
        fontSize: fluidFont(designTokens.font.announcement),
        fontWeight: 400,
        letterSpacing: "-0.01em",
        textAlign: "center",
      }}
    >
      <p className="announcement-bar__text m-0 text-center">{message}</p>
    </div>
  );
}
