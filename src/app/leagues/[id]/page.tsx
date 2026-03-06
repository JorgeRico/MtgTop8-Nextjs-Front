'use client'

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Template from "@/views/layout/template";
import LeagueTournamentList from "@/components/List/League/Tournament/List";
import Stats from "@/app/_stats";
import endpoints from "@/services/endpoints.tsx";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi.tsx';
import { getFormat } from '@/hooks/useCommon.tsx';
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbLeague from "@/components/Breadcrumb/League";
import { useTranslations } from 'next-intl';

const League: React.FC = () => {
    const params                                = useParams<{ id: string }>();
    const [ leagueName, setLeagueName]          = useState(null);
    const [ showLeagueName, setShowLeagueName ] = useState(false);
    const [ leagueFormat, setLeagueFormat ]     = useState(null);
    const [ location, setLocation ]             = useState(null);
    const [ locationName, setLocationName ]     = useState(null);
    const [ year, setYear ]                     = useState(null);
    const t                                     = useTranslations('seo-tags');

    useEffect(() => {
        async function apiCall() {
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
        <>
            <Breadcrumb
                loading   = {showLeagueName}
                component = {
                    <BreadcrumbLeague
                        title={`${leagueName} ${year}`}
                    ></BreadcrumbLeague>
                }>
            </Breadcrumb>
            <LeagueTournamentList
                id           = {params.id}
                format       = {leagueFormat}
                leagueName   = {leagueName}
                location     = {location}
                locationName = {locationName}>
            </LeagueTournamentList>
            <Stats
                id       = {params.id}
                isLeague = {true}
                title    = {`${t('leagues.stats')} ${leagueName ? ' - ' + leagueName : ''}`}
            />
        </>
    );
}

export default League;