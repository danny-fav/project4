"use client"
import React,{useContext} from 'react';
import { ThemeContext } from '../context/ThemeContext';

const LogoOnly = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='flex items-center gap-3'>
        <div className={`w-14 h-14 rounded-2xl text-2xl bg-[#31c47f] flex items-center justify-center ${theme ? 'text-[#0e1015]' : 'text-white'}`}>
            SA
        </div>
    </div>
  );
}

export default LogoOnly;
