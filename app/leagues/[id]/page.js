"use client";
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { ThemeContext } from '../../context/ThemeContext';
import { fetchUpcomingEvents } from '../../lib/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdEvent } from 'react-icons/md';
import HomeLayout from '@/app/components/HomeLayout';

/**
 * LeagueDetailsPage Component
 * Shows upcoming matches/events for a selected league.
 */
const LeagueDetailsPage = () => {
    // Theme and routing hooks
    const { themeStyle, theme } = useContext(ThemeContext);
    const { id } = useParams();

    // State for events data and loading status
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch league events on mount or ID change
    useEffect(() => {
        const getEvents = async () => {
            if (id) {
                const data = await fetchUpcomingEvents(id);
                setEvents(data);
                setLoading(false);
            }
        };
        getEvents();
    }, [id]);

    return (
        <HomeLayout>
            <div className='min-h-screen font-sans' style={themeStyle}>
                    <div className="mb-8">
                        <Link href="/leagues" className="text-[#31c47f] hover:underline mb-4 inline-block">← Back to Leagues</Link>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <MdEvent className="text-[#31c47f]" />
                            Upcoming Events
                        </h1>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31c47f]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {events.length > 0 ? events.map((event) => (
                                <div
                                    key={event.idEvent}
                                    className={`p-6 rounded-xl border ${theme
                                        ? 'bg-[#151921] border-white/10'
                                        : 'bg-white border-black/5 shadow-sm'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{event.strTimestamp ? new Date(event.strTimestamp).toLocaleDateString() : event.dateEvent}</span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#31c47f]">{event.strTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <Link href={`/teams/${event.idHomeTeam}`} className="flex-1 text-center hover:text-[#31c47f] transition-colors">
                                            <p className="font-bold text-lg">{event.strHomeTeam}</p>
                                        </Link>
                                        <span className="text-gray-400 font-bold italic">VS</span>
                                        <Link href={`/teams/${event.idAwayTeam}`} className="flex-1 text-center hover:text-[#31c47f] transition-colors">
                                            <p className="font-bold text-lg">{event.strAwayTeam}</p>
                                        </Link>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 text-center">
                                        <p className="text-sm text-gray-500">{event.strVenue || 'Venue TBD'}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 text-lg">No upcoming events found for this league.</p>
                                </div>
                            )}
                        </div>
                    )}
            </div>
        </HomeLayout>
    );
};

export default LeagueDetailsPage;
