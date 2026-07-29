import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { BackgroundAurora } from "@/components/BackgroundAurora";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yunior Prassetia Putra — Social Media Specialist & Digital Marketing Strategist",
  description:
    "I plan, create, and optimize content that turns casual scrollers into engaged audiences — blending data-driven strategy with storytelling across Instagram, TikTok, and beyond.",
  openGraph: {
    title: "Yunior Prassetia Putra — Social Media Specialist & Digital Marketing Strategist",
    description:
      "I plan, create, and optimize content that turns casual scrollers into engaged audiences.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <BackgroundAurora />
        <div id="main-content" className="relative z-10 flex flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
