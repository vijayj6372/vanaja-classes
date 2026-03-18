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
    "iit jee coaching classes in bharuch",
    "NEET coaching bharuch",
    "GUJCET coaching bharuch",
    "best personal care tuition bharuch",
    "science classes bharuch",
    "commerce classes bharuch",
    "commerce coaching bharuch",
    "personal attention tuition bharuch",
    "best tuition near zadeshwar road bharuch",
    "board exam preparation bharuch",
    "best coaching for class 10 bharuch",
    "best coaching for class 12 bharuch",
    "vanaja classes bharuch contact number",
    "vanaja classes bharuch address",
    "vanaja classes bharuch website",
    "vanaja classes bharuch contact",
    "vanaja classes bharuch whatsapp",
    "vanaja classes bharuch whatsapp number",
    "vanaja classes bharuch whatsapp contact",
    "tuition near zadeshwar road bharuch",
    "coaching classes in Bholav Bharuch",
    "tuition near Shravan Chowkdi Bharuch",
    "best coaching near Link Road Bharuch",
    "personal tutors in GNFC Township",
    "tuition classes near Maktampur Bharuch",
    "coaching center near Railway Station Bharuch",
    "top science classes in Dahej Bypass Road",
    "coaching classes near ABC Crossing Bharuch",
    "English Medium GSEB coaching Bharuch",
    "GSEB Class 10 board prep Bharuch",
    "CBSE Class 12 physics chemistry maths Bharuch",
    "GSEB science stream coaching Bharuch",
    "CBSE commerce tuition Bharuch",
    "GSEB 11th 12th science group A and B coaching",
    "HSC board exam preparation Bharuch",
    "best maths teacher for class 10 Bharuch",
    "physics and chemistry coaching for 12th science",
    "biology tuition for NEET Bharuch",
    "accountancy and statistics classes Bharuch",
    "standard 8 to 10 foundation coaching Bharuch",
    "english and social studies tuition Bharuch",
    "GUJCET crash course Bharuch",
    "JEE Main preparation Bharuch",
    "NEET foundation classes Bharuch",
    "integrated coaching for JEE NEET Bharuch",
    "ACPC counseling and coaching Bharuch",
    "coaching classes with individual attention Bharuch",
    "best tuition for weak students in Bharuch",
    "small batch coaching for board exams",
    "affordable personal care tuition Bharuch",
    "regular test series coaching Bharuch",
    "concept clearing classes for high schoolers",
    "best result oriented coaching Bharuch",
    "after school support classes Bharuch",
    "which is the best coaching for GSEB 10th in Bharuch?",
    "how to find a personal tutor for science in Bharuch?",
    "best science coaching in Bharuch for 11th 12th",
    "vanaja coaching classes near me",
    "where to get personal attention for NEET in Bharuch?",
    "bharuch coaching classes",
    "Physics wallah bharuch",
    "pw bharuch",
    "akash academy bharuch",
    "Physics Wallah Vidyapeeth Bharuch",
    "Aakash Institute Bharuch",
    "PW Vidyapeeth Bharuch",
    "Aakash Educational Services Limited Bharuch",
    "IIT JEE coaching in Bharuch",
    "NEET coaching classes in Bharuch",
    "best coaching for IIT JEE in Bharuch",
    "top NEET institute Bharuch",
    "foundation classes in Bharuch",
    "science coaching Bharuch class 11 12",
    "JEE Main and Advanced preparation",
    "NEET UG entrance exam coaching",
    "NTSE preparation Bharuch",
    "Olympiad coaching classes",
    "KVPY coaching Bharuch",
    "hybrid classrooms Bharuch",
    "offline coaching for medical exams",
    "engineering entrance exam success",
    "experienced faculty for JEE NEET",
    "Aakash Bharuch admission 2026",
    "PW Vidyapeeth scholarship test",
    "best medical coaching in Bharuch",
    "competitive exam centers in Bharuch",
    "Aakash vs Physics Wallah Bharuch"
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
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
  "logo": "https://www.vanajacoachingclasses.in/favicon.ico",
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
