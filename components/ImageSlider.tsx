"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
    { src: '/i1.png', alt: 'Vanaja Classes Slider 1' },
    { src: '/i2.png', alt: 'Vanaja Classes Slider 2' },
    { src: '/i3.png', alt: 'Vanaja Classes Slider 3' },
    { src: '/i4.jpg', alt: 'Vanaja Classes Slider 4' },
    { src: '/i5.png', alt: 'Vanaja Classes Slider 5' },
    { src: '/priyesha.png', alt: 'Vanaja Classes Slider 6' },
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => paginate(1), 6000); // Slightly slower for better viewing
        return () => clearInterval(timer);
    }, [paginate]);

    return (
        <div className="relative w-full h-[250px] xs:h-[320px] sm:h-[420px] md:h-[480px] lg:h-[550px] xl:h-[600px] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] mb-8 bg-slate-950 border-4 sm:border-8 border-white rounded-3xl sm:rounded-[3rem]">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 300 : -300, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction > 0 ? -300 : 300, scale: 0.95 }}
                    transition={{
                        x: { type: "spring", stiffness: 200, damping: 25 },
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x * velocity.x;
                        if (swipe < -800) {
                            paginate(1);
                        } else if (swipe > 800) {
                            paginate(-1);
                        }
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                    {/* Dynamic Blurred Background to eliminate black bars */}
                    <div className="absolute inset-0 overflow-hidden">
                        <Image
                            src={images[currentIndex].src}
                            alt=""
                            fill
                            className="object-cover blur-[60px] opacity-40 scale-125"
                            aria-hidden="true"
                        />
                    </div>

                    <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        quality={90}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 80vw, 1600px"
                        className="object-contain transition-transform duration-700 relative z-10"
                        priority={currentIndex === 0}
                    />

                    {/* Refined Premium Overlays - Removed heavy black gradients */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-15 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-black/10 via-transparent to-black/10 z-15 pointer-events-none"></div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots - Ultra Compact Design */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className="relative h-1 group/dot"
                        aria-label={`Slide ${index + 1}`}
                        title={`Go to slide ${index + 1}`}
                    >
                        <div className={`transition-all duration-500 rounded-full ${currentIndex === index
                            ? 'w-6 sm:w-10 bg-[#FFC600] ring-2 ring-yellow-400/20'
                            : 'w-1 bg-white/50 group-hover/dot:bg-white group-hover/dot:scale-110'
                            } h-full shadow-inner`} />
                        {currentIndex === index && (
                            <div className="absolute inset-0 blur-md bg-yellow-400 opacity-30 animate-pulse"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Visual Callout */}
            <div className="absolute top-8 left-8 z-20 hidden sm:flex items-center gap-4">
                <div className="bg-[#E31E24] text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-[0.4em] shadow-2xl border border-white/30 backdrop-blur-md">
                    Campus Gallery
                </div>
            </div>

            {/* Navigation Hint */}
            <div className="absolute top-8 right-8 z-20 hidden md:block">
                <div className="bg-white/20 backdrop-blur-2xl border border-white/30 px-8 py-3 rounded-full text-white font-black uppercase tracking-[0.4em] pointer-events-none opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    Swipe to Explore
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
