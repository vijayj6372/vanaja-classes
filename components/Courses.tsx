"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    GraduationCap,
    Target,
    Award,
    Rocket,
    ChevronRight,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { COURSES } from './constants';

const iconMap: Record<string, React.ElementType> = {
    BookOpen,
    GraduationCap,
    Target,
    Award,
    Rocket,
    Zap
};

export default function Courses() {
    return (
        <section id="courses" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-extrabold text-[#00529B] mb-4"
                    >
                        Our Professional Courses
                    </motion.h2>
                    <div className="w-20 h-1 bg-[#FFD100] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COURSES.map((course: any, index: number) => {
                        const IconComponent = iconMap[course.icon];
                        return (
                            <Link href={course.href || '/courses'} key={course.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border-b-4 border-transparent hover:border-[#00529B] cursor-pointer group h-full"
                                >
                                    <div className="w-16 h-16 bg-[#00529B]/5 text-[#00529B] rounded-2xl flex items-center justify-center mb-6">
                                        {IconComponent ? <IconComponent size={32} /> : <BookOpen size={32} />}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">{course.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        {course.description}
                                    </p>
                                    <div className="text-[#00529B] font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Check Fees & Details <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
