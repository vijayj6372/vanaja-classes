"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { NAV_ITEMS } from './constants';
import Logo from './Logo';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-effect shadow-lg py-1' : 'bg-white py-2 sm:py-3'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    <div className="flex items-center">
                        <Link href="/">
                            <Logo size={scrolled ? 'sm' : 'md'} />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {NAV_ITEMS.map((item: any) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-slate-700 hover:text-[#004A99] font-semibold transition-colors uppercase text-xs lg:text-sm tracking-widest"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <a href="https://wa.me/917226004200" target="_blank" rel="noopener noreferrer" className="bg-[#E31E24] text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl font-bold hover:bg-red-700 transition-all transform hover:scale-105 shadow-md text-xs uppercase">
                            Admissions Open
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[#004A99] p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-effect absolute top-full left-0 w-full shadow-2xl border-t border-slate-100 animate-in slide-in-from-top-2 duration-300 overflow-hidden">
                    <div className="px-6 py-10 space-y-8 flex flex-col items-center bg-white/95 backdrop-blur-md">
                        {NAV_ITEMS.map((item: any) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-slate-800 text-2xl font-black hover:text-[#004A99] uppercase tracking-tighter transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/917226004200"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full max-w-xs bg-[#E31E24] text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-red-200 text-center block uppercase tracking-tighter"
                        >
                            ADMISSIONS OPEN
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
