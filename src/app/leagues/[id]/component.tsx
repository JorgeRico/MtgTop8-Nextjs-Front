'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Breadcrumb from '@/components/Breadcrumb';
import Stats from '@/app/_stats';
import LeagueHero from '@/components/League/Hero';
import LeagueTabs from '@/components/League/Tabs';
import LeagueStages from '@/components/League/Stages';
import LeagueStandings from '@/components/League/Standings';
import LeagueVenue from '@/components/League/Venue';
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import { getFormat } from '@/hooks/useCommon';
import useLeagueStandings from '@/hooks/useLeagueStandings';
import endpoints from '@/types/server/endpoints';
import { AveragePlayersLeague, LeagueType } from '@/types/schemas/database/league';
import { TournamentType } from '@/types/schemas/database/tournament';
import { LeagueTabType } from '@/types/schemas/website/league';

interface LeagueComponentProps {
    id                : string;
    initialLeague     : LeagueType;
    initialAverage    : number;
    initialTournaments: Array<TournamentType>;
}

const LeagueComponent = ({ id, initialLeague, initialAverage, initialTournaments }: LeagueComponentProps) => {
    const params                       = useParams<{ id: string }>();
    const [ league, setLeague ]        = useState<LeagueType>(initialLeague);
    const [ average, setAverage ]      = useState<number>(initialAverage);
    const [ tournaments, setTournaments ] = useState<Array<TournamentType>>(initialTournaments);
    const [ activeTab, setActiveTab ]  = useState<LeagueTabType>('location');
    const t                            = useTranslations('league.detail');
    const tHeader                      = useTranslations('header');
    const tSeo                         = useTranslations('seo-tags');
    const { standings, champions, isLoading, playerCount } = useLeagueStandings(tournaments);

    useEffect(() => {
        if (params.id === id) return;

        async function apiCall(): Promise<void> {
            try {
                const [ leagueResponse, averageResponse, tournamentsResponse ] = await Promise.all([
                    getAxiosEndpoint<LeagueType>(replaceUrlIdParam(endpoints.API_LEAGUE_ID, params.id)),
                    getAxiosEndpoint<AveragePlayersLeague>(replaceUrlIdParam(endpoints.API_LEAGUE_ID_AVERAGE, params.id)),
                    getAxiosEndpoint<Array<TournamentType>>(replaceUrlIdParam(endpoints.API_LEAGUE_TOURNAMENTS, params.id))
                ]);

                setLeague(leagueResponse.data);
                setAverage(averageResponse.data.average);
                setTournaments(tournamentsResponse.data);
                setActiveTab('tournaments');
            } catch (err) {
                console.log(err);
            }
        }

        apiCall();
    }, [ params.id, id ]);

    const currentId          = params.id || id;
    const year               = league.year || '';
    const lastSync           = tournaments.reduce((latest, tournament) => tournament.date > latest ? tournament.date : latest, '');
    const registeredPlayers  = playerCount || tournaments.reduce((most, tournament) => Math.max(most, tournament.players), 0);

    return (
        <div className="league-detail flex flex-col gap-space-lg">
            <Breadcrumb
                ariaLabel = {tHeader('breadcrumb.league')}
                items = {[
                    { href: '/', icon: 'home', label: tHeader('breadcrumb.home') },
                    { label: tHeader('breadcrumb.league') },
                    { label: `${league.name} ${year}` }
                ]}
            />

            <LeagueHero
                leagueName     = {league.name}
                year           = {year}
                format         = {getFormat(league.isLegacy)}
                location       = {league.location}
                locationName   = {league.locationName}
                classification = {league.classification}
                isCurrent      = {league.current}
                numPlayers     = {registeredPlayers}
                numStages      = {tournaments.length}
                avgPlayers     = {average}
            />

            <LeagueTabs
                active    = {activeTab}
                setActive = {setActiveTab}
                numStages = {tournaments.length}
                lastSync  = {lastSync}
            />

            <div role="tabpanel">
                {activeTab === 'tournaments' && (
                    <LeagueStages
                        tournaments = {tournaments}
                        champions   = {champions}
                        url         = {endpoints.HTTP_TOURNAMENT}
                    />
                )}

                {activeTab === 'standings' && (
                    <LeagueStandings
                        standings = {standings}
                        isLoading = {isLoading}
                        year      = {year}
                    />
                )}

                {activeTab === 'meta' && (
                    <Stats
                        id       = {currentId}
                        isLeague = {true}
                        title    = {`${tSeo('leagues.stats')} - ${league.name}`}
                    />
                )}

                {activeTab === 'location' && (
                    <LeagueVenue
                        location       = {league.location}
                        locationName   = {league.locationName}
                        classification = {league.classification}
                        year           = {year}
                        tournaments    = {tournaments}
                        url            = {endpoints.HTTP_TOURNAMENT}
                    />
                )}
            </div>

            <section className="bg-surface-card rounded-xl p-space-md md:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-lg">
                <div className="flex items-start gap-space-md">
                    <span className="material-symbols-outlined text-primary text-size-26">gavel</span>
                    <div className="flex flex-col gap-space-xs">
                        <h2 className="font-headline-sm text-headline-sm text-mana-white">{t('rulebook_title')}</h2>
                        <p className="font-body-sm text-body-sm text-mana-black max-w-2xl">{t('rulebook_text')}</p>
                        <p className="font-label-sm text-label-sm text-mana-black uppercase">{t('rulebook_note')}</p>
                    </div>
                </div>
                <Link className="px-space-md py-space-sm rounded-lg bg-surface-elevated hover:bg-primary-container hover:text-white text-on-surface font-label-md text-label-md transition-colors flex items-center gap-2 shrink-0" href={endpoints.HTTP_CONTACT}>
                    <span className="material-symbols-outlined text-size-18">contact_support</span>
                    <span>{t('rulebook_contact')}</span>
                </Link>
            </section>
        </div>
    );
};

export default LeagueComponent;
