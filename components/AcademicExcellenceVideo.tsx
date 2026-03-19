"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export default function AcademicExcellenceVideo() {
    return (
        <section id="testimonials" className="pt-24 pb-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-[#004A99] mb-4 uppercase tracking-tighter italic">
                            Student <span className="text-[#E31E24]">Testimonials & Experience</span>
                        </h2>
                        <div className="w-24 h-2 bg-[#FFC600] mx-auto rounded-full"></div>
                    </div>

                    {/* Video Container with Premium Styling */}
                    <div className="relative group/main-video rounded-4xl sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 border-8 border-white bg-slate-100 aspect-video lg:aspect-21/9">
                        <VideoPlayer src="/v2.mp4" />
                        
                        {/* Overlay Decorative Elements */}
                        <div className="absolute top-6 left-6 z-20">
                            <div className="bg-[#004A99]/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-white/20">
                                Campus Tour
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function VideoPlayer({ src }: { src: string }) {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
    
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isPlayingRef = useRef(false);

    const resetControlsTimer = () => {
        if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
        setShowControls(true);
        controlsTimerRef.current = setTimeout(() => {
            setShowControls(false);
        }, 2000);
    };

    // Audio Unlocker & Intersection Observer logic
    const isIntersectingRef = useRef(false);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        // Function to attempt unmuted playback
        const attemptPlayWithSound = async () => {
            try {
                // Try playing unmuted first
                v.muted = false;
                await v.play();
                setIsMuted(false);
                setIsPlaying(true);
            } catch (err) {
                // If blocked, play muted first
                v.muted = true;
                setIsMuted(true);
                await v.play().catch(() => {});
                setIsPlaying(true);
            }
        };

        // Handle scroll-into-view autoplay with focus logic - ONLY trigger when scrolled to
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isIntersectingRef.current = entry.isIntersecting;
                if (entry.isIntersecting) {
                    // When scrolled into view, attempt unmuted playback
                    attemptPlayWithSound();
                } else {
                    // When scrolled out, pause and mute to ensure no sound overlap
                    v.pause();
                    v.muted = true;
                    setIsMuted(true);
                }
            });
        }, { threshold: 0.7 }); // High threshold for very intentional scroll-activation

        observer.observe(v);

        // Master Audio Unlocker: Unmute on first user movement if still muted AND visible
        const unlock = () => {
            if (v && v.muted && isIntersectingRef.current) {
                v.muted = false;
                setIsMuted(false);
                if (v.paused) v.play().catch(() => {});
            }
            ['click', 'touchstart', 'scroll', 'mousedown', 'keydown'].forEach(evt => 
                window.removeEventListener(evt, unlock)
            );
        };

        ['click', 'touchstart', 'scroll', 'mousedown', 'keydown'].forEach(evt => 
            window.addEventListener(evt, unlock, { passive: true })
        );

        return () => {
            observer.disconnect();
            if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
            ['click', 'touchstart', 'scroll', 'mousedown', 'keydown'].forEach(evt => 
                window.removeEventListener(evt, unlock)
            );
        };
    }, [src]);

    // Sync state with DOM events
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onTimeUpdate = () => setProgress((v.currentTime / v.duration) * 100);
        const onLoaded = () => setDuration(v.duration);
        const onPlay = () => {
            setIsPlaying(true);
            isPlayingRef.current = true;
            resetControlsTimer();
        };
        const onPause = () => {
            setIsPlaying(false);
            isPlayingRef.current = false;
            resetControlsTimer();
        };

        v.addEventListener('timeupdate', onTimeUpdate);
        v.addEventListener('loadedmetadata', onLoaded);
        v.addEventListener('play', onPlay);
        v.addEventListener('pause', onPause);

        return () => {
            v.removeEventListener('timeupdate', onTimeUpdate);
            v.removeEventListener('loadedmetadata', onLoaded);
            v.removeEventListener('play', onPlay);
            v.removeEventListener('pause', onPause);
        };
    }, [isPlaying]);

    const togglePlay = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
        resetControlsTimer();
    };

    const toggleMute = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setIsMuted(v.muted);
        resetControlsTimer();
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const v = videoRef.current;
        const bar = e.currentTarget;
        if (!v || !bar) return;
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, x / rect.width));
        v.currentTime = pct * v.duration;
        setProgress(pct * 100);
        resetControlsTimer();
    };

    const toggleFullscreen = () => {
        const el = containerRef.current;
        if (!el) return;
        if (!document.fullscreenElement) {
            el.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen().catch(() => { });
        }
    };

    const formatTime = (s: number) => {
        if (!s || isNaN(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    return (
        <div 
            ref={containerRef} 
            className="w-full h-full relative group/player"
            onMouseMove={resetControlsTimer}
            onMouseEnter={resetControlsTimer}
            onTouchStart={resetControlsTimer}
            onTouchMove={resetControlsTimer}
            onMouseDown={resetControlsTimer}
            onKeyDown={resetControlsTimer}
        >
            <video
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                loop playsInline muted={isMuted} preload="none"
                src={src}
                onClick={() => {
                    if (showControls) togglePlay();
                    else resetControlsTimer();
                }}
                onContextMenu={(e) => e.preventDefault()}
            />

            {/* Muted Indicator (Show only if muted and playing) */}
            {isMuted && isPlaying && showControls && (
                <button
                    aria-label="Tap to unmute sound"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                    }}
                    className="absolute top-6 right-6 z-50 bg-[#E31E24] text-white px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2 animate-bounce hover:scale-105 transition-transform shadow-2xl"
                >
                    <VolumeX size={18} fill="currentColor" />
                    <span className="text-[12px] font-black uppercase tracking-widest whitespace-nowrap">Tap for Sound</span>
                </button>
            )}

            {/* Play Button Overlay - Visible when on tap */}
            {showControls && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <motion.button
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={(e) => togglePlay(e as any)}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl pointer-events-auto border border-white/30 hover:bg-white/40 transition-all"
                    >
                        {isPlaying ? <Pause size={40} className="text-white" fill="currentColor" /> : <Play size={40} className="text-white ml-2" fill="currentColor" />}
                    </motion.button>
                </div>
            )}

            {/* Premium Controls */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 z-40 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Progress Bar */}
                    <div onClick={handleSeek} className="h-2 w-full bg-white/20 rounded-full cursor-pointer relative group/bar">
                        <div className="absolute left-0 top-0 h-2 bg-[#E31E24] rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" style={{ left: `calc(${progress}% - 8px)` }} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <button aria-label={isPlaying ? "Pause video" : "Play video"} onClick={(e) => togglePlay(e as any)} className="text-white hover:text-[#FFC600] transition-colors p-1">
                                {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" />}
                            </button>
                            <span className="text-sm sm:text-base font-black font-mono text-white tracking-tighter">
                                {formatTime((progress/100) * duration)} <span className="text-white/40 mx-1">/</span> {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6">
                            <button aria-label={isMuted ? "Unmute sound" : "Mute sound"} onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="text-white hover:text-[#FFC600] transition-colors p-1">
                                {isMuted ? <VolumeX size={30} className="text-[#E31E24]" /> : <Volume2 size={30} />}
                            </button>
                            <button aria-label="Toggle full screen" onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="text-white hover:text-[#FFC600] transition-colors p-1">
                                <Maximize2 size={30} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
