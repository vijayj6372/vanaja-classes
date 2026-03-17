import React from 'react';
import Image from 'next/image';
import { CheckCircle, Heart, BarChart, Zap } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
    const reasons = [
        { title: 'Small Batch Coaching', icon: <Heart className="text-[#ED1C24]" />, desc: 'Personal attention with small batches to ensure doubt solving for every student.' },
        { title: 'Regular Board Prep', icon: <CheckCircle className="text-green-500" />, desc: 'Weekly topic-wise tests and full-length mock examinations for CBSE & GSEB.' },
        { title: 'Personal Performance Tracking', icon: <BarChart className="text-[#FFD100]" />, desc: 'Detailed analytics and feedback shared with parents regularly to ensure growth.' },
        { title: 'Result-Focused Approach', icon: <Zap className="text-[#00529B]" />, desc: 'Strategy designed to maximize scores in both Boards and Entrance Exams like JEE/NEET.' },
    ];

    return (
        <section className="py-24 bg-white font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00529B] mb-6 uppercase tracking-tight">Best Coaching Classes in Bharuch</h2>
                        <p className="text-slate-600 text-base sm:text-lg mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0">
                            Vanaja Personal Care Coaching Classes offers expert guidance for 8th to 12th standard students with a focus on personal attention and academic excellence.
                        </p>
                        <div className="space-y-4 sm:space-y-6 text-left">
                            {reasons.map((r, i) => (
                                <div key={i} className="flex gap-4 p-3 sm:p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-md rounded-lg flex items-center justify-center">
                                        {r.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-base sm:text-lg">{r.title}</h4>
                                        <p className="text-slate-500 text-xs sm:text-sm">{r.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:gap-6 relative mt-8 lg:mt-0">
                        <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                            <div className="relative rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden h-48 sm:h-64">
                                <Image
                                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400"
                                    fill
                                    quality={75}
                                    sizes="(max-width: 768px) 50vw, 200px"
                                    className="object-cover"
                                    alt="Student studying with dedication"
                                />
                            </div>
                            <div className="relative rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden h-48 sm:h-64">
                                <Image
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400"
                                    fill
                                    quality={75}
                                    sizes="(max-width: 768px) 50vw, 200px"
                                    className="object-cover"
                                    alt="Group of students collaborating"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            <div className="relative rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden h-64 sm:h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400"
                                    fill
                                    quality={75}
                                    sizes="(max-width: 768px) 50vw, 200px"
                                    className="object-cover"
                                    alt="Modern classroom environment"
                                />
                            </div>
                            <div className="bg-[#FFD100] p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl text-[#00529B]">
                                <p className="text-3xl sm:text-5xl font-black mb-1 sm:mb-2">100%</p>
                                <p className="font-bold text-sm sm:text-lg leading-tight uppercase">Result Guaranteed Approach</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
