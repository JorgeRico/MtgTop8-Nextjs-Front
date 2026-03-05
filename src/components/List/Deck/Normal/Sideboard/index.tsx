import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import statsTypes from "@/services/stats-types.tsx";
import CardTypeList from "@/components/List/Deck/Normal/CardTypeList";
import DeckCard from "@/components/List/Deck/Normal/Card";
import { useTranslations } from 'next-intl';
import DeckSideboard from './index';

type MyComponentProps = {
    items : PropTypes.array
}

const DeckSideboard: React.FC<MyComponentProps> = ({ items }) => {
    const [ sideItems, setSideItems ] = useState([]);
    const t                           = useTranslations('deck');

    function getSideboard(deck) {
        let itemsList = [];

        for (var i = 0; i < deck.length; i++) {
            if (deck[i].board === t(statsTypes.SB)) {
                itemsList.push(
                    <DeckCard card={deck[i]} key={uuidv4()}></DeckCard>
                )
            }
        }

        return itemsList;
    }

    useEffect(() => {
        if (items.length > 0) {
            setSideItems(getSideboard(items));
        }
    }, [items.length > 0]);

    return (
        {items.length > 0 && (
            <article className="left sideboard">
                <CardTypeList items={sideItems} text={t('Sideboard')}></CardTypeList>
            </article>
        )}
    )
}

export default DeckSideboard;