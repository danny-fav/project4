"use client";
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiCheck, FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';
import ThemeButton from '../components/ThemeButton';
import LogoOnly from '../components/LogoOnly';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
    const { theme } = useContext(ThemeContext);
    const [see , setSee] = useState(false);
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function showHeadsUpToast() {
        toast((t) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: 'column' }}>
                <span>Heads up! This app uses token-based sign-in so your login details are not saved permanently. You might be asked to sign in again later.</span>
                <button
                    onClick={() => {
                        console.log("Confirmed by user");
                        toast.dismiss(t.id); // Closes this specific toast
                    }}
                    style={{
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    OK
                </button>
            </div>
        ), {
            duration: 5000, // Stays for 5 seconds unless "OK" is clicked
            position: 'top-center',
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed");
                setLoading(false);
                return;
            }

            showHeadsUpToast();
            setSuccess(true);
            setLoading(false);
            await new Promise((r) => setTimeout(r, 5000));
            router.push("/login");
        } catch (err) {
            setError("Something went wrong");
            setLoading(false);
        }
    }

  return (
    <>
    <div className={`absolute top-4 right-4 flex items-center justify-center w-10 h-10 p-2 shadow rounded-2xl ${theme ? 'bg-[#272b34]' : 'bg-[#eaedf0]'}`}><ThemeButton/></div>
    
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center gap-2 mb-3'>
            <LogoOnly/>
            <h1 className='text-2xl font-bold'>ScoreArena</h1>
            <p className='text-sm text-gray-500'>Create your account to get started!</p>
        </div>
        <div className={`w-90 md:w-120 shadow rounded-xl p-6 ${theme ? 'bg-[#0e1116]' : 'bg-white'}`}>
            <form onSubmit={handleSubmit} className='relative flex flex-col gap-4 w-full max-w-md'>
              <div className={`flex gap-3 w-full p-1 rounded-lg ${theme ? 'bg-[#272b34]' : 'bg-[#eaedf0]'}`}>
                <a href='/login' className={`flex-1 text-center text-sm font-medium bg-transparent py-2 transition-colors duration-200 ${theme ? 'text-white' : 'text-black'}`}>Sign In</a>
                <a href='/register' className={`flex-1 text-center text-sm font-medium py-2 rounded-lg shadow hover:bg-gray-100 transition-colors duration-200 ${theme ? 'bg-[#0e1116] text-white' : 'bg-white text-black'}`}>Sign Up</a>
              </div>
            <div className='relative'>
                <label className={`text-[14px] ${theme ? 'text-white' : 'text-black'}`}>Full Name</label>
                <input name='name' type="text" placeholder='John Doe' className={`w-full pl-8 p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34] ' : 'bg-[#eaedf0] text-gray-400'}`} required/>
                <FiUser className='absolute left-2 top-11.5 text-lg'/>
            </div>
            <div className='relative'>
                <label className={`text-[14px] ${theme ? 'text-white' : 'text-black'}`}>Email</label>
                <input name='email' type="email" placeholder='Email' className={`w-full pl-8 p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34] ' : 'bg-[#eaedf0] text-gray-400'}`} required/>
                <FiMail className='absolute left-2 top-11.5 text-lg'/>
            </div>
            <div className='relative'>
                <label className={`text-[14px] ${theme ? 'text-white' : 'text-black'}`}>Password</label>
                <input name='password' type={see ? "text" : "password"} placeholder='Password' className={`w-full pl-8 p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34] text-white' : 'bg-[#eaedf0] text-gray-400'}`} required/>
                <FiLock className='absolute left-2 top-11.5 text-lg'/>
                <button type="button" onClick={() => setSee(prev=>!prev)} className='absolute right-4 top-11.5 text-lg'>
                {see ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
            <button type="submit" disabled={loading || success} className='bg-[#31c47f] text-white px-4 py-2 rounded-lg items-center flex justify-center gap-2'>{loading && (
                                    <span className='inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                                )}
                                {success ? (
                                    <>
                                        <FiCheck className='text-white text-2xl' />
                                        <span>Success</span>
                                    </>
                                ) : (
                                    <span>Create Account</span>
                                )}</button>
                                 {error && <p className="text-red-500 text-sm">{error}</p>}
                                 <Toaster position="top-right" />
            </form>
        </div>
      </div>
    </>
  );
}

export default page;
