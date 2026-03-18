import React from 'react';
import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImageSlider from "@/components/ImageSlider";
import Stats from "@/components/Stats";
import Courses from "@/components/Courses";
import WhyChooseUs from "@/components/WhyChooseUs";
import AcademicExcellenceVideo from "@/components/AcademicExcellenceVideo";
import ScholarshipBanner from "@/components/ScholarshipBanner";
import VideoGallery from "@/components/VideoGallery";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export const metadata: Metadata = {
  title: 'Vanaja Coaching Classes Bharuch | Best Tuition & Coaching',
  description: 'Vanaja Coaching Classes in Bharuch. Best coaching for 8th to 12th CBSE/GSEB, IIT JEE, NEET. Expert personal care coaching classes in Bharuch.',
};

export default function Home() {
  return (
    <div className="min-h-screen relative selection:bg-[#FFC600] selection:text-[#004A99]">
      <Navbar />
      <div className="pt-20 sm:pt-24">
        <ImageSlider />
      </div>
      <Hero />
      <Stats />
      <AcademicExcellenceVideo />
      <Courses />
      <WhyChooseUs />
      <ScholarshipBanner />
      {/* Integrated Video Gallery for Classroom Insights */}
      <VideoGallery />

      {/* Result Section Title */}
      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-[#004A99] mb-4 uppercase tracking-tighter italic">
            Proven Results <span className="text-[#E31E24]">Year After Year</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Empowering students to achieve their dreams since 15 years</p>
        </div>
      </section>

      <Contact />
      <Footer />

      {/* Floating Elements */}
      <WhatsAppFloating />

      {/* Structured data for videos to be indexed by Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Vanaja Coaching Classes Bharuch - Introduction",
              "description": "Welcome to Vanaja Personal Care Coaching Classes in Bharuch. We offer top CBSE & GSEB coaching for 8th to 12th Std, specializing in IIT JEE, NEET, and board exam preparation with personal attention.",
              "thumbnailUrl": [
                "https://www.vanajacoachingclasses.in/b1.png"
              ],
              "uploadDate": "2024-01-01T08:00:00+08:00",
              "contentUrl": "https://www.vanajacoachingclasses.in/VANAJA_COACHING_CLASSES_-_Intro_1080P.mp4",
              "embedUrl": "https://www.vanajacoachingclasses.in",
              "duration": "PT1M"
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Vanaja Coaching Classes - Student Testimonial & Campus Tour",
              "description": "Hear from our students and take a look around the Vanaja Coaching Classes campus in Bharuch. See our facilities and meet our successful successful students.",
              "thumbnailUrl": [
                "https://www.vanajacoachingclasses.in/priyesha.png",
                "https://www.vanajacoachingclasses.in/i1.png"
              ],
              "uploadDate": "2024-02-01T08:00:00+08:00",
              "contentUrl": "https://www.vanajacoachingclasses.in/v2.mp4",
              "embedUrl": "https://www.vanajacoachingclasses.in",
              "duration": "PT1M"
            }
          ])
        }}
      />
    </div>
  );
}
