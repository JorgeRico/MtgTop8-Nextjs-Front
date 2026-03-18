export type TournamentType = {
    id         : number;
    idLeague   : string;
    name       : string;
    date       : string;
    players    : string;
    format     : number;
    leagueName : string;
    year       : string;
}

export type TournamentBluredType = {
    tournament : TournamentType;
    isBlured   : boolean;
}

export type TournamentSimpleType = {
    id         : string;
    tournament : TournamentType;
}

export type TournamentItemType = {
    name        : string,
    description : string,
    buttonText  : string
}

export type TournamentNormalType = {
    url   : string,
    items : Array<TournamentType>
}

export type TournamentBlockType = {
    leagueName     : string;
    format         : string;
    renderElements : Array<TournamentType> | null;
    url            : string;
    isBlured       : boolean;
    numPlayers     : number;
    classification : string | null;
    location       : string | null;
    locationName   : string;
}

export type TournamentListItemType = {
    id           : string;
    format       : string;
    leagueName   : string;
    location     : string | null;
    locationName : string;
}