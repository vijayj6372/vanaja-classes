"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
    { src: '/i1.png', alt: 'Vanaja Classes Slider 1' },
    { src: '/i2.png', alt: 'Vanaja Classes Slider 2' },
    { src: '/i3.jpg', alt: 'Vanaja Classes Slider 3' },
    { src: '/i4.jpg', alt: 'Vanaja Classes Slider 4' },
    { src: '/i5.png', alt: 'Vanaja Classes Slider 5' },
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
        <div className="relative w-full h-[350px] xs:h-[450px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] mb-12 bg-slate-900 border-4 sm:border-12 border-white rounded-4xl sm:rounded-[4rem]">
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
                    className="absolute inset-0 cursor-grab active:cursor-grabbing p-4 sm:p-8 md:p-12"
                >
                    <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        quality={80}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 80vw, 1600px"
                        className="object-contain transition-transform duration-700"
                        priority={currentIndex === 0}
                        fetchPriority={currentIndex === 0 ? "high" : "low"}
                    />

                    {/* Multi-layered Premium Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20 pointer-events-none"></div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots - Premium Design */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-5 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className="relative h-4 group/dot"
                        aria-label={`Slide ${index + 1}`}
                        title={`Go to slide ${index + 1}`}
                    >
                        <div className={`transition-all duration-500 rounded-full ${currentIndex === index
                            ? 'w-16 bg-[#FFC600] ring-6 ring-yellow-400/30'
                            : 'w-4 bg-white/70 group-hover/dot:bg-white group-hover/dot:scale-125'
                            } h-full shadow-2xl`} />
                        {currentIndex === index && (
                            <div className="absolute inset-0 blur-xl bg-yellow-400 opacity-60 animate-pulse"></div>
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
