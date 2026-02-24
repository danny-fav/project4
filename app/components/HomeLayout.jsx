"use client";
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Navbar from './Navbar';

export default function HomeLayout({ children }) {
  const { themeStyle } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Set initial value
    setIsLargeScreen(window.innerWidth >= 1024);

    // Handle resize
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const marginLeft = isLargeScreen ? (open ? '88px' : '256px') : '0px';

  return (
    <div className='min-h-screen font-sans' style={themeStyle}>
      <Navbar setOpen={setOpen} open={open} />
      <main className='p-4 mt-20 transition-all duration-300' style={{ marginLeft }}>
        {children}
      </main>
    </div>
  );
}