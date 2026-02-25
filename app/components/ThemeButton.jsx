"use client"
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import {IoMdSunny, IoMdMoon} from 'react-icons/io';

// Compact theme toggle used in headers and auth pages.
const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button className='cursor-pointer' onClick={() => setTheme(prev => !prev)}>
      {theme ? <IoMdSunny /> : <IoMdMoon />}
    </button>
  );
};

export default ThemeButton;
