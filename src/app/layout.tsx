import type { Metadata } from "next";
import { pretendardStylesheet, fontFamilies } from "@/styles/fonts";
import "./globals.css";

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
    <html lang="ko" className="h-full antialiased">
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
