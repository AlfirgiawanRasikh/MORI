import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const newsreader = localFont({
  src: [
    {
      path: "../assets/fonts/newsreader-roman.woff2",
      weight: "300 500",
      style: "normal",
    },
    {
      path: "../assets/fonts/newsreader-italic.woff2",
      weight: "300 500",
      style: "italic",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Georgia", "Times New Roman"],
});
const jakarta = localFont({
  src: "../assets/fonts/jakarta.woff2",
  weight: "400 600",
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["Arial"],
});

export const metadata: Metadata = {
  title: "MORI — A quieter place to begin",
  description:
    "A quieter way to understand how you feel and find one small thing to do next. An independent mental wellness concept.",
  applicationName: "MORI",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = {
  themeColor: "#fff8f6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
