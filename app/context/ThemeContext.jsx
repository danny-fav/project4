"use client"
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('page-theme');
    if (savedTheme !== null) {
      setTheme(savedTheme === 'dark');
    }
    setMounted(true);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('page-theme', theme ? 'dark' : 'light');
      
      // Update CSS variables based on theme
      const root = document.documentElement;
      if (theme) {
        // Dark theme
        root.style.setProperty('--background', '#0A0A0A');
        root.style.setProperty('--foreground', '#F7F9FB');
      } else {
        // Light theme
        root.style.setProperty('--background', '#F7F9FB');
        root.style.setProperty('--foreground', '#171717');
      }
    }
  }, [theme, mounted]);

  const lightTheme = {
    background: `#F7F9FB`,
    transition: 'all 0.5s ease',
    color: '#657081',
  };

  const darkTheme = {
    background: `#0A0A0A`,
    transition: 'all 0.5s ease',
    color: '#707d8f',
  };

  const themeStyle = theme === false ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};
