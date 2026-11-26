'use client';

import LeagueStages from '@/components/League/Stages';
import LeagueStandings from '@/components/League/Standings';
import useLeagueStandings from '@/hooks/useLeagueStandings';
import {TournamentType} from '@/types/schemas/database/tournament';
import leagueTabs, {LeagueTabType} from '@/types/schemas/website/league';

interface LeaguePlayersDataProps {
  active: LeagueTabType;
  tournaments: Array<TournamentType>;
  year: string;
}

const LeaguePlayersData = ({
  active,
  tournaments,
  year
}: LeaguePlayersDataProps) => {
  const {standings, champions, isLoading} = useLeagueStandings(tournaments);

  return (
    <>
      {active === leagueTabs.TOURNAMENTS && (
        <LeagueStages
          tournaments={tournaments}
          champions={champions}
          isLoading={isLoading}
        />
      )}

      {active === leagueTabs.STANDINGS && (
        <LeagueStandings
          standings={standings}
          isLoading={isLoading}
          year={year}
        />
      )}
    </>
  );
};

export default LeaguePlayersData;
