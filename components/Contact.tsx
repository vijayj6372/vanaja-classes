"use client";
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-[#004A99] mb-4 uppercase tracking-tighter"
                    >
                        Visit Our <span className="text-[#E31E24]">Campus</span>
                    </motion.h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Find us in the heart of Bharuch</p>
                    <div className="w-24 h-2 bg-[#FFC600] mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    {/* Contact Details Side */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-100 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-[#004A99] mb-8 uppercase tracking-tight flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#E31E24] rounded-full"></div>
                                    Contact Details
                                </h3>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-14 h-14 bg-white shadow-md text-[#E31E24] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-all duration-300">
                                            <MapPin size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[#004A99] uppercase text-sm tracking-widest mb-1">Our Address</h4>
                                            <p className="text-slate-600 font-bold leading-relaxed">
                                                102, Zadeshwar Rd, Aalekh Society,<br />
                                                Bholav, Bharuch, Gujarat 392012
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="w-14 h-14 bg-white shadow-md text-[#004A99] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#004A99] group-hover:text-white transition-all duration-300">
                                            <Phone size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[#004A99] uppercase text-sm tracking-widest mb-1">Call Support</h4>
                                            <p className="text-slate-600 font-black text-xl">+91 72260 04200</p>
                                            <p className="text-slate-600 font-bold">+91 81284 21630</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="w-14 h-14 bg-white shadow-md text-[#00ADEF] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#00ADEF] group-hover:text-white transition-all duration-300">
                                            <Mail size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[#004A99] uppercase text-sm tracking-widest mb-1">Email Inquiry</h4>
                                            <p className="text-slate-600 font-bold">info@vanajaclasses.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="w-14 h-14 bg-white shadow-md text-[#FFC600] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#FFC600] group-hover:text-white transition-all duration-300">
                                            <Clock size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[#004A99] uppercase text-sm tracking-widest mb-1">Working Hours</h4>
                                            <p className="text-slate-600 font-bold">Monday - Saturday</p>
                                            <p className="text-slate-500 font-medium">8:00 AM - 8:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-200">
                                <a
                                    href="https://wa.me/917226004200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-[#128C7E] transition-all shadow-xl shadow-green-100"
                                >
                                    Chat with Academic Counselor
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="lg:col-span-7">
                        <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 h-[500px] lg:h-full relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.47466847844!2d72.99268387535547!3d21.7226500804368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be02111d9555555%3A0x86706e23b1238914!2sBholav%2C%20Bharuch%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                title="Vanaja Classes Location"
                                className="grayscale-[0.2] contrast-[1.1] brightness-[1.05]"
                            ></iframe>

                            {/* Overlay Label */}
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50 pointer-events-none">
                                <p className="text-[#004A99] font-black uppercase text-xs tracking-widest">Interactive Map</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
