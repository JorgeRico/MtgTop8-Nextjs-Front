export type TitleType = {
    title : string;
}

export type TitleAnyType = {
    title: React.ReactNode;
};

export type TitleComponentType = {
    Tag        : React.ElementType;
    className? : string;
    text       : React.ReactNode;
};