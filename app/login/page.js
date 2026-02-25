"use client";
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiCheck, FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';
import LogoOnly from '../components/LogoOnly';
import ThemeButton from '../components/ThemeButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

/**
 * Login page that authenticates users with NextAuth credentials
 * and redirects to the dashboard on success.
 */
const page = () => {
  const { theme } = useContext(ThemeContext);
  const [see, setSee] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handles credentials submission and controls the UI loading/success states.
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      console.log(res.error);
      setError(res.error);
      setLoading(false);
      return;
    }

    // success: show animation then redirect
    setSuccess(true);
    setLoading(false);
    await new Promise((r) => setTimeout(r, 700));
    router.replace('/dashboard');
  }

  return (
    <>
      <div className={`absolute top-4 right-4 flex items-center justify-center w-10 h-10 p-2 shadow rounded-2xl ${theme ? 'bg-[#272b34]' : 'bg-[#eaedf0]'}`}><ThemeButton /></div>

      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center gap-2 mb-3'>
          <LogoOnly />
          <h1 className='text-2xl font-bold'>ScoreArena</h1>
          <p className='text-sm text-gray-500 w-[70%] md:w-full text-center'>Welcome back! Sign in to continue.Create your account to get started!</p>
        </div>
        <div className={` w-90 md:w-120 shadow rounded-xl p-6 ${theme ? 'bg-[#0e1116]' : 'bg-white'}`}>
          <form onSubmit={handleSubmit} className='relative flex flex-col gap-4 mt-6 w-full max-w-md'>
            <div className={`flex gap-3 w-full p-1 rounded-lg ${theme ? 'bg-[#272b34]' : 'bg-[#eaedf0]'}`}>
              <a href='/login' className={`flex-1 text-center text-sm font-medium py-2 rounded-lg shadow transition-colors duration-200 ${theme ? 'bg-[#0e1116] text-white' : 'bg-white text-black'}`}>Sign In</a>
              <a href='/register' className={`flex-1 text-center text-sm font-medium bg-transparent py-2 transition-colors duration-200 ${theme ? 'text-white' : 'text-black'}`}>Sign Up</a>
            </div>
            <div className='relative'>
              <label className={`text-[14px] ${theme ? 'text-white' : 'text-black'}`}>Email</label>
              <input name='email' type="email" placeholder='Email' className={`w-full pl-8 p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34] ' : 'bg-[#eaedf0] text-gray-400'}`} />
              <FiMail className='absolute left-2 top-11.5 text-lg' />
            </div>
            <div className='relative'>
              <label className={`text-[14px] ${theme ? 'text-white' : 'text-black'}`}>Password</label>
              <input name='password' type={see ? "text" : "password"} placeholder='Password' className={`w-full pl-8 p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34] text-white' : 'bg-[#eaedf0] text-gray-400'}`} />
              <FiLock className='absolute left-2 top-11.5 text-lg' />
              <button type="button" onClick={() => setSee(prev => !prev)} className='absolute right-4 top-11.5 text-lg'>
                {see ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button type='submit' disabled={loading || success} className='bg-[#31c47f] text-white px-4 py-2 rounded-lg items-center flex justify-center gap-2'>{loading && (
              <span className='inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
            )}
              {success ? (
                <>
                  <div className='flex items-center gap-2'>
                    <FiCheck className='text-white text-2xl' />
                    <span>Success</span>
                  </div>
                </>
              ) : (
                <span>Sign in</span>
              )}</button>
            {error && <p className='text-red-600'>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
