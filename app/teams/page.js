"use client";
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../context/ThemeContext';
import { searchTeams, fetchTeamsInLeague } from '../lib/api';
import Link from 'next/link';
import { MdGroup, MdSearch, MdSignalWifiOff } from 'react-icons/md';
import HomeLayout from '../components/HomeLayout';
import { useSession } from 'next-auth/react';

/**
 * TeamsPage Component
 * Provides a user interface for browsing teams and searching for specific ones.
 * Initially loads popular teams from the Premier League.
 */
const TeamsPage = () => {
    const { data: session, status } = useSession();
  // Global theme and local state for teams, search inputs, and loading indicators
  const { themeStyle, theme } = useContext(ThemeContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
      if (status !== "authenticated") return;
    // Load some popular teams initially (e.g., from English Premier League)
    const loadInitialTeams = async () => {
      setLoading(true);
      const data = await fetchTeamsInLeague('English Premier League');
      setTeams(data.slice(0, 20)); // Show top 20
      setLoading(false);
    };
    loadInitialTeams();
  }, []);

  // Handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setLoading(true);
    // Fetch teams matching the search term from the API
    const data = await searchTeams(searchTerm);
    setTeams(data || []);
    setLoading(false);
    setIsSearching(false);
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
      <div className='min-h-screen font-sans' style={themeStyle}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MdGroup className="text-[#31c47f]" />
              Teams
            </h1>
            <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
              <input
                type="text"
                placeholder="Search teams..."
                className={`flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#31c47f] ${theme ? 'bg-[#272b34] border-white/10 text-white' : 'bg-[#eaedf0] border-black/10 text-black'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#31c47f] text-white p-2 rounded-lg hover:bg-[#28a76b] transition-colors"
                disabled={isSearching}
              >
                <MdSearch size={24} />
              </button>
            </form>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31c47f]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {teams.length > 0 ? teams.map((team) => (
                <Link
                  key={team.idTeam}
                  href={`/teams/${team.idTeam}`}
                  className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${theme
                    ? 'bg-[#151921] border-white/10 hover:border-[#31c47f]/50'
                    : 'bg-white border-black/5 hover:border-[#31c47f]/50 shadow-sm'
                    }`}
                >
                  <img
                    src={team.strBadge}
                    alt={team.strTeam}
                    className="w-20 h-20 object-contain mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-sm font-bold truncate w-full">{team.strTeam}</h3>
                  <p className="text-xs text-gray-500 mt-1">{team.strLeague}</p>
                </Link>
              )) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No teams found. Try searching for something else.</p>
                </div>
              )}
            </div>
          )}
      </div>
    </HomeLayout>
  );
};

export default TeamsPage;

