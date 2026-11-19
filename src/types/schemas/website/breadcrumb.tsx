export type BreadcrumbLoadingType = {
    component : React.ReactNode;
    loading   : boolean;
};

export type BreadcrumbTournamentType = {
    title    : string;
    date     : string;
    endpoint : string;
};

export type BreadcrumbSimpleType = {
    title?  : string | null;
    isHome? : boolean;
}

export type BreadcrumbTitleLinkType = {
    endpoint : string;
    title    : string;
};

export type BreadcrumbItemType = {
    label: string;
    href?: string;
    icon?: string;
};

export type BreadcrumbNavType = {
    ariaLabel?: string;
    className?: string;
    items: BreadcrumbItemType[];
};
