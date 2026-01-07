import type { Metadata } from "next";
import { Playfair_Display, Caveat, Inter } from "next/font/google";
import "./globals.css";
import { LightboxProvider } from "@/app/context/LightboxContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Theresa's 25th Birthday",
  description: "A year in film - 2025",
  // Block all search engines and crawlers
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${caveat.variable} ${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <LightboxProvider>
          {children}
        </LightboxProvider>
      </body>
    </html>
  );
}
