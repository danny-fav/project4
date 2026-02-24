"use client"
import React, { useEffect, useState, useContext } from 'react';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Preloader component that covers the entire screen while the application
 * is initializing or performing major state changes.
 * 
 * It listens to the global theme context to stay consistent with the user's preference.
 */
const Preloader = ({ loading }) => {
    const { theme } = useContext(ThemeContext);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!loading) {
            // Delay removal to allow fade-out animations to complete smoothly
            const timer = setTimeout(() => setIsVisible(false), 800);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
    }, [loading]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${loading ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'} ${theme ? 'bg-[#0A0A0A]' : 'bg-[#F7F9FB]'}`}
        >
            {/* Logo/Icon Animation - Pulsing trophy icon */}
            <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-[#31c47f]/20 animate-ping"></div>
                <div className={`relative ${theme ? 'bg-[#151921]' : 'bg-white'} p-6 rounded-3xl border border-[#31c47f]/20 shadow-2xl shadow-[#31c47f]/10`}>
                    <HiOutlineTrophy className="text-6xl text-[#31c47f] animate-pulse" />
                </div>
            </div>

            {/* App Name with theme-aware colors */}
            <h1 className={`text-3xl font-black tracking-tighter mb-2 ${theme ? 'text-white' : 'text-[#151921]'}`}>
                SCORE<span className="text-[#31c47f]">ARENA</span>
            </h1>

            {/* Loading Indicator - Bar and pulsing text */}
            <div className="flex flex-col items-center">
                <div className={`w-48 h-1 ${theme ? 'bg-white/5' : 'bg-black/5'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-[#31c47f] w-1/2 animate-[loading_1.5s_infinite_ease-in-out] origin-left"></div>
                </div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 animate-pulse">
                    Initializing Sport Data
                </p>
            </div>

            {/* Custom animation for the loading bar progress */}
            {/* <style jsx>{`
                @keyframes loading {
                    0% { transform: scaleX(0); left: 0; }
                    50% { transform: scaleX(0.5); left: 25%; }
                    100% { transform: scaleX(0); left: 100%; }
                }
            `}</style> */}
        </div>
    );
};

export default Preloader;
