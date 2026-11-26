export const leagueTabs = {
  TOURNAMENTS: 'tournaments',
  STANDINGS: 'standings',
  STATS: 'stats',
  VENUE: 'venue'
} as const;

export type LeagueTabType = (typeof leagueTabs)[keyof typeof leagueTabs];

export type LeagueStandingType = {
  name: string;
  stages: number;
  deck: string;
  points: number;
  wins: number;
};

export type LeagueChampionType = {
  name: string;
  deck: string;
};

export type LeagueStandingsType = {
  standings: Array<LeagueStandingType>;
  champions: Record<number, LeagueChampionType>;
  isLoading: boolean;
};

export default leagueTabs;
