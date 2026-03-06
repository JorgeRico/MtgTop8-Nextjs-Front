import { useState, useEffect } from "react";
import statsTypes from "@/services/stats-types";
import { useTranslations } from 'next-intl';

type MyComponentProps = {
    deckName       : string;
    totalMaindeck  : number;
    totalSideboard : number;
}

const DeckDescription: React.FC<MyComponentProps> = ({ totalMaindeck, totalSideboard, deckName }) => {
    const t = useTranslations('deck');

    return (
        <article className="left w100 f24 ml12">
            <div className="left w100">{deckName}</div>
            <div className="left w100 f14 mt10">{t('Maindeck total cards')}: {totalMaindeck}</div>
            <div className="left w100 f14 mt5 mb10">{t('Sideboard total cards')}: {totalSideboard}</div>
        </article>
    )
}

export default DeckDescription;