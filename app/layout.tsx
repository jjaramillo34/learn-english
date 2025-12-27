import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// vercel analytics
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = 'https://learn-english-flash.vercel.app';

export const metadata: Metadata = {
  title: "Learn English Flashcards - Learn Languages",
  description: "Interactive language flashcards for learning English, Spanish, French, and Japanese",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Learn English Flashcards - Learn Languages",
    description: "Interactive language flashcards for learning English, Spanish, French, and Japanese",
    url: siteUrl,
    siteName: "Learn English Flashcards",
    images: [
      { url: `${siteUrl}/og-image.png` },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
    other: {
      rel: 'icon',
      url: '/favicon.ico',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
