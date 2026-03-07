import { useState, useEffect } from "react";
import statsTypes from "@/types/stats-types";
import { useTranslations } from 'next-intl';
import { DeckCardDescriptionType } from "@/types/deck";

const DeckDescription: React.FC<DeckCardDescriptionType> = ({ totalMaindeck, totalSideboard, deckName }) => {
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