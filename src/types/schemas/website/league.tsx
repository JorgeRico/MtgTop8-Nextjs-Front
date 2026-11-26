export type LeagueTabType =
  | 'tournaments'
  | 'standings'
  | 'stats'
  | 'location';

export type LeagueStandingType = {
    name      : string;
    stages    : number;
    deck      : string;
    points    : number;
    wins      : number;
};

export type LeagueChampionType = {
    name : string;
    deck : string;
};

export type LeagueStandingsType = {
    standings  : Array<LeagueStandingType>;
    champions  : Record<number, LeagueChampionType>;
    isLoading  : boolean;
};
