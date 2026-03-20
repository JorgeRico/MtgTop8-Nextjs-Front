export type PlayerLineType = {
    position  : number | null;
    player    : string;
    deck      : string;
    isHeader? : boolean;
}

export type PlayerItemType = {
    item  : PlayerType;
    index : number;
}

export type PlayerArrayBluredType = {
    items    : Array<PlayerType>;
    isBlured : boolean;
}

export type PlayerType = {
    id       : number;
    name     : string;
    position : number;
    idDeck   : number;
    deckName : string;
}