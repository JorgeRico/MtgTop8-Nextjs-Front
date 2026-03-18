'use client'

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import LeagueTournamentList from "@/components/List/League/Tournament/List";
import Stats from "@/app/_stats";
import endpoints from "@/types/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import { getFormat } from '@/hooks/useCommon';
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbLeague from "@/components/Breadcrumb/League";
import { useTranslations } from 'next-intl';
import { AxiosResponse } from 'axios';

const LeagueComponent: React.FC = () => {
    const params                                = useParams<{ id: string }>();
    const [ leagueName, setLeagueName ]         = useState<string>('');
    const [ showLeagueName, setShowLeagueName ] = useState<boolean>(false);
    const [ leagueFormat, setLeagueFormat ]     = useState<string>('');
    const [ location, setLocation ]             = useState<string | null>(null);
    const [ locationName, setLocationName ]     = useState<string>('');
    const [ year, setYear ]                     = useState<string>('');
    const t                                     = useTranslations('seo-tags');

    useEffect(() => {
        async function apiCall(): Promise<void> {
            await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_LEAGUE_ID, params.id))
                .then((response) => {
                    setLeagueName(response.data.name);
                    setLeagueFormat(getFormat(response.data.isLegacy));
                    setShowLeagueName(true);
                    setLocation(response.data.location);
                    setLocationName(response.data.locationName);
                    setYear(response.data.year);
                })
                .catch((err) => {
                    console.log(err)
                    console.log('error league id')
                });
        }

        apiCall();
    }, []);

    return (
        <main>
            <Breadcrumb
                loading   = {showLeagueName}
                component = {
                    <BreadcrumbLeague
                        title={`${leagueName} ${year}`}
                    />
                }>
            </Breadcrumb>
            <LeagueTournamentList
                id           = {params.id}
                format       = {leagueFormat}
                leagueName   = {leagueName}
                location     = {location}
                locationName = {locationName}
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