"use client"
import React,{useContext} from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Link from 'next/link';

// Primary brand lockup used in navigation, linking back to dashboard.
const Logo = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='flex items-center gap-3'>
      <Link href='/dashboard' className='flex gap-2 items-center'>
        <div className={`w-8 h-8 rounded-xl bg-[#31c47f] flex items-center justify-center ${theme ? 'text-[#0e1015]' : 'text-white'}`}>
            SA
        </div>
      <p className='hidden md:block md:text-xl lg:text-2xl font-bold tracking-wider text-[#31c47f]'>ScoreArena</p>
      </Link>
    </div>
  );
}

export default Logo;
