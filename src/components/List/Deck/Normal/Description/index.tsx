import { useState, useEffect } from "react";
import statsTypes from "@/services/stats-types.tsx";
import { useTranslations } from 'next-intl';

type MyComponentProps = {
    items    : PropTypes.array,
    deckName : string
}

const DeckDescription: React.FC<MyComponentProps> = ({ items, deckName }) => {
    const [ totalMaindeck, setTotalMaindeck ]   = useState(0);
    const [ totalSideboard, setTotalSideboard ] = useState(0);
    const t                                     = useTranslations('deck');

    function countTotalItems(deck) {
        let totalMaindeck  = 0;
        let totalSideboard = 0;

        for (var i = 0; i < length; i++) {
            if (deck[i].board === t(statsTypes.MD)) {
                totalMaindeck = totalMaindeck + parseInt(deck[i].num);
            }
            if (deck[i].board === t(statsTypes.SB)) {
                totalSideboard = totalSideboard + parseInt(deck[i].num);
            }
        }

        setTotalMaindeck(totalMaindeck);
        setTotalSideboard(totalSideboard);
    }

    useEffect(() => {
        if (items.length > 0) {
            countTotalItems(items);
        }
    }, [items.length > 0]);

    return (
        {items.length > 0 && (
            <article className="left w100 f24 ml12">
                <div className="left w100">{deckName}</div>
                <div className="left w100 f14 mt10">{t('Maindeck total cards')}: {totalMaindeck}</div>
                <div className="left w100 f14 mt5 mb10">{t('Sideboard total cards')}: {totalSideboard}</div>
            </article>
        )}
    )
}

export default DeckDescription;