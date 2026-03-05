import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import statsTypes from "@/services/stats-types.tsx";
import CardTypeList from "@/components/List/Deck/Normal/CardTypeList";
import DeckCard from "@/components/List/Deck/Normal/Card";
import { useTranslations } from 'next-intl';
import DeckMainboard from '@/components/List/Deck/Normal/Mainboard';

type MyComponentProps = {
    items : PropTypes.array
}

const DeckMainboard: React.FC<MyComponentProps> = ({ items }) => {
    const [ creatureItems, setCreatureItems ]         = useState([]);
    const [ instantItems, setInstantItems ]           = useState([]);
    const [ sorceryItems, setSorceryItems ]           = useState([]);
    const [ planeswalkerItems, setPlaneswalkerItems ] = useState([]);
    const [ artifactItems, setArtifactItems ]         = useState([]);
    const [ enchantmentItems, setEnchantmentItems ]   = useState([]);
    const [ landItems, setLandItems ]                 = useState([]);
    const t                                           = useTranslations('deck');

    function getCardTypes(deck, type) {
        let itemsList = [];

        for (var i = 0; i < length; i++) {
            if (deck[i].board === t(statsTypes.MD) && deck[i].cardType === type) {
                itemsList.push(
                    <DeckCard card={deck[i]} key={uuidv4()}></DeckCard>
                )
            }
        }

        return itemsList;
    }

    function setOptions(items) {
        const statsType = [ t(statsTypes.PLANESWALKER), t(statsTypes.CREATURE), t(statsTypes.INSTANT), t(statsTypes.SORCERY), t(statsTypes.ARTIFACT), t(statsTypes.ENCHANTMENT), t(statsTypes.LAND) ]
        const operators = [ setPlaneswalkerItems, setCreatureItems, setInstantItems, setSorceryItems, setArtifactItems, setEnchantmentItems, setLandItems]

        for (var i = 0; i < statsType.length; i++) {
            operators[i](getCardTypes(items, statsType[i]))
        }
    }

    useEffect(() => {
        if (items.length > 0) {
            setOptions(items)
        }
    }, [items.length > 0]);

    return (
        {items.length > 0 && (
            <article className="left maindeck">
                <CardTypeList items={planeswalkerItems} text={t('Planeswalkers')}></CardTypeList>
                <CardTypeList items={creatureItems} text={t('Creatures')}></CardTypeList>
                <CardTypeList items={instantItems} text={t('Instants')}></CardTypeList>
                <CardTypeList items={sorceryItems} text={t('Sorceries')}></CardTypeList>
                <CardTypeList items={artifactItems} text={t('Artifacts')}></CardTypeList>
                <CardTypeList items={enchantmentItems} text={t('Enchantments')}></CardTypeList>
                <CardTypeList items={landItems} text={t('Lands')}></CardTypeList>
            </article>
        )}
    )
}

export default DeckMainboard;