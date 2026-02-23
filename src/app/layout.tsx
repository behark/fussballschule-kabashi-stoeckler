import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { StructuredData } from "@/components/StructuredData";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kabashi-Stöckler Fussballschule | Performance Bootcamp Oberösterreich",
  description: "Professionelles Fußballcamp in Kirchdorf an der Krems. Technik, Koordination und Power Training für Kinder und Jugendliche von 6-16 Jahren.",
  keywords: "Fußballcamp Oberösterreich, Fussballschule Kirchdorf, Jugendtraining Fußball, Fußballschule Österreich, Performance Bootcamp",
  authors: [{ name: "Kabashi-Stöckler Fussballschule" }],
  metadataBase: new URL("https://www.ks-fussballschule.at"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kabashi-Stöckler Fussballschule | Performance Bootcamp",
    description: "Für alle die besser werden wollen. Professionelles Fußballtraining in Oberösterreich.",
    locale: "de_AT",
    type: "website",
    url: "https://www.ks-fussballschule.at",
    siteName: "Kabashi-Stöckler Fussballschule",
    images: [
      {
        url: "/images/trainer-team.jpg",
        width: 1200,
        height: 630,
        alt: "Kabashi-Stöckler Fussballschule Trainer Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabashi-Stöckler Fussballschule | Performance Bootcamp",
    description: "Für alle die besser werden wollen. Professionelles Fußballtraining in Oberösterreich.",
    images: ["/images/trainer-team.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-AT">
      <body className={`${inter.variable} font-sans`}>
        <StructuredData />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
