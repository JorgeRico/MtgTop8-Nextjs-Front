import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import endpoints from '@/types/server/endpoints';
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import { PlayerType } from '@/types/schemas/database/player';
import { TournamentType } from '@/types/schemas/database/tournament';
import { LeagueChampionType, LeagueStandingType } from '@/types/schemas/website/league';

interface ExtendedStandingType extends LeagueStandingType {
    deckCounts: Record<string, number>;
}

interface UseLeagueStandingsType {
    standings   : Array<LeagueStandingType>;
    champions   : Record<number, LeagueChampionType>;
    isLoading   : boolean;
    playerCount : number;
}

const POINTS_BY_POSITION: Record<number, number> = {
    1: 10,
    2: 8,
    3: 6,
    4: 5,
    5: 4,
    6: 3,
    7: 2,
    8: 1
};

const useLeagueStandings = (tournaments: Array<TournamentType>): UseLeagueStandingsType => {
    const [ standings, setStandings ] = useState<Array<LeagueStandingType>>([]);
    const [ champions, setChampions ] = useState<Record<number, LeagueChampionType>>({});
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ playerCount, setPlayerCount ] = useState<number>(0);

    useEffect(() => {
        if (tournaments.length === 0) {
            setStandings([]);
            setChampions({});
            setPlayerCount(0);
            setIsLoading(false);
            return;
        }

        let cancelled = false;
        setIsLoading(true);

        async function apiCall(): Promise<void> {
            try {
                const responses: Array<AxiosResponse<PlayerType[]>> = await Promise.all(
                    tournaments.map((tournament) => getAxiosEndpoint<PlayerType[]>(replaceUrlIdParam(endpoints.API_TOURNAMENT_PLAYERS, String(tournament.id))))
                );

                if (cancelled) return;

                const standingsMap = new Map<string, ExtendedStandingType>();
                const nextChampions: Record<number, LeagueChampionType> = {};

                responses.forEach((response, index) => {
                    const players = Array.isArray(response.data) ? response.data : [];
                    const tournament = tournaments[index];
                    const ranked = [ ...players ].sort((first, second) => first.position - second.position);
                    const champion = ranked.find((player) => player.position === 1);

                    if (champion) {
                        nextChampions[tournament.id] = {
                            name : champion.name,
                            deck : champion.deckName
                        };
                    }

                    players.forEach((player) => {
                        const key = String(player.id);
                        const current = standingsMap.get(key) || {
                            name       : player.name,
                            stages     : 0,
                            deck       : player.deckName,
                            points     : 0,
                            wins       : 0,
                            deckCounts : {}
                        };

                        current.stages += 1;
                        current.points += POINTS_BY_POSITION[player.position] ?? 0;
                        current.wins += player.position === 1 ? 1 : 0;

                        const deck = player.deckName.trim();
                        if (deck !== '') {
                            current.deckCounts[deck] = (current.deckCounts[deck] || 0) + 1;
                        }

                        standingsMap.set(key, current);
                    });
                });

                const rankedStandings = Array.from(standingsMap.values())
                    .map(({ deckCounts, ...standing }) => {
                        const mostPlayedDeck = Object.entries(deckCounts).sort((first, second) => second[1] - first[1])[0];

                        return {
                            ...standing,
                            deck : mostPlayedDeck ? mostPlayedDeck[0] : standing.deck
                        };
                    })
                    .sort((first, second) => (
                        second.points - first.points ||
                        second.wins - first.wins ||
                        second.stages - first.stages ||
                        first.name.localeCompare(second.name)
                    ));

                setStandings(rankedStandings);
                setChampions(nextChampions);
                setPlayerCount(standingsMap.size);
                setIsLoading(false);
            } catch (err) {
                if (cancelled) return;
                console.log(err);
                setStandings([]);
                setChampions({});
                setPlayerCount(0);
                setIsLoading(false);
            }
        }

        apiCall();

        return () => {
            cancelled = true;
        };
    }, [ tournaments ]);

    return { standings, champions, isLoading, playerCount };
};

export default useLeagueStandings;
