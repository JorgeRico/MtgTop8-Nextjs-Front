import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import statsTypes from "@/services/stats-types";
import CardTypeList from "@/components/List/Deck/Normal/CardTypeList";
import { useTranslations } from 'next-intl';
import { DeckBoardType } from "@/types/deck";

const DeckSideboard: React.FC<DeckBoardType> = ({ items }) => {
    const t = useTranslations('deck');

    return (
        <>
            {items.length > 0 && (
                <article className="left sideboard">
                    <CardTypeList items={items} text={t('Sideboard')}></CardTypeList>
                </article>
            )}
        </>
    )
}

export default DeckSideboard;