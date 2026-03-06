import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import statsTypes from "@/services/stats-types.tsx";
import CardTypeList from "@/components/List/Deck/Normal/CardTypeList";
import { useTranslations } from 'next-intl';

type MyComponentProps = {
    items : PropTypes.array
}

const DeckSideboard: React.FC<MyComponentProps> = ({ items }) => {
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