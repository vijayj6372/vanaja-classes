import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Courses from "@/components/Courses";
import WhyChooseUs from "@/components/WhyChooseUs";
import ScholarshipBanner from "@/components/ScholarshipBanner";
import VideoGallery from "@/components/VideoGallery";
import Faculty from "@/components/Faculty";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default function Home() {
  return (
    <div className="min-h-screen relative selection:bg-[#FFC600] selection:text-[#004A99]">
      <Navbar />
      <Hero />
      <Stats />
      <Courses />
      <WhyChooseUs />
      <ScholarshipBanner />
      {/* Integrated Video Gallery for Classroom Insights */}
      <VideoGallery />
      <Faculty />

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
    </div>
  );
}
