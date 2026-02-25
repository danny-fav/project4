"use client";
import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from '../context/ThemeContext';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { MdFiberManualRecord, MdGroup } from 'react-icons/md';
import { FaCog } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';

/**
 * Mobile navigation drawer rendered through a portal so it can
 * overlay the full screen independent of parent stacking contexts.
 */
const Navphone = () => {
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const { theme } = useContext(ThemeContext);
    const pathname = usePathname();
    const links = [
        { href: "/dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
        { href: "/leagues", label: "Leagues", icon: <HiOutlineTrophy />  },
        { href: "/teams", label: "Teams", icon: <MdGroup/>  },
        { href: "/live", label: "Live Matches", icon: <div className="live-container"><MdFiberManualRecord className="live-icon" /></div> },
        { href: "/settings", label: "Settings", icon: <FaCog />  },
    ];
    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div>
            {/* Menu toggle button */}
            <button
                onClick={() => setOpen(true)}
                className={`text-2xl bg-transparent border-none cursor-pointer ${theme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
            >
                <FiMenu />
            </button>

            {/* Portal for menu overlay */}
            {mounted && ReactDOM.createPortal(
                <>
                    {/* Backdrop overlay */}
                    <div
                        className={`fixed inset-0 z-98 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${theme ? 'bg-black/70' : 'bg-black/30'}`}
                        onClick={() => setOpen(false)}
                    />

                    {/* Slide-in menu from right */}
                    <div
                        className={`fixed top-0 left-0 h-full w-64 z-99 shadow-2xl transform transition-transform duration-500 ease-out ${open ? 'translate-x-0' : '-translate-x-full'} ${theme ? 'bg-[#0e1116]' : 'bg-white'}`}
                    >
                        {/* Close button inside panel */}
                        <button
                            onClick={() => setOpen(false)}
                            className={`absolute top-4 right-4 text-2xl bg-transparent border-none cursor-pointer ${theme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                        >
                            <FiX />
                        </button>

                        {/* Navigation links */}
                        <div className="flex flex-col items-center gap-8 mt-16 p-6">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`text-sm font-medium flex items-center tracking-wider transition-colors ${pathname === link.href
                                        ? 'text-[#31c47f] bg-[#31c47f1a] w-full text-left p-3 rounded-lg shadow-md'
                                        : theme
                                            ? 'text-[#707d8f] hover:text-white hover:bg-gray-500/20 w-full text-left p-3 rounded-lg shadow-md'
                                            : 'text-gray-700 hover:text-black hover:bg-[#31c47f1a] w-full text-left p-3 rounded-lg shadow-md'
                                        }`}
                                >
                                    {link.icon && <span className="mr-2">{link.icon}</span>}
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>,
                document.body
            )}
        </div>
    );
}

export default Navphone;
