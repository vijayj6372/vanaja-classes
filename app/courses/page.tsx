"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    CheckCircle2,
    Zap,
    Target,
    Award,
    BookOpen,
    GraduationCap,
    Monitor,
    Users,
    Trophy,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const feeDetails = [
    { std: '8th Standard', fee: '25,000', period: 'Per Year', color: 'bg-blue-50 text-blue-600' },
    { std: '9th Standard', fee: '30,000', period: 'Per Year', color: 'bg-indigo-50 text-indigo-600' },
    { std: '10th Standard', fee: '35,000', period: 'Per Year', color: 'bg-purple-50 text-purple-600' },
    { std: '11th Standard', fee: '75,000', period: 'All 3 Subjects with JEE & NEET', color: 'bg-red-50 text-red-600' },
    { std: '12th Standard', fee: '75,000', period: 'All 3 Subjects with JEE & NEET', color: 'bg-green-50 text-green-600' },
];

const features = [
    {
        title: "Spacious A.C. Class Rooms",
        desc: "Optimized learning environment with climate control.",
        icon: <Users className="text-[#004A99]" size={28} />
    },
    {
        title: "Smart Board Teachings",
        desc: "Interactive visual learning with modern equipment.",
        icon: <Monitor className="text-[#E31E24]" size={28} />
    },
    {
        title: "Individual Personal Caring",
        desc: "One-on-one attention to track every student's growth.",
        icon: <Target className="text-[#FFC600]" size={28} />
    },
    {
        title: "Weekend Tests",
        desc: "Regular assessment with results sent via SMS to parents.",
        icon: <BookOpen className="text-[#00ADEF]" size={28} />
    },
    {
        title: "10 Years Excellence",
        desc: "Proven track record of consistent results in Bharuch.",
        icon: <Trophy className="text-[#ED454B]" size={28} />
    }
];

export default function CoursesPage() {
    return (
        <main className="min-h-screen bg-white selection:bg-[#FFC600] selection:text-[#004A99]">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#004A99] mb-6 uppercase tracking-tighter">
                            Course <span className="text-[#E31E24]">Pricing</span> & Details
                        </h1>
                        <p className="text-slate-500 text-sm sm:text-xl font-bold uppercase tracking-widest max-w-2xl mx-auto">
                            Transparent Coaching Fee Structure for 2025-26 Academic Year
                        </p>
                    </motion.div>

                    {/* Fees Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        {feeDetails.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 shadow-2xl border-2 border-slate-50 relative overflow-hidden group hover:border-[#004A99]/20 transition-all"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 ${item.color.split(' ')[0]} opacity-20 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>

                                <div className={`inline-block px-4 py-1 rounded-full ${item.color} text-[10px] font-black uppercase tracking-widest mb-6`}>
                                    {item.std.split(' ')[1] === 'Standard' ? 'Foundation' : 'Advanced'}
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-black text-[#004A99] mb-2 uppercase">{item.std}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-3xl sm:text-4xl font-black text-[#E31E24]">₹{item.fee}</span>
                                    <span className="text-slate-400 font-bold text-xs uppercase">INR</span>
                                </div>

                                <p className="text-slate-500 font-bold text-xs sm:text-sm leading-relaxed mb-8 min-h-12">
                                    {item.period}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-600 font-medium text-sm sm:text-base">
                                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                        <span>Full Syllabus Coverage</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 font-medium text-sm sm:text-base">
                                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                        <span>Expert Study Material</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 font-medium text-sm sm:text-base">
                                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                        <span>Doubt Solving Sessions</span>
                                    </div>
                                </div>

                                <Link
                                    href="https://wa.me/917226004200"
                                    className="mt-10 block w-full bg-[#004A99] text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#003d74] transition-colors shadow-lg shadow-blue-100"
                                >
                                    Book Seat Now
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Features Section */}
                    <div className="bg-slate-50 rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                            <Zap size={200} />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#004A99] mb-8 uppercase tracking-tighter leading-tight">
                                    Why Choose <br />
                                    <span className="text-[#E31E24]">Vanaja Classes?</span>
                                </h2>
                                <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-10">
                                    Our infrastructure and personalized approach make us the most trusted name in Bharuch for JEE, NEET, and Board preparations.
                                </p>
                                <div className="flex flex-wrap gap-3 sm:gap-4">
                                    <div className="flex items-center gap-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm border border-slate-100">
                                        <div className="w-2 h-2 bg-[#FFC600] rounded-full"></div>
                                        <span className="font-black text-[10px] uppercase text-[#004A99]">ISO Certified</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm border border-slate-100">
                                        <div className="w-2 h-2 bg-[#E31E24] rounded-full"></div>
                                        <span className="font-black text-[10px] uppercase text-[#004A99]">Top Results</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {features.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col gap-3 sm:gap-4 border border-slate-100"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                                            {f.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[#004A99] uppercase text-[10px] sm:text-xs mb-1 leading-tight">{f.title}</h4>
                                            <p className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase">{f.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
