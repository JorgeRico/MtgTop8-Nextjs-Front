export type LeagueType = {
    current      : boolean;
    id           : number;
    isLegacy     : boolean;
    location     : string;
    locationName : string;
    name         : string;
    year         : number;
}

export type LeagueItemsType = {
    url      : string;
    items    : Array<any>;
    isBlured : boolean;
}