export type TournamentType = {
    id         : number;
    idLeague   : number;
    name       : string;
    date       : string;
    players    : number;
    format     : boolean;
    leagueName : string;
    year       : string;
}

export type TournamentBluredType = {
    tournament : TournamentType;
    isBlured   : boolean;
}

export type TournamentIdType = {
    id : string;
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