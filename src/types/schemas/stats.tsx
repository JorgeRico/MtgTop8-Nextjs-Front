export type StatsType = {
    id       : string;
    isLeague : boolean;
    title    : string;
}

export type StatsPlayerType = {
    isPlayer : boolean;
}

export type StatsCardTotal = {
    num     : number;
    name    : string;
    imgUrl? : string | null | undefined;
}

export type StatsItemType = {
    item     : StatsCardTotal;
    isPlayer : boolean;
    text     : string;
}

export type StatsArrayItemsType = {
    items    : Array<StatsCardTotal>;
    isPlayer : boolean;
    text     : string;
}

export type StatsCardItemType = {
    text     : string;
    cardType : string;
    endpoint : string;
    isPlayer : boolean;
}

