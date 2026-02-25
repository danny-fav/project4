const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const BASE_URL2 = 'https://www.thesportsdb.com/api/v2/json';

/**
 * Fetches all soccer leagues with rich data (badges, descriptions, etc.)
 * @returns {Promise<Array>} List of leagues
 */
export const fetchLeagues = async () => {
    try {
        // Using search_all_leagues instead of all_leagues to get badges and logos
        const response = await fetch(`${BASE_URL}/search_all_leagues.php?s=Soccer`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.countries || [];
    } catch (error) {
        console.error('Error fetching leagues:', error);
        return [];
    }
};

/**
 * Searches for leagues by name from the local cache of all leagues
 * @param {string} query The search term
 * @returns {Promise<Array>} List of matching leagues
 */
export const searchLeagues = async (query) => {
    try {
        // Keep league search local by filtering the soccer leagues payload on the client.
        const response = await fetch(`${BASE_URL}/search_all_leagues.php?s=Soccer`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.countries) return [];
        return data.countries.filter(l =>
            l.strLeague.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5); // Limit to top 5 for dropdown
    } catch (error) {
        console.error('Error searching leagues:', error);
        return [];
    }
};

/**
 * Searches for teams with a limit (used for real-time search dropdowns)
 * @param {string} query The search term
 * @returns {Promise<Array>} Limited list of matching teams
 */
export const searchTeamsLimit = async (query) => {
    try {
        // Encode user input so spaces/special characters do not produce invalid URLs.
        const safeQuery = encodeURIComponent(query);
        const response = await fetch(`${BASE_URL}/searchteams.php?t=${safeQuery}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return (data.teams || []).slice(0, 5);
    } catch (error) {
        console.error('Error searching teams:', error);
        return [];
    }
};


/**
 * Fetches upcoming events for a specific league
 * @param {string} leagueId The ID of the league
 * @returns {Promise<Array>} List of events
 */
export const fetchUpcomingEvents = async (leagueId) => {
    try {
        const response = await fetch(`${BASE_URL}/eventsnextleague.php?id=${leagueId}`);
        const data = await response.json();
        return data.events || [];
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        return [];
    }
};

/**
 * Fetches detailed information for a specific team
 * @param {string} teamId The ID of the team
 * @returns {Promise<Object|null>} Team details object or null
 */
export const fetchTeamDetails = async (teamId) => {
    try {
        const response = await fetch(`${BASE_URL}/lookupteam.php?id=${teamId}`);
        const data = await response.json();
        return data.teams ? data.teams[0] : null;
    } catch (error) {
        console.error('Error fetching team details:', error);
        return null;
    }
};

/**
 * Fetches live scores (if available) or recent soccer results
 * @returns {Promise<Array>} List of matches
 */
// export const fetchLiveScores = async () => {
//     // TheSportsDB has limited live scores in free tier, 
//     // but we can try fetching latest soccer results
//     try {
//         const response = await fetch(`${BASE_URL2}/api/v2/json/livescore/soccer`);
//         const data = await response.json();
//         return data.teams || [];
//     } catch (error) {
//         console.error('Error fetching live scores:', error);
//         return [];
//     }
// };
/**
 * Searches for teams by name globally
 * @param {string} teamName The name of the team to search for
 * @returns {Promise<Array>} List of matching teams
 */
export const searchTeams = async (teamName) => {
    try {
        const response = await fetch(`${BASE_URL}/searchteams.php?t=${teamName}`);
        const data = await response.json();
        return data.teams || [];
    } catch (error) {
        console.error('Error searching teams:', error);
        return [];
    }
};

/**
 * Fetches all teams belonging to a specific league
 * @param {string} leagueName The exact name of the league
 * @returns {Promise<Array>} List of teams
 */
export const fetchTeamsInLeague = async (leagueName) => {
    try {
        const response = await fetch(`${BASE_URL}/search_all_teams.php?l=${leagueName}`);
        const data = await response.json();
        return data.teams || [];
    } catch (error) {
        console.error('Error fetching teams in league:', error);
        return [];
    }
};


export const fetchLiveScores = async () => {
  const today = new Date().toISOString().split("T")[0];

  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${today}&s=Soccer`
  );

  const data = await res.json();

  return data.events;
};