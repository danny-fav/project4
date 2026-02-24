"use client";
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { ThemeContext } from '../../context/ThemeContext';
import { fetchTeamDetails } from '../../lib/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdGroup, MdLocationOn, MdSignalWifiOff, MdStadium } from 'react-icons/md';
import HomeLayout from '@/app/components/HomeLayout';
import { useSession } from 'next-auth/react';

/**
 * TeamDetailsPage Component
 * Displays comprehensive information about a specific team, 
 * including their badge, description, and stadium details.
 */
const TeamDetailsPage = () => {
  const { data: session, status } = useSession();
    // Hooks for theme, URL parameters, and team data state
    const { themeStyle, theme } = useContext(ThemeContext);
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch team details whenever the ID in the URL changes
    useEffect(() => {
        if (status !== "authenticated") return;
        const getTeam = async () => {
            if (id) {
                const data = await fetchTeamDetails(id);
                setTeam(data);
                setLoading(false);
            }
        };
        getTeam();
    }, [id]);

    if (loading) {
        return (
            <div className='min-h-screen font-sans' style={themeStyle}>
                <Navbar />
                <main className="pt-24 flex justify-center items-center h-64 lg:ml-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31c47f]"></div>
                </main>
            </div>
        );
    }

    if (!team) {
        return (
            <div className='min-h-screen font-sans' style={themeStyle}>
                <Navbar />
                <main className="pt-24 px-6 md:px-12 lg:ml-64 text-center">
                    <p className="text-gray-500 text-lg">Team not found.</p>
                    <Link href="/leagues" className="text-[#31c47f] hover:underline mt-4 inline-block">Back to Leagues</Link>
                </main>
            </div>
        );
    }

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
            <div className='min-h-screen font-sans' style={themeStyle}>
                    <Link href="/teams" className="text-[#31c47f] hover:underline mb-6 inline-block">← Back to Teams</Link>

                    <div className={`rounded-2xl overflow-hidden border ${theme ? 'bg-[#151921] border-white/10' : 'bg-white border-black/5 shadow-sm'}`}>
                        {/* Header / Banner */}
                        <div className="h-48 bg-gradient-to-r from-[#31c47f] to-[#28a76b] relative">
                            <div className="absolute -bottom-12 left-8 p-2 rounded-2xl bg-white shadow-xl">
                                <img src={team.strBadge} alt={team.strTeam} className="w-24 h-24 md:w-32 md:h-32 object-contain" />
                            </div>
                        </div>

                        <div className="pt-16 pb-8 px-8">
                            <h1 className="text-4xl font-bold mb-2">{team.strTeam}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                                <span className="flex items-center gap-1"><MdGroup /> {team.strSport}</span>
                                <span className="flex items-center gap-1"><MdLocationOn /> {team.strLocation}</span>
                                <span className="flex items-center gap-1"><MdStadium /> {team.strStadium}</span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <h2 className="text-xl font-bold mb-4 border-b border-[#31c47f]/20 pb-2">Description</h2>
                                    <p className={`leading-relaxed text-sm ${theme ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {team.strDescriptionEN || "No description available."}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold mb-4 border-b border-[#31c47f]/20 pb-2">Team Info</h2>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold">Stadium</p>
                                            <p className="font-medium">{team.strStadium}</p>
                                            <p className="text-xs text-gray-500">{team.strStadiumLocation}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold">Capacity</p>
                                            <p className="font-medium">{team.intFormedYear ? `Founded in ${team.intFormedYear}` : "N/A"}</p>
                                        </div>
                                        {team.strWebsite && (
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold">Website</p>
                                                <a href={`https://${team.strWebsite}`} target="_blank" rel="noopener noreferrer" className="text-[#31c47f] hover:underline break-all">
                                                    {team.strWebsite}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {team.strTeamFanart1 && (
                            <div className="px-8 pb-8">
                                <img src={team.strTeamFanart1} alt="Team Fanart" className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
                            </div>
                        )}
                    </div>
            </div>
        </HomeLayout>
    );
};

export default TeamDetailsPage;
