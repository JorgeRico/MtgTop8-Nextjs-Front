"use client"

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import TournamentPlayers from "@/components/Tournament/Players";
import Stats from "@/app/_stats";
import Breadcrumb from "@/components/Breadcrumb";
import TournamentBreadcrumb from "@/components/Breadcrumb/Tournament";
import endpoints from "@/types/server/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import { useTranslations } from 'next-intl';
import { TournamentType } from "@/types/schemas/database/tournament";
import { AxiosResponse } from 'axios';
import fakeTournament from "@/fakeData/tournament";
import Title from "@/components/Tournament/Title";

const TournamentComponent: React.FC = () => {
    const params                                = useParams<{ id: string }>();
    const [ tournament, setTournament]          = useState<TournamentType>();
    const [ loading, setLoading ]               = useState<boolean>(false);
    const t                                     = useTranslations('seo-tags');
    const [ breadcrumbText, setBreadcrumbText ] = useState<string>('');

    useEffect(() => {
        async function apiCall(): Promise<void> {
            try {
                const response: AxiosResponse<TournamentType> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_TOURNAMENT_DATA, params.id))
                setTournament({
                    'id'         : response.data.id,
                    'idLeague'   : response.data.idLeague,
                    'name'       : response.data.name,
                    'date'       : response.data.date,
                    'players'    : response.data.players,
                    'format'     : response.data.format,
                    'leagueName' : response.data.leagueName,
                    'year'       : response.data.year
                });
                setBreadcrumbText(response.data.leagueName + ' ' + response.data.year);
                setLoading(true);
            } catch (err) {
                console.log('error tournamnet')
            };
        }

        apiCall();
    }, []);

    return (
        <main>
            <Breadcrumb
                loading   = {loading}
                component = {
                    <TournamentBreadcrumb
                        title    = {breadcrumbText}
                        date     = {tournament ? tournament.date : fakeTournament.date}
                        endpoint = {`${endpoints.HTTP_LEAGUE}${tournament ? tournament.idLeague : fakeTournament.idLeague}`}
                    />
                }
            />
            <Title
                tournament={tournament ? tournament : fakeTournament}
                isBlured={!loading}
            />
            <TournamentPlayers
                id         = {params.id}
                tournament = {tournament ? tournament : fakeTournament}
            />
            <Stats
                id       = {params.id}
                isLeague = {false}
                title    = {`${t('tournaments.stats')} - ${tournament ? tournament.name : fakeTournament.name}`}
            />
        </main>
    );
}

export default TournamentComponent;