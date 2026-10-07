import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// self-hosted and preloaded by Next, so text never swaps in late
const anton = Anton({ subsets: ["latin"], weight: "400", display: "block", variable: "--font-anton" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "block", variable: "--font-serif" });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "block", variable: "--font-manrope" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "block", variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Zaid Akkad | Film Director & Cinematographer | Akkad Pictures",
  description:
    "Official portfolio of director, cinematographer and photographer Zaid Akkad — luxury commercials, cinema, fine-art photography and reels.",
  keywords: ["Zaid Akkad", "Akkad Pictures", "Film Director", "Cinematographer", "Photographer", "Commercial Director", "Istanbul", "Dubai"],
  authors: [{ name: "Zaid Akkad" }],
  openGraph: {
    title: "Zaid Akkad | Film Director & Cinematographer",
    description: "Luxury commercials, cinema and photography by Zaid Akkad.",
    url: "https://www.akkadpictures.com/",
    siteName: "Akkad Pictures",
    images: [
      {
        url: "https://static.wixstatic.com/media/e272fc_0168c2a0123d472f920752ddb884154e~mv2.jpg",
        width: 1200,
        height: 630,
        alt: "Zaid Akkad Portfolio",
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#060606" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lang="en" className={`${anton.variable} ${serif.variable} ${manrope.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://video.wixstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
