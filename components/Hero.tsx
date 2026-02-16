"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Award, Target, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-20 overflow-hidden bg-white">
            {/* Dynamic Background Graphics */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#004A99]/5 to-transparent rounded-l-[200px] hidden lg:block"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00ADEF]/10 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Admissions Badge */}
                    <div className="inline-flex items-center gap-3 bg-[#E31E24] text-white px-6 py-2 rounded-full mb-8 shadow-lg shadow-red-200 animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        <span className="text-sm font-black uppercase tracking-widest">Admissions Open 2025-26</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#004A99] leading-[0.9] mb-4 uppercase tracking-tighter sm:text-5xl">
                        Vanaja <br />
                        <span className="text-[#E31E24]">Classes</span>
                        <span className="block text-xl md:text-4xl mt-4 text-slate-500 font-bold tracking-[0.15em] border-l-8 border-[#FFC600] pl-6">
                            BHARUCH, GUJARAT
                        </span>
                    </h1>

                    {/* Key Programs Focus */}
                    <div className="mb-8 mt-10">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Leading Institute for:</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <div className="bg-[#004A99] text-white px-4 sm:px-5 py-2 rounded-xl flex items-center gap-2 shadow-lg border border-white/10 transform hover:scale-105 transition-transform cursor-default">
                                <Target size={16} className="text-[#FFC600]" />
                                <span className="font-black text-sm sm:text-base md:text-lg uppercase tracking-tight">IIT-JEE</span>
                            </div>
                            <div className="bg-[#E31E24] text-white px-4 sm:px-5 py-2 rounded-xl flex items-center gap-2 shadow-lg border border-white/10 transform hover:scale-105 transition-transform cursor-default">
                                <Award size={16} className="text-[#FFC600]" />
                                <span className="font-black text-sm sm:text-base md:text-lg uppercase tracking-tight">NEET</span>
                            </div>
                            <div className="bg-[#00ADEF] text-white px-4 sm:px-5 py-2 rounded-xl flex items-center gap-2 shadow-lg border border-white/10 transform hover:scale-105 transition-transform cursor-default">
                                <Zap size={16} className="text-[#FFC600]" />
                                <span className="font-black text-sm sm:text-base md:text-lg uppercase tracking-tight">GUJCET</span>
                            </div>
                            <div className="bg-slate-800 text-white px-4 sm:px-5 py-2 rounded-xl flex items-center gap-2 shadow-lg border border-white/10 transform hover:scale-105 transition-transform cursor-default">
                                <BookOpen size={16} className="text-[#FFC600]" />
                                <span className="font-black text-sm sm:text-base md:text-lg uppercase tracking-tight">11-12 SCI</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <p className="text-lg md:text-2xl font-bold text-slate-700 uppercase tracking-tight leading-tight">
                            Personal Care for Every Student
                        </p>
                    </div>

                    <p className="text-base sm:text-lg text-slate-500 max-w-lg mb-10 leading-relaxed font-medium italic">
                        "We believe that every student has the potential to excel. Our personalized teaching methods ensure no one is left behind in the competitive race."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                        <a
                            href="https://wa.me/917226004200"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-[#004A99] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl hover:bg-blue-900 transition-all shadow-2xl flex items-center justify-center gap-2 uppercase tracking-tighter"
                        >
                            Inquiry Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <Link
                            href="/brochure"
                            className="bg-white border-4 border-[#FFC600] text-[#004A99] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl hover:bg-yellow-50 transition-all shadow-xl uppercase tracking-tighter text-center"
                        >
                            Brochure
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative mt-12 lg:mt-0"
                >
                    {/* Main Visual Frame */}
                    <div className="relative z-10 p-4 bg-white rounded-4xl sm:rounded-[3rem] shadow-2xl border border-slate-100 transform lg:rotate-2">
                        <div className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden aspect-4/5 relative">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
                                alt="Vanaja Classes Learning Environment"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#004A99]/60 to-transparent"></div>

                            {/* Location Tag */}
                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white border border-white/30">
                                <MapPin size={14} />
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">Bharuch, Gujarat</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Accents */}
                    <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-24 h-24 sm:w-32 sm:h-32 bg-[#FFC600] rounded-2xl sm:rounded-3xl -z-10"></div>

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-10 sm:top-20 -right-4 sm:-right-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl z-20 border-l-4 sm:border-l-8 border-[#00ADEF]"
                    >
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="text-2xl sm:text-3xl font-black text-[#004A99]">850+</div>
                            <div className="text-[8px] sm:text-[10px] font-black uppercase text-slate-400 tracking-widest">JEE / NEET<br />Qualifiers</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
