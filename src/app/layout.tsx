import type { Metadata } from "next";
import { Tahoma } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-display",
});

const body = localFont({
  src: [
    {
      path: "./fonts/GeistMonoVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "VOGA | Luxury Food Experience",
  description: "VOGA - تجربة طعام فاخرة، برجر، بروست، بيتزا بأعلى مستويات الجودة",
  keywords: ["VOGA", "برجر", "بروست", "بيتزا", "طعام فاخر", "توصيل"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${display.variable} ${body.variable} font-display antialiased`}>
        {children}
      </body>
    </html>
  );
}
