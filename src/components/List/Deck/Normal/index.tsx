import "./module.css";
import DeckSideboard from "@/components/List/Deck/Normal/Sideboard";
import DeckMainboard from "@/components/List/Deck/Normal/Mainboard";
import DeckDescription from "@/components/List/Deck/Normal/Description";
import { useEffect, useState } from "react";
import statsTypes from "@/services/stats-types";
import { DeckType } from "@/types/deck";

const Deck: React.FC<DeckType> = ({ items, deckName, isBlured }) => {
    const [ maindeck, setMaindeck ]             = useState<any>([]);
    const [ sideboard, setSideboard ]           = useState<any>([]);
    const [ totalMaindeck, setTotalMaindeck ]   = useState(0);
    const [ totalSideboard, setTotalSideboard ] = useState(0);

    function getDeckCards(deck: any): void {
        let itemsListMain: any[] = [];
        let itemsListSide: any[] = [];
        let totalMain  = 0;
        let totalSide  = 0;

        for (var i = 0; i < deck.length; i++) {
            if (deck[i].board === statsTypes.MD) {
                totalMain = totalMain + parseInt(deck[i].num);
                itemsListMain.push(deck[i]);
            }
            if (deck[i].board === statsTypes.SB) {
                totalSide = totalSide + parseInt(deck[i].num);
                itemsListSide.push(deck[i]);
            }
        }

        setMaindeck(itemsListMain)
        setSideboard(itemsListSide)
        setTotalMaindeck(totalMain);
        setTotalSideboard(totalSide);
    }

    useEffect(() => {
        if (items.length > 0) {
            getDeckCards(items);
        }
    }, [items.length > 0]);

    return (
        <>
            {items.length > 0 && (
                <article className={isBlured ? "blink blured" : ""}>
                    <DeckDescription
                        totalMaindeck={totalMaindeck}
                        totalSideboard={totalSideboard}
                        deckName={deckName}>
                    </DeckDescription>
                    {maindeck.length > 0 &&
                        <DeckMainboard items={maindeck}></DeckMainboard>
                    }
                    {sideboard.length > 0 &&
                        <DeckSideboard items={sideboard}></DeckSideboard>
                    }
                </article>
            )}
        </>
    )
}

export default Deck;