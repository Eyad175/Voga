import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import "./globals.css";

const exo = Exo_2({ 
  subsets: ["latin"],
  variable: "--font-exo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`${exo.variable} ${inter.variable} font-[family-name:var(--font-exo)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
