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
        {/* KAKAO MAP API */}
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`}
        />
      </body>
    </html>
  );
}
