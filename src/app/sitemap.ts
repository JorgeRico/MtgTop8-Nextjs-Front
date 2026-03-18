import type { MetadataRoute } from 'next'
import endpoints from "@/types/endpoints";
import { baseUrl } from "@/types/baseUrl";

async function getAllLeagues() {
    const res     = await fetch(endpoints.API_LEAGUE_ALL);
    const leagues = await res.json();

    return leagues;
}

async function getAllTournaments() {
    const res         = await fetch(endpoints.API_TOURNAMENT_ALL);
    const tournaments = await res.json();

    return tournaments;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages = [
        {
            url             : baseUrl,
            lastModified    : new Date(),
            changeFrequency : 'yearly' as const,
            priority        : 1,
        },
        {
            url             : `${baseUrl}/decklist`,
            lastModified    : new Date(),
            changeFrequency : 'monthly' as const,
            priority        : 0.8,
        },
        {
            url             : `${baseUrl}/contact`,
            lastModified    : new Date(),
            changeFrequency : 'weekly' as const,
            priority        : 0.9,
        },
    ]

    const leagues     = await getAllLeagues()
    const leaguePages = leagues.map((item) => ({
        url             : `${baseUrl}/leagues/${item.id}`,
        lastModified    : new Date(),
        changeFrequency : 'monthly' as const,
        priority        : 0.6,
    }))

    const tournaments     = await getAllTournaments()
    const tournamentPages = tournaments.map((item) => ({
        url             : `${baseUrl}/tournaments/${item.id}`,
        lastModified    : new Date(),
        changeFrequency : 'monthly' as const,
        priority        : 0.6,
    }))

    return [...staticPages, ...leaguePages, ...tournamentPages]
}