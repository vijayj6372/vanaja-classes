import React from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
    // Size configurations avoiding transform: scale to fix layout issues
    const sizeConfig = {
        sm: {
            container: 'gap-2',
            icon: 'w-9 h-10',
            title: 'text-lg md:text-xl',
            subtitle: 'text-[7px] md:text-[8px]',
        },
        md: {
            container: 'gap-3',
            icon: 'w-14 h-16',
            title: 'text-3xl md:text-4xl',
            subtitle: 'text-[10px] md:text-[11px]',
        },
        lg: {
            container: 'gap-4',
            icon: 'w-16 h-20',
            title: 'text-4xl md:text-5xl',
            subtitle: 'text-xs md:text-sm',
        },
    };

    const { container, icon, title, subtitle } = sizeConfig[size];

    return (
        <div className={`flex items-center ${container} ${className}`}>
            {/* Recreating the Owl Mascot with Graduation Cap */}
            <div className={`relative ${icon} shrink-0`}>
                <svg viewBox="0 0 100 120" className="w-full h-full">
                    {/* Owl Body */}
                    <path d="M50 20 C25 20 15 45 15 75 C15 105 30 115 50 115 C70 115 85 105 85 75 C85 45 75 20 50 20Z" fill="#004A99" />
                    <path d="M50 35 C35 35 25 50 25 75 C25 95 35 105 50 105 C65 105 75 95 75 75 C75 50 65 35 50 35Z" fill="#00ADEF" />

                    {/* Owl Belly Pattern */}
                    <path d="M40 85 Q50 90 60 85 M40 95 Q50 100 60 95 M40 75 Q50 80 60 75" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />

                    {/* Eyes */}
                    <circle cx="38" cy="65" r="14" fill="white" />
                    <circle cx="62" cy="65" r="14" fill="white" />
                    <circle cx="38" cy="65" r="8" fill="#004A99" />
                    <circle cx="62" cy="65" r="8" fill="#004A99" />
                    <circle cx="36" cy="63" r="3" fill="white" />
                    <circle cx="60" cy="63" r="3" fill="white" />

                    {/* Beak */}
                    <path d="M50 72 L44 80 L56 80 Z" fill="#FFC600" />

                    {/* Graduation Cap */}
                    <path d="M15 35 L50 15 L85 35 L50 55 Z" fill="#FFC600" />
                    <path d="M25 35 L25 45 Q50 60 75 45 L75 35" fill="#FFC600" stroke="#004A99" strokeWidth="1" />
                    <path d="M15 35 L15 55" stroke="#FFC600" strokeWidth="2" />

                    {/* Feet */}
                    <circle cx="35" cy="115" r="4" fill="#FFC600" />
                    <circle cx="42" cy="115" r="4" fill="#FFC600" />
                    <circle cx="58" cy="115" r="4" fill="#FFC600" />
                    <circle cx="65" cy="115" r="4" fill="#FFC600" />

                    {/* Perch */}
                    <rect x="20" y="112" width="60" height="3" rx="1.5" fill="#004A99" />
                </svg>
            </div>

            {/* Brand Text */}
            <div className="flex flex-col leading-none">
                <span className={`${title} font-serif font-black tracking-tight text-[#E31E24] uppercase`}>
                    VANAJA
                </span>
                <span className={`${subtitle} font-sans font-bold text-[#004A99] tracking-widest uppercase mt-0.5 whitespace-nowrap`}>
                    Personal Care Coaching Classes
                </span>
            </div>
        </div>
    );
};

export default Logo;
