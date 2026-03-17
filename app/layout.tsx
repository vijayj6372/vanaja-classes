import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vanajacoachingclasses.in"),
  title: {
    default: "Vanaja Personal Care Coaching Classes Bharuch",
    template: "%s | Vanaja Coaching Classes"
  },
  description:
    "Vanaja Personal Care Coaching Classes in Bharuch offers expert coaching for 8th to 12th std CBSE & GSEB students with personal attention, small batches, and board exam preparation.",

  keywords: [
    "vanaja personal care coaching classes",
    "vanaja coaching classes",
    "vanaja classes",
    "vanaja personal care",
    "vanaja classes bharuch",
    "vanaja coaching classes bharuch",
    "vanaja personal care coaching classes bharuch",
    "vanaja personal care class bharuch",
    "coaching classes in bharuch",
    "best tuition classes in bharuch",
    "8th to 12th coaching bharuch",
    "cbse coaching bharuch",
    "gseb coaching bharuch",
    "best coaching classes in bharuch for 11th 12th science",
    "personal coaching classes in bharuch",
    "home tuition bharuch 8th to 12th",
    "cbse tuition classes in bharuch gujarat",
    "gseb coaching classes bharuch near me",
    "coaching for board exams bharuch",
    "private tuition classes bharuch",
    "coaching institute for science commerce bharuch",
    "affordable coaching classes bharuch",
    "small batch coaching bharuch",
    "personal attention tuition bharuch",
    "coaching classes with doubt solving bharuch",
    "coaching classes near ankleshwar bharuch",
    "IIT JEE coaching bharuch",
    "NEET coaching bharuch",
    "GUJCET coaching bharuch",
    "best personal care tuition bharuch",
    "science classes bharuch",
    "commerce classes bharuch",
    "commerce coaching bharuch",
    "personal attention tuition bharuch",
    "board exam preparation bharuch",
    "best coaching for class 10 bharuch",
    "best coaching for class 12 bharuch",
    "vanaja classes bharuch contact number",
    "tuition near zadeshwar road bharuch"
  ],

  authors: [{ name: "Vanaja Coaching Classes" }],
  creator: "Vanaja Coaching Classes",

  openGraph: {
    title: "Best Coaching Classes in Bharuch | Vanaja Personal Care",
    description:
      "Top coaching classes in Bharuch for CBSE & GSEB students from 8th to 12th std. Small batches & personal attention.",
    url: "https://www.vanajacoachingclasses.in",
    siteName: "Vanaja Coaching Classes",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
  },
  verification: {
    google: "googlee740e957d1cce24f",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/VANAJA_COACHING_CLASSES_-_Intro_1080P.mp4"
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
