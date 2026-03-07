export type TournamentType = {
    idLeague : string;
    name     : string;
    date     : string;
    players  : string;
}

export type TournamentBluredType = {
    tournament : any;
    isBlured   : boolean;
}

export type TournamentSimpleType = {
    id         : string;
    tournament : any;
}

export type TournamentItemType = {
    name        : string,
    description : string,
    buttonText  : string
}

export type TournamentNormalType = {
    url   : string,
    items : Array<any>
}

export type TournamentBlockType = {
    leagueName     : string;
    format         : string;
    renderElements : Array<any> | null;
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