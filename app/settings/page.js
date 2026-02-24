"use client";
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import HomeLayout from "../components/HomeLayout";
import AvatarSet from '../components/AvatarSet';
import { FaCog } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import ThemeButtonSet from '../components/ThemeButtonSet';
import { useSession } from 'next-auth/react';
import App from '../components/App';

const SettingsPage = () => {
  const { theme } = useContext(ThemeContext);
  const { data: session, status } = useSession();
  const username = session?.user?.name || "";
  const useremail = session?.user?.email || "";
  const user = { name: username, email: useremail }
  return (
    <HomeLayout>
      <h1 className={`text-2xl font-bold ${theme ? 'text-white' : 'text-black'}`}>Settings</h1>
      <div className='flex flex-col gap-5'>
        <div className={`${theme ? 'bg-[#0e1116]' : 'bg-white'} flex items-center group justify-between p-3 rounded-2xl shadow-md mt-6 hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer hover:border-2 hover:border-[#31c47f] hover:border-[1px]`}>
          <a href='/profile' className='flex items-center gap-4'>
            <div className='flex gap-4 items-center justify-center'>
              <AvatarSet name={user.name} size={200} />
              <div className='flex items-left flex-col mx-auto gap-1'>
                <h3 className={`text-[16px] font-bold mt-4 group-hover:text-[#31c47f] ${theme ? 'text-white' : 'text-black'}`}>Profile</h3>
                <p className='text-[14px] text-gray-600'>{user.email}</p>
              </div>
            </div>
          </a>
          <div>
            <p className='text-2xl group-hover:text-[#31c47f]'>&#8250;</p>
          </div>
        </div>

        <div className={`${theme ? 'bg-[#0e1116]' : 'bg-white'} p-5 shadow-md rounded-2xl`}>
          <h3 className='flex items-center gap-2 text-lg font-bold mt-6'><FaCog /> <span className={`${theme ? 'text-white' : 'text-black'}`}>Preferences</span></h3>
          <div>
            <p className={`mt-3 ${theme ? 'text-white' : 'text-black'}`}>Appearance</p>
            <div className={`flex p-1 rounded-xl mt-2 w-fit ${theme ? 'bg-[#272b34]' : 'bg-[#eaedf0]'}`}>
              <ThemeButtonSet />
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className="cursor-pointer border border-l-red-700 bg-red-700/15 text-red-700 rounded-xl p-2 flex items-center gap-2"><MdLogout /> Sign Out</div>
        </div>
        
      </div>
    </HomeLayout>
  );
}

export default SettingsPage;
