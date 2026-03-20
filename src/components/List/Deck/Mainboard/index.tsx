import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import statsTypes from "@/types/server/stats-types";
import CardTypeList from "@/components/List/Deck/Card/Block";
import { useTranslations } from 'next-intl';
import { DeckBoardType } from "@/types/schemas/deck";
import { CardType } from "@/types/schemas/card";

const DeckMainboard: React.FC<DeckBoardType> = ({ items }) => {
    const [ creatureItems, setCreatureItems ]         = useState<CardType[]>([]);
    const [ instantItems, setInstantItems ]           = useState<CardType[]>([]);
    const [ sorceryItems, setSorceryItems ]           = useState<CardType[]>([]);
    const [ planeswalkerItems, setPlaneswalkerItems ] = useState<CardType[]>([]);
    const [ artifactItems, setArtifactItems ]         = useState<CardType[]>([]);
    const [ enchantmentItems, setEnchantmentItems ]   = useState<CardType[]>([]);
    const [ landItems, setLandItems ]                 = useState<CardType[]>([]);
    const t                                           = useTranslations('deck');

    function getCardTypes(deck: CardType[]): void {
        let planeswalkers: CardType[] = [];
        let creatures    : CardType[] = [];
        let instants     : CardType[] = [];
        let sorceries    : CardType[] = [];
        let artifacts    : CardType[] = [];
        let enchantments : CardType[] = [];
        let lands        : CardType[] = [];

        for (var i = 0; i < deck.length; i++) {
            if (deck[i].cardType === statsTypes.PLANESWALKER) {
                planeswalkers.push(deck[i]);
            }
            if (deck[i].cardType === statsTypes.CREATURE) {
                creatures.push(deck[i]);
            }
            if (deck[i].cardType === statsTypes.INSTANT) {
                instants.push(deck[i]);
            }
            if (deck[i].cardType === statsTypes.SORCERY) {
                sorceries.push(deck[i]);
            }
            if (deck[i].cardType === statsTypes.ARTIFACT) {
                artifacts.push(deck[i]);
            }
            if (deck[i].cardType === statsTypes.ENCHANTMENT) {
                enchantments.push(deck[i]);
            }
            if (deck[i].cardType === statsTypes.LAND) {
                lands.push(deck[i]);
            }
        }

        setCreatureItems(creatures);
        setInstantItems(instants);
        setSorceryItems(sorceries);
        setPlaneswalkerItems(planeswalkers);
        setArtifactItems(artifacts);
        setEnchantmentItems(enchantments);
        setLandItems(lands);
    }

    useEffect(() => {
        getCardTypes(items);
    }, []);

    return (
        <article className="left maindeck">
            {planeswalkerItems.length > 0 &&
                <CardTypeList items={planeswalkerItems} text={t('Planeswalkers')}></CardTypeList>
            }
            {creatureItems.length > 0 &&
                <CardTypeList items={creatureItems} text={t('Creatures')}></CardTypeList>
            }
            {instantItems.length > 0 &&
                <CardTypeList items={instantItems} text={t('Instants')}></CardTypeList>
            }
            {sorceryItems.length > 0 &&
                <CardTypeList items={sorceryItems} text={t('Sorceries')}></CardTypeList>
            }
            {artifactItems.length > 0 &&
                <CardTypeList items={artifactItems} text={t('Artifacts')}></CardTypeList>
            }
            {enchantmentItems.length > 0 &&
                <CardTypeList items={enchantmentItems} text={t('Enchantments')}></CardTypeList>
            }
            {landItems.length > 0 &&
                <CardTypeList items={landItems} text={t('Lands')}></CardTypeList>
            }
        </article>
    )
}

export default DeckMainboard;