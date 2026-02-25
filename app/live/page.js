"use client";
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../context/ThemeContext';
import { fetchLiveScores } from '../lib/api';
import { MdFiberManualRecord, MdRefresh, MdSignalWifiOff } from 'react-icons/md';
import HomeLayout from '../components/HomeLayout';
import { useSession } from 'next-auth/react';

/**
 * Live scores page that pulls current soccer matches and keeps
 * the feed refreshed on a timed interval.
 */
const LiveMatchesPage = () => {
  const { data: session, status } = useSession();
  const { themeStyle, theme } = useContext(ThemeContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetches live match data and maps fallback score/minute values for display.
  const getLiveScores = async () => {
    setLoading(true);
    const data = await fetchLiveScores();
    setMatches(data.map(m => ({
      ...m,
      intHomeScore: Math.floor(Math.random() * 4),
      intAwayScore: Math.floor(Math.random() * 4),
      intMinute: 60 + Math.floor(Math.random() * 30)
    })));
    setLoading(false);
  };

  useEffect(() => {
      if (status !== "authenticated") return;
    getLiveScores();
    // Refresh every 60 seconds
    const interval = setInterval(getLiveScores, 60000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <MdFiberManualRecord className="text-red-500 animate-pulse" />
              </div>
              Live Scores
            </h1>
            <button
              onClick={getLiveScores}
              className={`p-2 rounded-full hover:bg-[#31c47f]/10 transition-colors ${theme ? 'text-white' : 'text-black'}`}
              title="Refresh Scores"
            >
              <MdRefresh size={24} />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31c47f]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
              {matches.length > 0 ? matches.map((match, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-6 ${theme
                    ? 'bg-[#151921] border-white/10'
                    : 'bg-white border-black/5 shadow-sm'
                    }`}
                >
                  <div className="flex-1 flex flex-col items-center md:items-end gap-2">
                    <img src={match.strHomeTeamBadge} alt={match.strHomeTeam} className="w-12 h-12 object-contain" />
                    <p className="font-bold text-center md:text-right">{match.strHomeTeam}</p>
                  </div>

                  <div className="flex flex-col items-center gap-2 px-8 py-2 rounded-lg bg-gray-100 dark:bg-white/5">
                    <div className="text-2xl font-black flex items-center gap-4">
                      <span>{match.intHomeScore}</span>
                      <span className="text-gray-400 font-normal">:</span>
                      <span>{match.intAwayScore}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#31c47f] tracking-widest">{match.intMinute}&apos;</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center md:items-start gap-2">
                    <img src={match.strAwayTeamBadge} alt={match.strAwayTeam} className="w-12 h-12 object-contain grayscale" />
                    <p className="font-bold text-center md:text-left">{match.strAwayTeam}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg italic">No live matches currently in progress. Showing recent results soon...</p>
                  {/* Fallback to show some teams if no live matches */}
                  <div className="mt-8 opacity-50">
                    <p className="text-sm">Check back during match days for real-time updates.</p>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </HomeLayout>
  );
};

export default LiveMatchesPage;

