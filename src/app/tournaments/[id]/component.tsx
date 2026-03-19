"use client"

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import TournamentPlayers from "@/components/Tournament/Players";
import Stats from "@/app/_stats";
import Breadcrumb from "@/components/Breadcrumb";
import TournamentBreadcrumb from "@/components/Breadcrumb/Tournament";
import endpoints from "@/types/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import { getFormat } from '@/hooks/useCommon';
import { useTranslations } from 'next-intl';
import { TournamentType } from "@/types/tournament";
import { AxiosResponse } from 'axios';
import tournamentsFake from "@/fakeData/tournament";

const TournamentComponent: React.FC = () => {
    const params                                = useParams<{ id: string }>();
    const [ tournament, setTournament]          = useState<TournamentType>(tournamentsFake[0]);
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
                        date     = {tournament?.date}
                        endpoint = {endpoints.HTTP_LEAGUE + tournament?.idLeague}
                    />
                }
            />
            <TournamentPlayers
                id         = {params.id}
                tournament = {tournament}
            />
            <Stats
                id       = {params.id}
                isLeague = {false}
                title    = {`${t('tournaments.stats')} - ${tournament?.name}`}
            />
        </main>
    );
}

export default TournamentComponent;