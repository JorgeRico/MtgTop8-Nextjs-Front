import { TournamentType } from "@/types/schemas/database/tournament";

export type LeagueType = {
    id             : string;
    current        : boolean;
    isLegacy       : boolean;
    location       : string;
    locationName   : string;
    name           : string;
    year           : string;
    classification : string;
}

export type LeagueItemsType = {
    url      : string;
    items    : Array<LeagueType>;
    isBlured : boolean;
}

export type PastLeagues = {
    leagues : Array<LeagueType>;
    total   : number;
}

export type AveragePlayersLeague = {
    average : number;
}

export type LeagueTournamentType = {
    leagueName     : string;
    format         : string;
    isBlured       : boolean;
    numPlayers     : number;
    location       : string | null;
    locationName   : string;
    classification : string;
}

export type LeagueIdType = {
    id : string;
}

export type LeagueTournamentElements = {
    isBlured       : boolean;
    renderElements : Array<TournamentType>;
    url            : string;
}