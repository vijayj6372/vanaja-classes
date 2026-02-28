"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Award, Target, Zap, BookOpen, Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-20 overflow-hidden bg-white">
            {/* Dynamic Background Graphics */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#004A99]/5 to-transparent rounded-l-[200px] hidden lg:block"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00ADEF]/10 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center lg:text-left lg:col-span-5"
                >
                    {/* Admissions Badge */}
                    <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#E31E24] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 shadow-lg shadow-red-200 animate-pulse">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></span>
                        <span className="text-[10px] sm:text-sm font-black uppercase tracking-widest">Admissions Open 2025-26</span>
                    </div>

                    <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#004A99] leading-none lg:leading-[0.9] mb-4 uppercase tracking-tighter">
                        Vanaja <br />
                        <span className="text-[#E31E24]">Classes</span>
                        <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-4 text-slate-500 font-bold tracking-widest lg:tracking-[0.15em] border-l-4 lg:border-l-8 border-[#FFC600] pl-4 lg:pl-6 mx-auto lg:mx-0 w-fit">
                            BHARUCH, GUJARAT
                        </span>
                    </h1>

                    {/* Key Programs Focus */}
                    <div className="mb-8 mt-8 sm:mt-10">
                        <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.3em] lg:tracking-[0.4em] mb-4">Leading Institute for:</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                            <div className="bg-[#004A99] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/10 transform hover:scale-105 transition-transform cursor-default">
                                <Target size={14} className="text-[#FFC600]" />
                                <span className="font-black text-xs sm:text-base lg:text-lg uppercase tracking-tight">IIT-JEE</span>
                            </div>
                            <div className="bg-[#E31E24] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/10 transform hover:scale-105 transition-transform cursor-default">
                                <Award size={14} className="text-[#FFC600]" />
                                <span className="font-black text-xs sm:text-base lg:text-lg uppercase tracking-tight">NEET</span>
                            </div>
                            <div className="bg-[#00ADEF] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/10 transform hover:scale-105 transition-transform cursor-default">
                                <Zap size={14} className="text-[#FFC600]" />
                                <span className="font-black text-xs sm:text-base lg:text-lg uppercase tracking-tight">GUJCET</span>
                            </div>
                            <div className="bg-slate-800 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/10 transform hover:scale-105 transition-transform cursor-default">
                                <BookOpen size={14} className="text-[#FFC600]" />
                                <span className="font-black text-xs sm:text-base lg:text-lg uppercase tracking-tight">11-12 SCI</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 sm:mb-8">
                        <p className="text-base sm:text-xl lg:text-2xl font-bold text-slate-700 uppercase tracking-tight leading-tight">
                            Personal Care for Every Student
                        </p>
                    </div>

                    <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-lg mb-8 sm:mb-10 leading-relaxed font-medium italic mx-auto lg:mx-0">
                        "We believe that every student has the potential to excel. Our personalized teaching methods ensure no one is left behind in the competitive race."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                        <a
                            href="https://wa.me/917226004200"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-[#004A99] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-xl hover:bg-blue-900 transition-all shadow-2xl flex items-center justify-center gap-2 uppercase tracking-tighter"
                        >
                            Inquiry Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <Link
                            href="/brochure"
                            className="bg-white border-2 sm:border-4 border-[#FFC600] text-[#004A99] px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-xl hover:bg-yellow-50 transition-all shadow-xl uppercase tracking-tighter text-center"
                        >
                            Brochure
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative mt-8 lg:mt-0 lg:col-span-7"
                >
                    {/* Main Visual Frame */}
                    <div className="relative z-10 p-4 sm:p-8 bg-white rounded-3xl sm:rounded-[3rem] shadow-2xl border border-slate-100 transform lg:rotate-2 w-full max-w-4xl mx-auto">
                                <div className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden relative w-full mx-auto h-56 sm:h-90 md:h-120 lg:h-140 xl:h-160">
                                    {/* Autoplay video inside visual card - place MP4 at /public/VANAJA_COACHING_CLASSES_-_Intro_1080P.mp4 */}
                                    <VideoPlayer />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#004A99]/60 to-transparent"></div>

                            {/* Location Tag */}
                            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-white border border-white/30">
                                <MapPin size={14} className="sm:w-3.5 sm:h-3.5 w-3 h-3" />
                                <span className="text-[8px] sm:text-xs font-black uppercase tracking-widest">Bharuch, Gujarat</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Accents */}
                    <div className="absolute -top-4 -left-4 sm:-top-10 sm:-left-10 w-16 h-16 sm:w-32 sm:h-32 bg-[#FFC600] rounded-xl sm:rounded-3xl -z-10"></div>

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-6 sm:top-20 -right-2 sm:-right-8 bg-white p-3 sm:p-6 rounded-lg sm:rounded-2xl shadow-2xl z-20 border-l-2 sm:border-l-8 border-[#00ADEF]"
                    >
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="text-xl sm:text-3xl font-black text-[#004A99]">850+</div>
                            <div className="text-[6px] sm:text-[10px] font-black uppercase text-slate-400 tracking-widest">JEE / NEET<br />Qualifiers</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function VideoPlayer() {
    const [isMuted, setIsMuted] = useState(false); // attempt with sound ON
    const [isPlaying, setIsPlaying] = useState(true);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.9);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        // set initial volume
        try { v.volume = volume; } catch {}
        v.muted = false;

        const tryPlay = async () => {
            try {
                await v.play();
                setIsPlaying(true);
            } catch (e) {
                // autoplay with sound blocked -> fallback to muted autoplay
                v.muted = true;
                setIsMuted(true);
                setAutoplayBlocked(true);
                try { await v.play(); setIsPlaying(true); } catch {}
            }
        };

        tryPlay();

        const onTime = () => {
            if (!v || !v.duration) return;
            setProgress((v.currentTime / v.duration) * 100);
        };

        const onLoaded = () => {
            if (!v) return;
            setDuration(v.duration || 0);
        };

        v.addEventListener('timeupdate', onTime);
        v.addEventListener('loadedmetadata', onLoaded);
        return () => {
            v.removeEventListener('timeupdate', onTime);
            v.removeEventListener('loadedmetadata', onLoaded);
        };
    }, []);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play().catch(() => {});
            setIsPlaying(true);
        } else {
            v.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const v = videoRef.current;
        if (!v) return;
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        v.muted = newMuted;
        if (!newMuted) {
            v.play().catch(() => {});
            setAutoplayBlocked(false);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const v = videoRef.current;
        const bar = e.currentTarget;
        if (!v || !bar) return;
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, x / rect.width));
        v.currentTime = pct * (v.duration || 0);
        setProgress(pct * 100);
    };

    const handleVolume = (val: number) => {
        const v = videoRef.current;
        if (!v) return;
        const newVol = Math.max(0, Math.min(1, val));
        setVolume(newVol);
        v.volume = newVol;
        if (newVol > 0) {
            setIsMuted(false);
            v.muted = false;
        }
    };

    const toggleFullscreen = () => {
        const el = containerRef.current;
        if (!el) return;
        // @ts-ignore
        if (!document.fullscreenElement) {
            // @ts-ignore
            el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
        } else {
            // @ts-ignore
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        }
    };

    const formatTime = (s: number) => {
        if (!s || isNaN(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    return (
        <div ref={containerRef} className="w-full h-full relative bg-black">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                playsInline
                preload="metadata"
                src="/VANAJA_COACHING_CLASSES_-_Intro_1080P.mp4"
            />

            {/* Big center play/pause overlay for UX */}
            {!isPlaying && (
                <button
                    onClick={togglePlay}
                    aria-label="Play"
                    className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl z-30"
                >
                    <Play size={24} />
                </button>
            )}

            {/* Controls bar */}
            <div className="absolute left-0 right-0 bottom-0 z-40 p-3 sm:p-4 bg-linear-to-t from-black/60 to-transparent">
                <div className="max-w-full mx-auto flex items-center gap-3">
                    <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} className="p-2 sm:p-3 bg-white/95 rounded-full shadow-md">
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <div className="flex-1">
                        <div onClick={handleSeek} className="h-2 w-full bg-white/20 rounded cursor-pointer relative">
                            <div className="absolute left-0 top-0 h-2 bg-[#E31E24] rounded" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/90 mt-1">
                            <div>{formatTime((progress / 100) * duration)}</div>
                            <div>{formatTime(duration)}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-3">
                        <button onClick={toggleMute} className="p-2 sm:p-3 bg-white/95 rounded-full shadow-md" aria-label={isMuted ? 'Unmute' : 'Mute'}>
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => handleVolume(Number(e.target.value))} className="w-20 sm:w-28" />
                        <button onClick={toggleFullscreen} className="p-2 sm:p-3 bg-white/95 rounded-full shadow-md" aria-label="Fullscreen">
                            <Maximize2 size={16} />
                        </button>
                    </div>
                </div>
                {autoplayBlocked && <div className="mt-2 text-xs text-white/90">Autoplay with sound was blocked — tap the speaker icon to enable audio.</div>}
            </div>
        </div>
    );
}
