"use client"

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Template from "@/views/layout/template";
import TournamentPlayers from "@/components/Tournament/Players";
import Stats from "@/app/_stats";
import Breadcrumb from "@/components/Breadcrumb";
import TournamentBreadcrumb from "@/components/Breadcrumb/Tournament";
import endpoints from "@/services/endpoints.tsx";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi.tsx';
import { getFormat } from '@/hooks/useCommon.tsx';
import { useTranslations } from 'next-intl';

const Tournament: React.FC = () => {
    const { id }                       = useParams();
    const [ tournament, setTournament] = useState({idLeague: '', name:'', date:'', players: ''});
    const [ loading, setLoading ]      = useState(false);
    const t                            = useTranslations('seo-tags');

    useEffect(() => {
        async function apiCall() {
            await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_TOURNAMENT_DATA, id))
            .then((response) => {
                setTournament(prevState => ({
                    ...prevState,
                    'idLeague'   : response.data.idLeague,
                    'name'       : response.data.name,
                    'date'       : response.data.date,
                    'players'    : response.data.players,
                    'format'     : getFormat(response.data.format),
                    'year'       : response.data.year,
                    'leagueName' : response.data.leagueName

                }));
                setLoading(true);
            })
            .catch((err) => {
                console.log('error tournamnet')
            });
        }

        apiCall();
    }, []);

    return (
        <>
            <Breadcrumb
                loading   = {loading}
                component = {
                    <TournamentBreadcrumb
                        title={`${tournament.leagueName} ${tournament.year}`}
                        date={tournament.date}
                        endpoint={endpoints.HTTP_LEAGUE + tournament.idLeague}
                    />
                }
            />
            <TournamentPlayers
                id         = {id}
                tournament = {tournament}
            />
            <Stats
                id       = {id}
                isLeague = {false}
                title    = {`${t('tournaments.stats')} - ${tournament.name}`}
            />
        </>
    );
}

export default Tournament;