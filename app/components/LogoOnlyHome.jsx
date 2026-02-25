"use client"
import React,{useContext} from 'react';
import { ThemeContext } from '../context/ThemeContext';

// Enlarged logo mark used on the landing page hero area.
const LogoOnlyHome = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='flex items-center gap-3'>
        <div className={`w-24 h-24 rounded-2xl text-5xl bg-[#31c47f] flex items-center justify-center ${theme ? 'text-[#0e1015]' : 'text-white'}`}>
            SA
        </div>
    </div>
  );
}

export default LogoOnlyHome;
