import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import statsTypes from "@/services/stats-types";
import CardTypeList from "@/components/List/Deck/Normal/CardTypeList";
import DeckCard from "@/components/List/Deck/Normal/Card";
import { useTranslations } from 'next-intl';
import { DeckBoardType } from "@/types/deck";

const DeckMainboard: React.FC<DeckBoardType> = ({ items }) => {
    const [ creatureItems, setCreatureItems ]         = useState<any>([]);
    const [ instantItems, setInstantItems ]           = useState<any>([]);
    const [ sorceryItems, setSorceryItems ]           = useState<any>([]);
    const [ planeswalkerItems, setPlaneswalkerItems ] = useState<any>([]);
    const [ artifactItems, setArtifactItems ]         = useState<any>([]);
    const [ enchantmentItems, setEnchantmentItems ]   = useState<any>([]);
    const [ landItems, setLandItems ]                 = useState<any>([]);
    const t                                           = useTranslations('deck');

    function getCardTypes(deck: any): void {
        let planeswalkers: any[] = [];
        let creatures    : any[] = [];
        let instants     : any[] = [];
        let sorceries    : any[] = [];
        let artifacts    : any[] = [];
        let enchantments : any[] = [];
        let lands        : any[] = [];

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
        if (items.length > 0) {
            getCardTypes(items)
        }
    }, [items.length > 0]);

    return (
        <>
            {items.length > 0 && (
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
            )}
        </>
    )
}

export default DeckMainboard;