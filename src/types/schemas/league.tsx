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