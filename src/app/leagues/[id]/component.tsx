'use client';

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import Breadcrumb from '@/components/Breadcrumb';
import LeagueHero from '@/components/League/Hero';
import LeagueTabs from '@/components/League/Tabs';
import LeaguePlayersData from '@/components/League/PlayersData';
import LeagueVenue from '@/components/League/Venue';
import StatsPanel from '@/components/Stats';
import {getAxiosEndpoint, replaceUrlIdParam} from '@/hooks/useApi';
import {getFormat} from '@/hooks/useCommon';
import endpoints from '@/types/server/endpoints';
import {
  AveragePlayersLeague,
  LeagueType
} from '@/types/schemas/database/league';
import {TournamentType} from '@/types/schemas/database/tournament';
import leagueTabs, {LeagueTabType} from '@/types/schemas/website/league';
import LeagueComponentFooter from '@/app/leagues/[id]/footer';

interface LeagueComponentProps {
  id: string;
  initialLeague: LeagueType;
  initialAverage: number;
  initialTournaments: Array<TournamentType>;
}

const LeagueComponent = ({
  id,
  initialLeague,
  initialAverage,
  initialTournaments
}: LeagueComponentProps) => {
  const params = useParams<{id: string}>();
  const [league, setLeague] = useState<LeagueType>(initialLeague);
  const [average, setAverage] = useState<number>(initialAverage);
  const [tournaments, setTournaments] =
    useState<Array<TournamentType>>(initialTournaments);
  const [activeTab, setActiveTab] = useState<LeagueTabType>(leagueTabs.VENUE);
  const [playersActivated, setPlayersActivated] = useState<boolean>(false);
  const tHeader = useTranslations('header');

  useEffect(() => {
    if (params.id === id) return;

    async function apiCall(): Promise<void> {
      try {
        const [leagueResponse, averageResponse, tournamentsResponse] =
          await Promise.all([
            getAxiosEndpoint<LeagueType>(
              replaceUrlIdParam(endpoints.API_LEAGUE_ID, params.id)
            ),
            getAxiosEndpoint<AveragePlayersLeague>(
              replaceUrlIdParam(endpoints.API_LEAGUE_ID_AVERAGE, params.id)
            ),
            getAxiosEndpoint<Array<TournamentType>>(
              replaceUrlIdParam(endpoints.API_LEAGUE_TOURNAMENTS, params.id)
            )
          ]);

        setLeague(leagueResponse.data);
        setAverage(averageResponse.data.average);
        setTournaments(tournamentsResponse.data);
        setPlayersActivated(true);
        setActiveTab(leagueTabs.TOURNAMENTS);
      } catch (err) {
        console.log(err);
      }
    }

    apiCall();
  }, [params.id, id]);

  const handleTabChange = (tab: LeagueTabType): void => {
    if (tab === leagueTabs.TOURNAMENTS || tab === leagueTabs.STANDINGS) {
      setPlayersActivated(true);
    }

    setActiveTab(tab);
  };

  const currentId = params.id || id;
  const year = league.year || '';
  const lastSync = tournaments.reduce(
    (latest, tournament) =>
      tournament.date > latest ? tournament.date : latest,
    ''
  );
  const registeredPlayers = tournaments.reduce(
    (most, tournament) => Math.max(most, tournament.players),
    0
  );

  return (
    <div className="league-detail flex flex-col gap-space-lg">
      <Breadcrumb
        ariaLabel={tHeader('breadcrumb.league')}
        items={[
          {href: '/', icon: 'home', label: tHeader('breadcrumb.home')},
          {label: tHeader('breadcrumb.league')},
          {label: `${league.name} ${year}`}
        ]}
      />

      <LeagueHero
        leagueName={league.name}
        year={year}
        format={getFormat(league.isLegacy)}
        location={league.location}
        locationName={league.locationName}
        classification={league.classification}
        isCurrent={league.current}
        numPlayers={registeredPlayers}
        numStages={tournaments.length}
        avgPlayers={average}
      />

      <LeagueTabs
        active={activeTab}
        setActive={handleTabChange}
        numStages={tournaments.length}
        lastSync={lastSync}
      />

      <div role="tabpanel">
        {playersActivated && (
          <LeaguePlayersData
            active={activeTab}
            tournaments={tournaments}
            year={year}
          />
        )}

        {activeTab === leagueTabs.STATS && (
          <StatsPanel id={currentId} isLeague={true} />
        )}

        {activeTab === leagueTabs.VENUE && (
          <LeagueVenue
            location={league.location}
            locationName={league.locationName}
            classification={league.classification}
            year={year}
            tournaments={tournaments}
            url={endpoints.HTTP_TOURNAMENT}
          />
        )}
      </div>

      <LeagueComponentFooter></LeagueComponentFooter>
    </div>
  );
};

export default LeagueComponent;
