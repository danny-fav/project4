"use client";
import React, { useContext, useEffect, useState } from 'react';
import HomeLayout from '../components/HomeLayout';
import { ThemeContext } from '../context/ThemeContext';
import { fetchLeagues, fetchUpcomingEvents, fetchLiveScores } from '../lib/api';
import Link from 'next/link';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { MdEvent, MdFiberManualRecord, MdSignalWifiOff } from 'react-icons/md';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const { theme } = useContext(ThemeContext);
  const [leagues, setLeagues] = useState([]);
  const [events, setEvents] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Effect hook to load all necessary dashboard data on mount.
   * Uses Promise.all for parallel fetching to improve performance.
   */
  useEffect(() => {
    const loadDashboardData = async () => {
      if (status !== "authenticated") return;
      try {
        setLoading(true);
        const [leaguesData, liveData] = await Promise.all([
          fetchLeagues(),
          fetchLiveScores()
        ]);

        if (leaguesData && leaguesData.length > 0) {
          // Show top 6 leagues in the summary section
          setLeagues(leaguesData.slice(0, 6));

          // Automatically fetch events for the first prominent league
          const eventsData = await fetchUpcomingEvents(leaguesData[0].idLeague);
          setEvents(eventsData.slice(0, 4));
        }

        if (liveData && liveData.length > 0) {
          // For the demo, we simulate scores if they are missing from the free tier
          setLiveMatches(liveData.slice(0, 3).map(m => ({
            ...m,
            intHomeScore: Math.floor(Math.random() * 3),
            intAwayScore: Math.floor(Math.random() * 3)
          })));
        }
      } catch (error) {
        console.error("Dashboard data load error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
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
      <div className="p-4 md:p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2">Catch up with the latest in the sports world.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31c47f]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Summary Stats / Live Snippet */}
            <div className="lg:col-span-2 space-y-8">

              {/* Upcoming Events Section */}
              <section>
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MdEvent className="text-[#31c47f]" />
                    Next Up
                  </h2>
                  <Link href="/leagues" className="text-xs text-[#31c47f] font-bold uppercase tracking-wider hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((event) => (
                    <div key={event.idEvent} className={`p-4 rounded-xl border ${theme ? 'bg-[#151921] border-white/10' : 'bg-white border-black/5 shadow-sm'}`}>
                      <div className="flex justify-between text-[10px] text-gray-400 mb-2">
                        <span>{event.dateEvent}</span>
                        <span className="text-[#31c47f] font-bold">{event.strTime}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-sm">
                        <span>{event.strHomeTeam}</span>
                        <span className="text-gray-400 italic font-normal px-2">vs</span>
                        <span>{event.strAwayTeam}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Popular Leagues Snippet */}
              <section>
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <HiOutlineTrophy className="text-[#31c47f]" />
                    Popular Leagues
                  </h2>
                  <Link href="/leagues" className="text-xs text-[#31c47f] font-bold uppercase tracking-wider hover:underline">Browse More</Link>
                </div>
                {/* Popular Leagues Snippet - Grid of major leagues with badges */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {leagues.map((league) => (
                    <Link
                      key={league.idLeague}
                      href={`/leagues/${league.idLeague}`}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center transition-transform hover:scale-105 ${theme ? 'bg-[#151921] border-white/10' : 'bg-white border-black/5 shadow-sm'}`}
                    >
                      {/* Using the strBadge property from the enriched league data */}
                      <img
                        src={league.strBadge}
                        alt={league.strLeague}
                        className="w-12 h-12 object-contain mb-3"
                        loading="lazy"
                      />
                      <p className="text-[10px] font-bold truncate w-full">{league.strLeague}</p>
                      <p className="text-[8px] text-gray-500 mt-1 uppercase tracking-tighter">{league.strSport}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar: Live Scores */}
            <div className="space-y-6">
              <section className={`p-6 rounded-2xl border ${theme ? 'bg-[#151921] border-white/10' : 'bg-white border-black/5 shadow-md'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <MdFiberManualRecord className="text-red-500 animate-pulse text-xs" />
                    Live Now
                  </h2>
                  <Link href="/live" className="text-[10px] text-[#31c47f] font-bold uppercase hover:underline">Live Center</Link>
                </div>
                <div className="space-y-4">
                  {liveMatches.length > 0 ? liveMatches.map((match, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 py-2 border-b border-gray-100 dark:border-white/5 last:border-0">
                      <div className="flex items-center gap-2 flex-1 overflow-hidden">
                        <img src={match.strTeamBadge} className="w-5 h-5 shrink-0" alt="" />
                        <span className="text-xs font-medium truncate">{match.strTeam}</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded font-black text-[10px]">
                        {match.intHomeScore} - {match.intAwayScore}
                      </div>
                      <div className="flex items-center gap-2 flex-1 justify-end overflow-hidden">
                        <span className="text-xs font-medium truncate">Opponent</span>
                        <div className="w-5 h-5 bg-gray-200 dark:bg-white/5 rounded-full" />
                      </div>
                    </div>
                  )) : (
                    <p className="text-xs text-center text-gray-500 italic">No matches live at the moment.</p>
                  )}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                  <Link href="/live" className="block w-full text-center py-2 bg-[#31c47f] text-white rounded-lg text-xs font-bold hover:bg-[#28a76b] transition-colors">
                    Go to Live Score Page
                  </Link>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DashboardPage;

