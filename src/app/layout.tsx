import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConsultationProvider } from "@/components/ConsultationModal";
import "./globals.css";

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/newsreader-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "New England Haven Home Watch",
  description:
    "Professional home watch and concierge care for primary residences and second homes across Southern Maine, the Southern New Hampshire Seacoast, and the lake regions of Southern Maine and New Hampshire.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${newsreader.variable}`}>
      <body>
        <ConsultationProvider>{children}</ConsultationProvider>
      </body>
    </html>
  );
}
