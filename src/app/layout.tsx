import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { pretendardStylesheet, fontFamilies } from "@/styles/fonts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="ko" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href={pretendardStylesheet} />
      </head>
      <body
        className="min-h-full bg-white text-[#151515]"
        style={{ fontFamily: fontFamilies.sans }}
      >
        {children}
      </body>
    </html>
  );
}
