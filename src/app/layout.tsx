import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { ConsultationProvider } from "@/components/ConsultationModal";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
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
