"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, Info } from 'lucide-react';
import { YOUTUBE_VIDEOS, VideoItem } from './constants';

const VideoGallery: React.FC = () => {
    return (
        <section id="gallery" className="py-24 bg-white relative overflow-hidden">
            {/* Visual background accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#004A99]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E31E24]/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E31E24] rounded-2xl sm:rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-red-200">
                            <Youtube size={32} className="text-white sm:w-9 sm:h-9" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#004A99] uppercase tracking-tighter">
                            Classroom <span className="text-[#E31E24]">Experience</span>
                        </h2>
                    </motion.div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest sm:tracking-[0.2em] text-[10px] sm:text-sm mb-6 max-w-lg mx-auto">Experience our proven teaching methodology through video</p>
                    <div className="w-20 sm:w-24 h-1.5 sm:h-2 bg-[#FFC600] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {YOUTUBE_VIDEOS.map((video: VideoItem, index: number) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-slate-50 rounded-4xl sm:rounded-[2.5rem] overflow-hidden border-2 border-slate-100 group flex flex-col hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
                        >
                            {/* Video Player Container */}
                            <div className="aspect-video relative overflow-hidden bg-black">
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
                                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 pointer-events-none">
                                    <div className="bg-[#E31E24] text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5 sm:gap-2">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                                        Watch Now
                                    </div>
                                </div>
                            </div>

                            {/* Video Info Content */}
                            <div className="p-6 sm:p-8 flex flex-col grow">
                                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4">
                                    <h3 className="font-black text-[#004A99] text-lg sm:text-xl md:text-2xl uppercase leading-none tracking-tight group-hover:text-[#E31E24] transition-colors line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                                        <Info size={16} className="text-slate-300 sm:w-4.5 sm:h-4.5" />
                                    </div>
                                </div>

                                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                                    {video.description}
                                </p>

                                <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-200/60">
                                    <a
                                        href={`https://www.youtube.com/watch?v=${video.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 sm:gap-3 text-[#004A99] hover:text-[#E31E24] font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all group/link"
                                    >
                                        <span>Watch on YouTube</span>
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center group-hover/link:bg-[#E31E24] group-hover/link:text-white transition-all">
                                            <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
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
                    className="mt-16 sm:mt-24 bg-[#004A99] rounded-4xl sm:rounded-[3rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex flex-col items-center justify-center mb-6">
                            <div className="bg-[#E31E24] p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl mb-6 transform hover:rotate-6 transition-transform">
                                <Youtube size={40} className="text-white sm:w-12 sm:h-12" />
                            </div>
                            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter max-w-2xl">Want to see more of our results?</h4>
                        </div>
                        <p className="text-blue-100 font-bold mb-8 sm:mb-10 uppercase tracking-widest text-[10px] sm:text-sm opacity-90 max-w-2xl mx-auto">Subscribe to our channel for weekly educational content and student tips</p>
                        <a
                            href="https://www.youtube.com/@deepikachikkala3023"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 bg-[#FFC600] text-[#004A99] px-8 py-5 rounded-2xl font-black uppercase tracking-tighter text-xl hover:scale-105 hover:bg-[#FFE000] transition-all shadow-xl shadow-yellow-500/20 group/yt"
                        >
                            <div className="flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-sm">
                                    <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                                    <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <span>Visit YouTube Channel</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section >
    );
};

export default VideoGallery;
