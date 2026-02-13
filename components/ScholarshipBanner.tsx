"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Trophy } from 'lucide-react';

const ScholarshipBanner: React.FC = () => {
    return (
        <section id="scholarship" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#00529B] to-[#003d74] p-8 md:p-16 text-white shadow-2xl"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Trophy size={200} />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <span className="bg-[#FFD100] text-blue-900 px-6 py-2 rounded-full font-bold text-sm mb-6 inline-block uppercase tracking-wider">
                                Opportunity for Bright Minds
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                                Scholarship Test <br />
                                <span className="text-[#FFD100]">Every Sunday</span>
                            </h2>
                            <p className="text-blue-100 text-lg mb-8 max-w-lg">
                                Assess your potential and win up to 100% scholarship on your coaching fees. Join the legacy of excellence today!
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/20">
                                    <Timer className="text-[#FFD100]" />
                                    <span className="font-bold">Next Slot: 10:00 AM</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#ED1C24] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-white hover:text-[#ED1C24] transition-all"
                            >
                                REGISTER NOW
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ScholarshipBanner;
