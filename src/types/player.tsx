export type PlayerLineType = {
    position  : number | null;
    player    : string;
    deck      : string;
    isHeader? : boolean;
}

export type PlayerItemType = {
    item  : any;
    index : number;
}

export type PlayerArrayType = {
    items    : Array<any>;
    isBlured : boolean;
}