"use client";
import Link from "next/link";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import ThemeButton from "../components/ThemeButton";

// Simple sign-out confirmation screen with quick navigation actions.
export default function DummyPage(){
    const { theme } = useContext(ThemeContext);
    return (
        <div className="flex flex-col gap-10 justify-center items-center h-screen">
                <div className={`absolute top-4 right-4 flex items-center justify-center w-10 h-10 p-2 shadow rounded-2xl ${theme ? 'bg-[#272b34]' : 'bg-[#eaedf0]'}`}><ThemeButton/></div>
            <FiLogOut className="text-[#31c47f]  h-24 w-24 p-6 rounded-3xl bg-[#31c47f1a]"/>
            <p className="text-xl md:text-2xl text-[#31c47f]">You Logged out</p>

            <div className="flex gap-4">
                <Link href="/login" className="hover:shadow-lg p-3 rounded-xl text-md md:text-lg text-[#31c47f] border border-[#31c47f] bg-transparent inline-block">Log Back in</Link>
                <Link href="/" className="hover:shadow-lg p-3 rounded-xl text-md md:text-lg text-white bg-[#31c47f] inline-block">Return To Home Page</Link>
            </div>
        </div>
    )
}
