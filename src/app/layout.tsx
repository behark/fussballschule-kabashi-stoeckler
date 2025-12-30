import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kabashi-Stöckler Fussballschule | Performance Bootcamp Oberösterreich",
  description: "Professionelles Fußballcamp in Kirchdorf an der Krems. Technik, Koordination und Power Training für Kinder und Jugendliche von 6-16 Jahren. Jetzt anmelden!",
  keywords: "Fußballcamp Oberösterreich, Fussballschule Kirchdorf, Jugendtraining Fußball, Fußballschule Österreich, Performance Bootcamp",
  authors: [{ name: "Kabashi-Stöckler Fussballschule" }],
  openGraph: {
    title: "Kabashi-Stöckler Fussballschule | Performance Bootcamp",
    description: "Für alle die besser werden wollen. Professionelles Fußballtraining in Oberösterreich.",
    locale: "de_AT",
    type: "website",
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
