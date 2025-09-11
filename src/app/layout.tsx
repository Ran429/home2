import { CommonMetadata } from "@/constants/common-metadata";
import { FONT_PRETENDARD } from "@/lib/font-util";
import Script from "next/script";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = CommonMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={FONT_PRETENDARD.className}>
        {children}
      </body>
    </html>
  );
}
