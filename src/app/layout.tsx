import type { Viewport } from "next";
import localFont from "next/font/local";
import { preload } from "react-dom";
import "./globals.css";
import { releaseMetadata } from "@/lib/metadata";

const newsreader = localFont({
  src: [
    {
      path: "../assets/fonts/newsreader-roman-web.woff2",
      weight: "300 500",
      style: "normal",
    },
    {
      path: "../assets/fonts/newsreader-italic-web.woff2",
      weight: "300 500",
      style: "italic",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Georgia", "Times New Roman"],
});
const jakarta = localFont({
  src: "../assets/fonts/jakarta-web.woff2",
  weight: "400 600",
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["Arial"],
});

export const metadata = releaseMetadata(
  process.env.MORI_PRODUCTION_URL,
  process.env.MORI_SOCIAL_IMAGE,
);
export const viewport: Viewport = {
  themeColor: "#fff8f6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  preload("/images/hero.webp", {
    as: "image",
    imageSrcSet:
      "/images/hero-400.webp 400w, /images/hero-640.webp 640w, /images/hero.webp 848w",
    imageSizes:
      "(min-width: 1320px) 470px, (min-width: 640px) 40vw, calc(100vw - 68px)",
    fetchPriority: "high",
  });
  return (
    <html lang="en" className={`${newsreader.variable} ${jakarta.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
