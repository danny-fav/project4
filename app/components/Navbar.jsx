"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuLayoutDashboard } from 'react-icons/lu';
import { ThemeContext } from '../context/ThemeContext';
import Navphone from './Navphone';
import ThemeButton from './ThemeButton';
import Logo from './Logo';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { MdFiberManualRecord, MdGroup, MdLogout } from 'react-icons/md';
import { FaArrowRight, FaCog } from 'react-icons/fa';
import Avatar from './Avatar';
import SearchBar from './SearchBar';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

/**
 * Main navigation shell with desktop sidebar, mobile trigger,
 * theme toggle, global search, and quick profile actions.
 */
const Navbar = ({ setOpen, open }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const username = session?.user?.name || "";
    const useremail = session?.user?.email || "john.doe@example.com";
    const user = { name: username, email: useremail };
    const pathname = usePathname();
    const { theme } = useContext(ThemeContext);
    // Centralized app navigation config used by the desktop sidebar.
    const links = [
        { href: "/dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
        { href: "/leagues", label: "Leagues", icon: <HiOutlineTrophy /> },
        { href: "/teams", label: "Teams", icon: <MdGroup /> },
        { href: "/live", label: "Live Scores", icon: <div className="live-container"><MdFiberManualRecord className="live-icon" /></div> },
        { href: "/settings", label: "Settings", icon: <FaCog /> },
    ];
    return (
        <div>
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${theme
                ? 'bg-black/20 border-white/10'
                : 'bg-white/20 border-black/5'
                }`}>
                <div className='p-4'>
                    <nav className='flex justify-between items-center  mx-auto'>
                        <div className='flex items-center gap-5 '>
                            <div className="lg:hidden">
                                <Navphone />
                            </div>
                            <Logo />
                        </div>

                        <div className='flex justify-center items-center mx-auto w-40 relative md:w-[50%] lg:w-full'>
                            {/* <form>
                            <input type="search" name="" id="" placeholder="Search leagues, teams, events..." className={`relative w-full h-8 pl-9 rounded-xl placeholder-[#707d8f] focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34]' : 'bg-[#eaedf0] text-gray-400'}`}/>
                            <FaSearch className={`absolute top-1/2 left-3 transform -translate-y-1/2 ${theme ? 'text-gray-400' : 'text-gray-400'}`}/>
                        </form> */}
                            <SearchBar />
                        </div>

                        <div className='flex gap-5 items-center'>
                            <ThemeButton className="cursor-pointer" />
                            <div className=' flex items-center gap-2 cursor-pointer group '>
                                <Avatar name={user.name} />
                                <div className={`group-hover:flex hidden flex-col items-center gap-1 right-2 absolute top-15 transition-all duration-300  p-4 rounded-lg shadow-md w-50 ${theme ? 'bg-[#151921]' : 'bg-white'}`}>
                                    <a href='/profile'>
                                        <div className='flex gap-4 items-center w-full'>
                                            <Avatar name={user.name} />
                                            <div className='flex items-start flex-col gap-1'>
                                                <h3 className={`text-[14px] font-bold group-hover:text-[#31c47f] ${theme ? 'text-white' : 'text-black'}`}>{user.name}</h3>
                                                <p className='text-[10px] text-gray-600'>{user.email}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="cursor-pointer" onClick={async () => {await signOut({redirect : false}); router.push("/dummypage")}}><MdLogout /></div>
                        </div>
                    </nav>

                </div>
            </div>
            <aside className='hidden lg:block'>
                <div className={`fixed left-0 top-16 h-[calc(100vh-64px)] z-40 shadow-2xl transform transition-all duration-300 ease-in-out ${theme ? 'bg-[#0e1116]' : 'bg-white'}`} style={open === true ? { width: '88px' } : { width: '256px' }}>
                    <button className='flex absolute top-3 right-3 p-5 justify-center items-center w-1 h-1 rounded-2xl hover:bg-[#31c47f1a]' onClick={() => setOpen(prev => !prev)}>
                        {open ? <span className='text-2xl'>&#8250;</span> : <span className='text-2xl'>&#8249;</span>}
                    </button>
                    {/* Navigation links */}
                    <div className="flex flex-col items-center gap-4 mt-16 p-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`text-md font-medium flex items-center tracking-wider transition-colors ${pathname === link.href
                                    ? 'text-[#31c47f] bg-[#31c47f1a] w-full text-left p-3 rounded-lg shadow-md'
                                    : theme
                                        ? 'text-[#707d8f] hover:text-white hover:bg-gray-500/20 w-full text-left p-3 rounded-lg shadow-md'
                                        : 'text-gray-700 hover:text-black hover:bg-[#31c47f1a] w-full text-left p-3 rounded-lg shadow-md'
                                    }`}
                            >
                                {link.icon && <span className="mr-2">{link.icon}</span>}
                                <span style={open === true ? { display: 'none' } : { display: 'block' }}>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default Navbar;
