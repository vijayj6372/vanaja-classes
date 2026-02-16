import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

const Footer: React.FC = () => {
    const youtubeLink = "https://m.youtube.com/watch?v=k_46Kynr-B0";

    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-2xl inline-block">
                            <Logo size="sm" />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Transforming potential into performance since 15 years. The most trusted name for science education in Bharuch.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#004A99] transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#E31E24] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"><Twitter size={20} /></a>
                            <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#E31E24] transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b-2 border-[#FFC600] inline-block">Quick Links</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/" className="hover:text-white transition-colors font-medium">Home</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors font-medium">Our Courses</Link></li>
                            <li><Link href="/#faculty" className="hover:text-white transition-colors font-medium">Expert Faculty</Link></li>
                            <li><Link href="/#scholarship" className="hover:text-white transition-colors font-medium">Scholarship Test</Link></li>
                            <li><Link href="/#gallery" className="hover:text-white transition-colors font-medium">Classroom Gallery</Link></li>
                            <li><Link href="/#contact" className="hover:text-white transition-colors font-medium">Admissions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b-2 border-[#FFC600] inline-block">Our Programs</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/courses" className="hover:text-white transition-colors font-medium">IIT JEE Main & Adv</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors font-medium">NEET (Medical)</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors font-medium">GUJCET Exam</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors font-medium">Foundation Batches</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors font-medium">Board Excellence</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b-2 border-[#FFC600] inline-block">Contact Info</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex gap-3">
                                <GraduationCap className="shrink-0 text-[#FFC600]" />
                                <span className="font-medium">102, Zadeshwar Rd, Aalekh Society, Bholav, Bharuch, Gujarat.</span>
                            </li>
                            <li className="font-bold text-white text-lg">+91 72260 04200</li>
                            <li className="font-medium">Support: 8:00 AM - 8:00 PM</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-800 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Vanaja Personal Care Coaching Classes. All Rights Reserved.</p>
                    <p className="mt-2 text-slate-600">Established for Quality Education.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
