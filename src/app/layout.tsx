import type { Metadata } from "next";
import { Noto_Sans_KR, Poppins } from "next/font/google";
import { fontFamilies } from "@/styles/fonts";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HAIR UP",
  description: "Elevate Your Style. Define Your Beauty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`h-full antialiased ${poppins.variable} ${notoSansKr.variable}`}
    >
      <body
        className="min-h-full bg-white text-[#151515]"
        style={{ fontFamily: fontFamilies.sans }}
      >
        {children}
      </body>
    </html>
  );
}
