"use client"
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const AvatarSet = ({ name = "User" }) => {
      const { theme } = useContext(ThemeContext);
  const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2);

  // Pair your background hex with a matching deep shade of that same color
  const themes = [
    { bg: `${theme ? 'bg-[#31c47f]' : 'bg-[#31c47f]'}`, text: `${theme ? 'text-[#06371f]' : 'text-[#bfeed6]'}` }, // Deep Green on Green
    { bg: 'bg-[#707d8f]', text: 'text-[#1e252e]' }, // Deep Slate on Slate
    { bg: 'bg-[#31c47f1a]', text: 'text-[#31c47f]' } // Main Green on Transparent Green
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
    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-black text-lg tracking-tighter select-none ${themez.bg} ${themez.text}`}>
      {initials}
    </div>
  );
};

export default AvatarSet;
