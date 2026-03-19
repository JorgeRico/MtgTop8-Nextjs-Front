export type PdfItemType = {
    name     : string;
    surname  : string;
    deckName : string;
    event    : string;
}

export type PdfValuesType = {
    height      : number;
    width       : number;
    rightColumn : number;
    leftColumn  : number;
}

export type PdfCardType = {
    num  : string;
    card : string;
}

export type PdfType = {
    name      : string;
    surname   : string;
    deckName  : string;
    event     : string;
    mainboard : string;
    sideboard : string;
}
