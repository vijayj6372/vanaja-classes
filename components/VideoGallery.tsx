"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, Info } from 'lucide-react';
import { YOUTUBE_VIDEOS } from './constants';

const VideoGallery: React.FC = () => {
    return (
        <section id="gallery" className="py-24 bg-white relative overflow-hidden">
            {/* Visual background accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#004A99]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E31E24]/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <div className="w-16 h-16 bg-[#E31E24] rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-red-200">
                            <Youtube size={36} className="text-white" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#004A99] uppercase tracking-tighter">
                            Classroom <span className="text-[#E31E24]">Experience</span>
                        </h2>
                    </motion.div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm mb-6">Experience our proven teaching methodology through video</p>
                    <div className="w-24 h-2 bg-[#FFC600] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {YOUTUBE_VIDEOS.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-slate-50 rounded-[2.5rem] overflow-hidden border-2 border-slate-100 group flex flex-col hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
                        >
                            {/* Video Player Container */}
                            <div className="aspect-video relative overflow-hidden bg-black">
                                {/* Fixed standard YouTube embed to avoid Error 153 */}
                                <iframe
                                    className="w-full h-full relative z-10"
                                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>

                                {/* Play Badge overlay for context */}
                                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                                    <div className="bg-[#E31E24] text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        Watch Now
                                    </div>
                                </div>
                            </div>

                            {/* Video Info Content */}
                            <div className="p-8 flex flex-col grow">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h3 className="font-black text-[#004A99] text-xl md:text-2xl uppercase leading-none tracking-tight group-hover:text-[#E31E24] transition-colors line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                                        <Info size={18} className="text-slate-300" />
                                    </div>
                                </div>

                                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                                    {video.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-slate-200/60">
                                    <a
                                        href={`https://www.youtube.com/watch?v=${video.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-[#004A99] hover:text-[#E31E24] font-black text-xs uppercase tracking-[0.2em] transition-all group/link"
                                    >
                                        <span>Watch on YouTube</span>
                                        <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center group-hover/link:bg-[#E31E24] group-hover/link:text-white transition-all">
                                            <ExternalLink size={14} />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to action footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 bg-[#004A99] rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex flex-col items-center justify-center mb-6">
                            <div className="bg-[#E31E24] p-5 rounded-3xl shadow-2xl mb-6 transform hover:rotate-6 transition-transform">
                                <Youtube size={48} className="text-white" />
                            </div>
                            <h4 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Want to see more of our results?</h4>
                        </div>
                        <p className="text-blue-100 font-bold mb-10 uppercase tracking-widest text-sm opacity-90 max-w-2xl mx-auto">Subscribe to our channel for weekly educational content and student tips</p>
                        <a
                            href="https://www.youtube.com/@deepikachikkala3023"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 bg-[#FFC600] text-[#004A99] px-12 py-5 rounded-2xl font-black uppercase tracking-tighter text-xl hover:scale-105 hover:bg-[#FFE000] transition-all shadow-xl shadow-yellow-500/20"
                        >
                            <Youtube className="fill-[#004A99]" size={28} />
                            Visit YouTube Channel
                        </a>
                    </div>
                </motion.div>
            </div>
        </section >
    );
};

export default VideoGallery;
