
export type DeckType = {
    items    : Array<any>;
    deckName : string;
    isBlured : boolean;
}

export type DeckBoardType = {
    items : Array<any>
}

export type DeckCardDescriptionType = {
    deckName       : string;
    totalMaindeck  : number;
    totalSideboard : number;
}

export type DeckCardTListType = {
    items : Array<any>;
    text  : string;
}

export type DeckCardType = {
    card : any
}
