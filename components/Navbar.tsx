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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-effect shadow-lg py-1' : 'bg-white py-3'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link href="/">
                            <Logo size={scrolled ? 'sm' : 'md'} />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-slate-700 hover:text-[#004A99] font-semibold transition-colors uppercase text-sm tracking-wider"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <a href="https://wa.me/917226004200" target="_blank" rel="noopener noreferrer" className="bg-[#E31E24] text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all transform hover:scale-105 shadow-md text-sm uppercase">
                            Admissions Open
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[#004A99]">
                            {isOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-effect absolute top-full left-0 w-full shadow-2xl border-t border-slate-100 animate-in slide-in-from-top duration-300 max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-8 space-y-6 flex flex-col items-center">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-slate-800 text-xl font-bold hover:text-[#004A99] uppercase"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <a href="https://wa.me/917226004200" target="_blank" rel="noopener noreferrer" className="w-full bg-[#E31E24] text-white py-4 rounded-xl font-black text-lg shadow-lg text-center block">
                            ADMISSIONS OPEN
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
