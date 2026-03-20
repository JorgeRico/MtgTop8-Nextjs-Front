import { CardType } from "@/types/schemas/card";

export type DeckType = {
    items    : Array<CardType>;
    deckName : string;
    isBlured : boolean;
}

export type DeckBoardType = {
    items : Array<CardType>
}

export type DeckCardDescriptionType = {
    deckName       : string;
    totalMaindeck  : number;
    totalSideboard : number;
}

export type DeckCardTListType = {
    items : Array<CardType>;
    text  : string;
}
