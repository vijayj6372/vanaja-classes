"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FACULTY, FacultyMember } from './constants';

export default function Faculty() {
    const fallbackImage = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=600";

    return (
        <section id="faculty" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#004A99] to-transparent opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-black text-[#E31E24] mb-2 uppercase tracking-tighter text-center">OUR EXPERIENCED FACULTY</h2>
                    <div className="w-24 h-2 bg-[#004A99] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20">
                    {FACULTY.map((teacher: FacultyMember, index: number) => (
                        <motion.div
                            key={teacher.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group pt-10 max-w-sm mx-auto w-full"
                        >
                            {/* Subject Pill Header - Blue with White Text */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 bg-[#0000FF] text-white px-8 sm:px-12 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-[0_10px_30px_rgba(0,0,255,0.4)] border-2 border-white uppercase tracking-tight whitespace-nowrap">
                                {teacher.subject}
                            </div>

                            {/* Card Container with Signature Thick Blue Border and Ultra Rounded Corners */}
                            <div className="border-[6px] sm:border-12 md:border-16 lg:border-18 border-[#004A99] rounded-[3.5rem] sm:rounded-[4.5rem] md:rounded-[5.5rem] overflow-hidden bg-white shadow-2xl transition-all duration-300">

                                {/* Photo Section (White background padding) */}
                                <div className="p-3 sm:p-4 md:p-6 bg-white">
                                    <div className="rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-slate-50 flex justify-center items-center h-[300px] sm:h-[380px] md:h-[480px] w-full relative">
                                        <img
                                            src={teacher.imageUrl}
                                            alt={teacher.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            style={{ objectPosition: 'center 10%' }}
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = fallbackImage;
                                                target.onerror = null;
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Information Panel */}
                                <div className="bg-[#E31E24] pt-6 sm:pt-8 pb-8 sm:pb-12 px-6 sm:px-8 text-center flex flex-col items-center gap-1">
                                    <h3 className="text-[#FFC600] text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-none mb-2">
                                        {teacher.name}
                                    </h3>
                                    <p className="text-white text-lg sm:text-xl md:text-2xl font-black uppercase tracking-widest opacity-95">
                                        {teacher.qualification}
                                    </p>

                                    {/* Experience Pill */}
                                    <div className="mt-6 sm:mt-8 bg-[#ED454B] text-[#FFC600] px-8 sm:px-12 py-3 sm:py-4 rounded-4xl sm:rounded-[2.5rem] font-black text-lg sm:text-xl md:text-2xl border-2 border-white/10 uppercase tracking-tighter shadow-lg">
                                        {teacher.experience}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
