"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen, Clock } from 'lucide-react';

const stats = [
    { label: 'Successful Students', value: '5000+', icon: Users, color: '#FFC600' },
    { label: 'JEE/NEET Qualifiers', value: '850+', icon: Award, color: '#E31E24' },
    { label: 'Years of Excellence', value: '15+', icon: Clock, color: '#00ADEF' },
    { label: 'Expert Faculty Members', value: '12+', icon: BookOpen, color: '#FFFFFF' },
];

const Stats: React.FC = () => {
    return (
        <section className="relative py-20 bg-[#004A99] overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[120%] bg-white rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-5%] w-[30%] h-[100%] bg-[#E31E24] rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6 group-hover:bg-white/20 transition-all border border-white/20">
                                <stat.icon size={32} style={{ color: stat.color }} />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                                {stat.value}
                            </h3>
                            <p className="text-blue-100 text-xs md:text-sm font-black uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
