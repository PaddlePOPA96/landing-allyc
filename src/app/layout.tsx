import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google"; // Added Great_Vibes
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://allyc.vercel.app"),
  title: {
    default: "RRQ Allyc - Valorant Streamer & Content Creator",
    template: "%s | RRQ Allyc - Valorant Streamer",
  },
  description: "Official website of RRQ Allyc (Jasmine Allyc). Watch live Valorant streams, check out the latest content, and follow the journey of a professional streamer and content creator.",
  keywords: ["RRQ Allyc", "RRQ ALLYC", "Allyc Stream", "Valorant Streamer", "Jasmine Allyc", "RRQ Streamer", "Female Valorant Streamer", "Indonesia Streamer"],
  authors: [{ name: "Jasmine Allyc" }],
  creator: "Jasmine Allyc",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://allyc.vercel.app",
    title: "RRQ Allyc - Valorant Streamer & Content Creator",
    description: "Watch live Valorant streams and check out the latest content from RRQ Allyc.",
    siteName: "RRQ Allyc",
    images: [
      {
        url: "/logo-rrq.png",
        width: 1200,
        height: 630,
        alt: "RRQ Allyc Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RRQ Allyc - Valorant Streamer",
    description: "Official website of RRQ Allyc. Live streams, clips, and more.",
    images: ["/logo-rrq.png"],
    creator: "@allyccc",
  },

  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "lmYpUOw55xokwQ_W32E-8VZr4lmjkihXhu95FMQjh9E",
  },
};

import AuthProviderWrapper from "@/components/AuthProviderWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased`}
      >
        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
