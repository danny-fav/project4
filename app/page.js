"use client";
import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import ThemeButton from './components/ThemeButton';
import { useState } from 'react';
import LogoOnlyHome from './components/LogoOnlyHome';
import Link from 'next/link';

/**
 * Landing page that introduces ScoreArena and routes users
 * to account creation or login.
 */
const page = () => {
    const { theme } = useContext(ThemeContext);
  return (
    <>
    <div className={`absolute top-4 right-4 flex items-center justify-center w-10 h-10 p-2 shadow rounded-2xl ${theme ? 'bg-[#272b34]' : 'bg-[#eaedf0]'}`}><ThemeButton/></div>
    
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center gap-2 mb-3'>
            <LogoOnlyHome/>
            <h1 className='text-3xl md:text-5xl font-bold mt-5'>Welcome to ScoreArena</h1>
            <p className='text-lg text-gray-500 mt-3'>Your go-to app for the latest sport updates.</p>
            <p className='mt-5 font-bold text-2xl md:text-3xl'>Let&apos;s get you started</p>
            <div className='flex items-center gap-3 mt-5'>
              <Link href="/register" className={`text-md md:text-2xl cursor-pointer px-6 py-2 rounded-lg bg-transparent border border-[#31c47f] text-[#31c47f] hover:bg-[#31c47f] ${theme ? 'hover:text-black' : 'hover:text-white'}`}>Create Account</Link>
              <Link href="/login" className={`text-md md:text-2xl cursor-pointer px-16 py-2 rounded-lg bg-[#31c47f] border border-transparent hover:bg-transparent hover:text-[#31c47f] hover:border-[#31c47f] ${theme ? 'text-black' : 'text-white'}`}>Log in</Link>
            </div>
        </div>
        
      </div>
    </>
  );
}

export default page;
