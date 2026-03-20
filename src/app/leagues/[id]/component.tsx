'use client'

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import LeagueTournamentList from "@/components/List/League/Tournaments";
import Stats from "@/app/_stats";
import endpoints from "@/types/server/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import { getFormat } from '@/hooks/useCommon';
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbLeague from "@/components/Breadcrumb/League";
import { useTranslations } from 'next-intl';
import { AxiosResponse } from 'axios';
import { LeagueType, AveragePlayersLeague } from "@/types/schemas/database/league";
import fakeTournament from "@/fakeData/tournament";
import Title from "@/components/Tournament/Title";
import fakeLeague from "@/fakeData/league";
import LeagueTournamentTitle from "@/components/List/League/Title";

const LeagueComponent = () => {
    const params                                = useParams<{ id: string }>();
    const [ leagueName, setLeagueName ]         = useState<string>('');
    const [ isLoading, setIsLoading ]           = useState<boolean>(true);
    const [ leagueFormat, setLeagueFormat ]     = useState<string>('');
    const [ location, setLocation ]             = useState<string | null>(null);
    const [ locationName, setLocationName ]     = useState<string>('');
    const [ year, setYear ]                     = useState<string>('');
    const [ classification, setClassification ] = useState<string>('');
    const t                                     = useTranslations('seo-tags');
    const [ numPlayers, setNumPlayers ]         = useState<number>(0);

    useEffect(() => {
        async function apiCall(): Promise<void> {
            try {
                const response: AxiosResponse<LeagueType> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_LEAGUE_ID, params.id))
                setLeagueName(response.data.name);
                setLeagueFormat(getFormat(response.data.isLegacy));
                setLocation(response.data.location);
                setLocationName(response.data.locationName);
                setYear(response.data.year);
                setClassification(response.data.classification);
                setIsLoading(false);
            } catch (err) {
                console.log(err)
                console.log('error league id')
            };
        }

        async function apiAverageCall(): Promise<void> {
            try {
                const response: AxiosResponse<AveragePlayersLeague> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_LEAGUE_ID_AVERAGE, params.id))
                setNumPlayers(response.data.average)
            } catch (err) {
                console.log(err)
                console.log('error league id')
            };
        }
        apiAverageCall();
        apiCall();
    }, []);

    return (
        <main>
            <Breadcrumb
                loading   = {!isLoading}
                component = {
                    <BreadcrumbLeague
                        title={`${leagueName} ${year}`}
                    />
                }>
            </Breadcrumb>
            <LeagueTournamentTitle
                leagueName     = {isLoading ? fakeLeague.leagueName : leagueName}
                format         = {isLoading ? fakeLeague.format : leagueFormat}
                isBlured       = {isLoading}
                numPlayers     = {isLoading ? fakeLeague.numPlayers : numPlayers}
                classification = {isLoading ? fakeLeague.classification : classification}
                location       = {isLoading ? fakeLeague.location : location}
                locationName   = {isLoading ? fakeLeague.locationName : locationName}
            />
            <LeagueTournamentList
                id = {params.id}
            />
            <Stats
                id       = {params.id}
                isLeague = {true}
                title    = {`${t('leagues.stats')} ${leagueName ? ' - ' + leagueName : ''}`}
            />
        </main>
    );
}

export default LeagueComponent;