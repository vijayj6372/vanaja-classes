"use client";
import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppFloating: React.FC = () => {
    return (
        <div className="fixed bottom-8 right-8 z-[100] group flex items-center">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mr-3 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block"
            >
                <span className="text-[#004A99] font-black text-sm whitespace-nowrap">Chat with us on WhatsApp</span>
            </motion.div>

            <motion.a
                href="https://wa.me/918128421630"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#128C7E] transition-all border-4 border-white overflow-visible"
                aria-label="Contact us on WhatsApp"
            >
                <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10"
                >
                    <path d="M12 2C6.477 2 2 6.145 2 11.667c0 2.04.605 4.02 1.75 5.708L2 22l4.75-1.708A9.91 9.91 0 0 0 12 21.333c5.523 0 10-4.145 10-9.666C22 6.145 17.523 2 12 2zm0 17.667a8.01 8.01 0 0 1-4.09-1.126l-.292-.173-2.818 1.012.94-2.88-.19-.298A7.676 7.676 0 0 1 4 11.667C4 7.28 7.588 3.667 12 3.667s8 3.613 8 8c0 4.387-3.588 8-8 8zm4.507-5.6c-.245-.123-1.447-.712-1.67-.792-.223-.08-.386-.123-.55.123-.164.246-.633.792-.776.956-.143.164-.286.185-.53.062-.245-.123-1.034-.38-1.97-1.21-.73-.65-1.223-1.454-1.366-1.7-.143-.246-.015-.378.108-.5.11-.11.245-.287.367-.43.123-.143.164-.246.245-.41.08-.164.04-.307-.02-.43-.06-.123-.55-1.323-.755-1.812-.2-.48-.402-.415-.55-.423l-.47-.008c-.164 0-.43.062-.653.307-.223.246-.857.836-.857 2.04 0 1.205.877 2.37 1 2.533.123.164 1.727 2.64 4.19 3.703.586.253 1.043.405 1.4.52.588.186 1.123.16 1.545.097.47-.07 1.447-.592 1.65-1.164.204-.572.204-1.062.143-1.164-.06-.103-.223-.164-.47-.287z" />
                </svg>
            </motion.a>
        </div>
    );
};

export default WhatsAppFloating;
