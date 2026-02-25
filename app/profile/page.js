"use client"
import React, { useContext, useState, useEffect } from 'react';
import HomeLayout from "../components/HomeLayout";
import { ThemeContext } from '../context/ThemeContext';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import AvatarSet from '../components/AvatarSet';
import { FiMail, FiUser } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { MdSignalWifiOff } from 'react-icons/md';

/**
 * Profile page for viewing and updating the signed-in user's
 * display name and basic account details.
 */
const ProfilePage = () => {
  const { theme } = useContext(ThemeContext);
  const { data: session, status, update } = useSession();
  const username = session?.user?.name || "";
  const useremail = session?.user?.email || "";
  const user = { name: username, email: useremail }
  const [displayName, setDisplayName] = useState(user.name);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (status !== "authenticated") return;
    if (session?.user?.name) {
      setDisplayName(session.user.name);
    }
  }, [session?.user?.name]);

  // Persists profile changes and updates the active NextAuth session.
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Update backend mock database
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, displayName })
      });

      if (res.ok) {
        // 2. Trigger NextAuth session update on the client
        await update({ name: displayName });
        alert('Profile updated successfully!');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

if (status === 'unauthenticated') return (
        <div className="justify-center items-center flex flex-col gap-20 min-h-screen ">
            <MdSignalWifiOff className="w-20 h-20 text-[#31c47f] mx-auto mt-40" />
            <span className="ml-10">
                <h1 className="text-3xl ">Oops Something wen&apos;t wrong</h1>
                <br />
                <p className="text-start  ml-10">try:</p>
                <ul className="">
                    <li>- <a href="/login" className="text-[#31c47f] underline">Logging in again</a></li>
                    <li>- Reloading the page</li>
                    <li>- Checking your internet connection</li>
                    <li>- Clearing your browser cache</li>
                </ul>
            </span>
            {/* Opps something went wrong */}
        </div>
    );

  return (
    <HomeLayout>
      <main className='md:px-20 lg:px-40'>
        <a href='/settings' className={`text-sm font-medium hover:text-[#31c47f] transition-colors duration-300 flex items-center gap-2`}><FaArrowLeft /> Settings</a>
        <h1 className={`text-2xl font-bold ${theme ? 'text-white' : 'text-black'}`}>Profile</h1>
        <p className={`text-sm font-medium`}>Manage your account information</p>
        <div className='flex gap-4 items-center p-3'>
          <AvatarSet name={user.name} size={200} />
          <div className='flex items-left flex-col gap-1'>
            <h3 className={`text-[16px] font-bold mt-4 group-hover:text-[#31c47f] ${theme ? 'text-white' : 'text-black'}`}>Profile</h3>
            <p className='text-[14px] text-gray-600'>{user.email}</p>
          </div>
        </div>

        <div className='flex flex-col gap-5 mt-6'>
          <div className={`${theme ? 'bg-[#0e1116]' : 'bg-white'} p-5 shadow-md rounded-2xl`}>
            <form onSubmit={handleSave}>
              <div className='relative'>
                <label className={`${theme ? 'text-white' : 'text-black'}`}>Email</label>
                <input type="email" placeholder='Email' disabled className={`w-full pl-8 p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34] ' : 'bg-[#eaedf0] text-gray-400'}`} value={user.email} readOnly />
                <FiMail className='absolute left-2 top-11.5 text-lg' />
                <p className='text-[12px] ml-2'>Email cannot be changed</p>
              </div>
              <div className='mt-4 relative'>
                <label className={`${theme ? 'text-white' : 'text-black'}`}>Display Name</label>
                <input type="text" placeholder='Enter Your Display Name' className={`w-full pl-8 p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34] text-white' : 'bg-[#eaedf0] text-gray-400'}`} value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                <FiUser className='absolute left-2 top-11.5 text-lg' />
              </div>
              <button
                disabled={loading}
                className={`bg-[#31c47f] flex items-center gap-2 text-white px-4 py-2 rounded-lg mt-4 ${theme ? 'text-black' : 'text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className='inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : <FaSave />}
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}

export default ProfilePage;
