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
    "Vanaja Personal Care Coaching Classes in Bharuch offers expert coaching for 8th to 12th std CBSE & GSEB students. Best tuition classes in Bharuch for IIT JEE, NEET, GUJCET, Science, and Commerce board exams with personal attention.",

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

  authors: [{ name: "Vanaja Coaching Classes", url: "https://www.vanajacoachingclasses.in" }],
  creator: "Vanaja Coaching Classes",
  publisher: "Vanaja Coaching Classes",

  openGraph: {
    title: "Best Coaching Classes in Bharuch | Vanaja Personal Care",
    description: "Top coaching classes in Bharuch for CBSE & GSEB students from 8th to 12th std. Best coaching for IIT JEE, NEET, Science & Commerce. Small batches & personal attention.",
    url: "https://www.vanajacoachingclasses.in",
    siteName: "Vanaja Coaching Classes",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: '/b1.png', // Using an existing high-quality image from public/
        width: 1200,
        height: 630,
        alt: 'Vanaja Personal Care Coaching Classes Bharuch',
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vanaja Personal Care Coaching Classes Bharuch",
    description: "Expert coaching for 8th to 12th std CBSE & GSEB students. IIT JEE, NEET, Science & Commerce classes. Small batches & personal attention.",
    images: ["/b1.png"],
  },

  alternates: {
    canonical: "https://www.vanajacoachingclasses.in",
  },

  category: "Education",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/favicon.png' },
    ],
  },
  verification: {
    google: "googlee740e957d1cce24f",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Vanaja Personal Care Coaching Classes",
  "alternateName": ["Vanaja Coaching Classes Bharuch", "Vanaja Classes Bharuch"],
  "url": "https://www.vanajacoachingclasses.in",
  "logo": "https://www.vanajacoachingclasses.in/favicon.png",
  "image": "https://www.vanajacoachingclasses.in/b1.png",
  "description": "Leading coaching classes in Bharuch offering expert education for 8th to 12th Std CBSE & GSEB students. Best personal care tuition in Bharuch for IIT JEE, NEET, GUJCET, Science and Commerce.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Add. 11, 12, 13, 2nd Floor, Zadeshwar Road",
    "addressLocality": "Bharuch",
    "addressRegion": "Gujarat",
    "postalCode": "392012",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-72260-04200",
    "contactType": "customer service"
  },
  "sameAs": [
    // Add social media links here if they exist
  ]
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
