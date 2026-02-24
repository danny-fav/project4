"use client";
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import React, { Suspense, useContext, useState, useEffect, useRef } from 'react';
import { searchTeamsLimit, searchLeagues } from '../lib/api'
import Link from 'next/link';

function SearchBarContent() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ teams: [], leagues: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const [teams, leagues] = await Promise.all([
          searchTeamsLimit(query),
          searchLeagues(query)
        ]);
        setResults({ teams, leagues });
        setShowDropdown(true);
        setLoading(false);
      } else {
        setResults({ teams: [], leagues: [] });
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (path) => {
    router.push(path);
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="relative">
        <input
          type="search"
          placeholder="Search leagues, teams..."
          className={`w-full h-10 pl-10 pr-4 rounded-xl placeholder-[#707d8f] focus:outline-none focus:ring-2 focus:ring-[#31c47f] focus:border-transparent transition-all duration-200 ${theme ? 'bg-[#272b34] text-white' : 'bg-[#eaedf0] text-gray-800'}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setShowDropdown(true)}
        />
        <FaSearch className={`absolute top-1/2 left-3 transform -translate-y-1/2 ${theme ? 'text-gray-400' : 'text-gray-400'}`} />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#31c47f]"></div>
          </div>
        )}
      </div>

      {showDropdown && (results.teams.length > 0 || results.leagues.length > 0) && (
        <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-2xl z-100 overflow-hidden border ${theme ? 'bg-[#151921] border-white/10' : 'bg-white border-black/5'}`}>
          {results.leagues.length > 0 && (
            <div className="p-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#31c47f] px-3 py-1">Leagues</p>
              {results.leagues.map((league) => (
                <button
                  key={league.idLeague}
                  onClick={() => handleSelect(`/leagues/${league.idLeague}`)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${theme ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  {league.strLeague}
                </button>
              ))}
            </div>
          )}
          {results.teams.length > 0 && (
            <div className={`p-2 ${results.leagues.length > 0 ? 'border-t border-white/5' : ''}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#31c47f] px-3 py-1">Teams</p>
              {results.teams.map((team) => (
                <button
                  key={team.idTeam}
                  onClick={() => handleSelect(`/teams/${team.idTeam}`)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors ${theme ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <img src={team.strBadge} alt="" className="w-6 h-6 object-contain" />
                  <div>
                    <p className="text-sm font-medium">{team.strTeam}</p>
                    <p className="text-[10px] opacity-50">{team.strLeague}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="relative w-full h-10 bg-gray-100 dark:bg-white/5 rounded-xl"></div>}>
      <SearchBarContent />
    </Suspense>
  );
}
