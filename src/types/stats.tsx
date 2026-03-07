export type StatsType = {
    id       : string;
    isLeague : boolean;
    title    : string;
}

export type StatsPlayerType = {
    isPlayer : boolean;
}

export type StatsArrayItemsType = {
    items    : Array<any>;
    isPlayer : boolean;
    text     : string;
}

export type StatsItemType = {
    item     : any;
    isPlayer : boolean;
    text     : string;
}

export type StatsCardItemType = {
    text     : string;
    cardType : string;
    endpoint : string;
    isPlayer : boolean;
}