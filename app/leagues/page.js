"use client";
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../context/ThemeContext';
import { fetchLeagues } from '../lib/api';
import Link from 'next/link';
import { HiOutlineTrophy } from 'react-icons/hi2';
import HomeLayout from '../components/HomeLayout';
import { useSession } from 'next-auth/react';
import { MdSignalWifiOff } from 'react-icons/md';

/**
 * LeaguesPage Component
 * Displays a searchable grid of sports leagues.
 * Fetches data from TheSportsDB and handles light/dark theme styling.
 */
const LeaguesPage = () => {
  const { data: session, status } = useSession();
  // Access global theme state for styling
  const { themeStyle, theme } = useContext(ThemeContext);

  // Local state for leagues data, loading status, and search filtering
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all leagues on component mount
  useEffect(() => {
      if (status !== "authenticated") return;
    const getLeagues = async () => {
      const data = await fetchLeagues();
      setLeagues(data);
      setLoading(false);
    };
    getLeagues();
  }, []);

  const filteredLeagues = leagues.filter(league =>
    league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <HiOutlineTrophy className="text-[#31c47f]" />
              Sports Leagues
            </h1>
            <input
              type="text"
              placeholder="Search leagues..."
              className={`p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#31c47f] ${theme ? 'bg-[#272b34] border-white/10 text-white' : 'bg-[#eaedf0] border-black/10 text-black'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31c47f]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Map through the filtered leagues and render a card for each */}
              {filteredLeagues.map((league) => (
                <Link
                  key={league.idLeague}
                  href={`/leagues/${league.idLeague}`}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center text-center ${theme
                    ? 'bg-[#151921] border-white/10 hover:border-[#31c47f]/50'
                    : 'bg-white border-black/5 hover:border-[#31c47f]/50 shadow-sm'
                    }`}
                >
                  {/* League Badge - Using the rich data fetched from the search API */}
                  {league.strBadge ? (
                    <img
                      src={league.strBadge}
                      alt={league.strLeague}
                      className="w-20 h-20 object-contain mb-4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-400">
                      <HiOutlineTrophy size={32} />
                    </div>
                  )}

                  <h3 className="text-lg font-bold mb-1 truncate w-full">{league.strLeague}</h3>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">{league.strSport}</span>
                    <span className="text-[#31c47f] text-xs font-bold mt-2 uppercase tracking-wider">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredLeagues.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No leagues found matching your search.</p>
            </div>
          )}
      </div>
    </HomeLayout>
  );
};

export default LeaguesPage;

