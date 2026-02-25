"use client"
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// Small initials avatar used in nav menus and compact user touchpoints.
const Avatar = ({ name = "User" }) => {
    const { theme } = useContext(ThemeContext);
  const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2);

  // Pair your background hex with matching light/dark variants so colors adapt
  const themes = [
    // Green: bright in light, richer in dark; text switches to readable contrast
    { bg: `${theme ? 'bg-[#31c47f]' : 'bg-[#31c47f]'}`, text: `${theme ? 'text-[#06371f]' : 'text-[#bfeed6]'}` },
  ];

  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % themes.length;
  };

  const themez = themes[getHash(name)];

  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-xs tracking-tighter select-none transition-all duration-300 ${themez.bg} ${themez.text}`}>
      {initials}
    </div>
  );
};

export default Avatar;
