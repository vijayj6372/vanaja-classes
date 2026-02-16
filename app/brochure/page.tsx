"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle2, Star, Trophy, Users, BookOpen, Monitor } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const brochureImages = [
    { src: '/b1.png', alt: 'Vanaja Classes Brochure Page 1' },
    { src: '/b2.png', alt: 'Vanaja Classes Brochure Page 2' },
    { src: '/b3.png', alt: 'Vanaja Classes Brochure Page 3' },
    { src: '/b4.png', alt: 'Vanaja Classes Brochure Page 4' },
];

const features = [
    {
        title: "Spacious A.C. Class Rooms",
        desc: "Comfortable learning environment with advanced climate control for better focus.",
        icon: <Users className="text-[#004A99]" size={32} />
    },
    {
        title: "Smart Board Teachings",
        desc: "Interactive digital learning experience with visual aids and modern technology.",
        icon: <Monitor className="text-[#E31E24]" size={32} />
    },
    {
        title: "Individual Personal Caring",
        desc: "Dedicated attention to every student's progress and personalized doubt solving.",
        icon: <Users className="text-[#FFC600]" size={32} />
    },
    {
        title: "Weekend Tests & SMS Results",
        desc: "Regular assessment with immediate performance feedback via SMS to parents.",
        icon: <BookOpen className="text-[#00ADEF]" size={32} />
    },
    {
        title: "10 Years of Excellence",
        desc: "A consistent track record of producing top rankers for over a decade in Bharuch.",
        icon: <Trophy className="text-[#ED454B]" size={32} />
    }
];

export default function BrochurePage() {
    return (
        <main className="min-h-screen bg-slate-50 selection:bg-[#FFC600] selection:text-[#004A99]">
            {/* Header / Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-[#004A99] font-black uppercase tracking-tighter hover:text-[#E31E24] transition-colors">
                        <ChevronLeft size={24} />
                        Back to Home
                    </Link>
                    <div className="text-[#004A99] font-black text-xl uppercase tracking-tighter">
                        Official <span className="text-[#E31E24]">Brochure</span> 2025
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-[#004A99] mb-6 uppercase tracking-tight">
                            Explore Our <span className="text-[#E31E24]">Legacy</span>
                        </h1>
                        <p className="text-slate-500 text-xl font-bold max-w-2xl mx-auto uppercase tracking-widest mb-12">
                            A Decade of Academic Excellence in Bharuch
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center gap-4 group hover:border-[#004A99]/30 transition-all hover:-translate-y-2"
                            >
                                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-black text-[#004A99] uppercase text-sm mb-2 leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Brochure Display */}
                <div className="max-w-5xl mx-auto space-y-12">
                    {brochureImages.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            <div className="relative bg-white p-4 md:p-8 rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden ring-1 ring-slate-200">
                                <div className="absolute top-8 left-8 z-10 bg-[#FFC600] text-[#004A99] px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest shadow-lg">
                                    Page 0{idx + 1}
                                </div>
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto rounded-3xl"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#004A99] text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Trophy className="mx-auto text-[#FFC600] mb-8" size={80} />
                    <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter italic">
                        Start Your Journey <br />
                        <span className="text-[#FFC600]">To Excellence</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                        <a
                            href="https://wa.me/917226004200"
                            className="bg-[#E31E24] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-[#E31E24] transition-all shadow-2xl uppercase tracking-tighter"
                        >
                            Contact Admissions
                        </a>
                        <Link
                            href="/"
                            className="bg-white/10 backdrop-blur-md border-2 border-white/20 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all uppercase tracking-tighter"
                        >
                            Back Home
                        </Link>
                    </div>
                </div>
            </section>

            {/* Floating Contact Button */}
            <div className="fixed bottom-8 left-8 z-50">
                <a
                    href="https://wa.me/917226004200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-2xl border border-slate-100 hover:scale-105 transition-transform group"
                >
                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 size={24} />
                    </div>
                    <span className="text-[#004A99] font-black text-sm uppercase tracking-widest">Enroll Today</span>
                </a>
            </div>
        </main>
    );
}
