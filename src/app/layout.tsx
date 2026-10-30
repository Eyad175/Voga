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
  title: "VOGA | Luxury Burger Platform",
  description: "منصة توصيل برجر فاخر أونلاين - VOGA. برجر فاخر، طعم لا يقاوم، توصيل سريع.",
  keywords: ["برجر", "برجر فاخر", "توصيل طعام", "VOGA", "Luxury Burger"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${exo.variable} ${inter.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
