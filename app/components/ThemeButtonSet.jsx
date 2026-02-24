"use client"
import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import {IoMdSunny, IoMdMoon, IoMdDesktop} from 'react-icons/io';

const ThemeButtonSet = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [themeMode, setThemeMode] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Initialize from saved mode or current theme
  useEffect(() => {
    const saved = localStorage.getItem('page-theme-mode');
    if (saved) {
      setThemeMode(saved);
    } else {
      setThemeMode(theme ? 'dark' : 'light');
    }
    setMounted(true);
  }, []);

  // Keep in sync when external `theme` changes (e.g. navbar toggles)
  useEffect(() => {
    const saved = localStorage.getItem('page-theme-mode');
    if (saved === 'system') {
      setThemeMode('system');
    } else {
      setThemeMode(theme ? 'dark' : 'light');
    }
  }, [theme]);

  // When user picks system mode, listen for OS preference changes
  useEffect(() => {
    if (themeMode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setTheme(e.matches);
    // init
    setTheme(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, [themeMode, setTheme]);

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('page-theme-mode', mode);
    if (mode === 'light') setTheme(false);
    else if (mode === 'dark') setTheme(true);
    else if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mq.matches);
    }
  };

  if (!mounted) return null;

  const buttonClass = 'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all text-sm';
  const activeClass = `${theme ? 'bg-[#0A0A0A] text-white' : 'bg-white'}`;
  const inactiveClass = `bg-transparent ${theme ? 'hover:text-white' : 'hover:text-black'}`;

  return (
    <div className='flex gap-3'>
      <button
        className={`${buttonClass} ${themeMode === 'light' ? activeClass : inactiveClass}`}
        onClick={() => handleThemeChange('light')}
        title='Light Theme'
      >
        <IoMdSunny size={14} />
        <span className='text-[14px]'>Light</span>
      </button>
      <button
        className={`${buttonClass} ${themeMode === 'dark' ? activeClass : inactiveClass}`}
        onClick={() => handleThemeChange('dark')}
        title='Dark Theme'
      >
        <IoMdMoon size={14} />
        <span className='text-[14px]'>Dark</span>
      </button>
      <button
        className={`${buttonClass} ${themeMode === 'system' ? activeClass : inactiveClass}`}
        onClick={() => handleThemeChange('system')}
        title='System Theme'
      >
        <IoMdDesktop size={14} />
        <span className='text-[14px]'>System</span>
      </button>
    </div>
  );
};

export default ThemeButtonSet;
