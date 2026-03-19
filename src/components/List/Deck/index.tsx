import "./module.css";
import DeckSideboard from "@/components/List/Deck/Sideboard";
import DeckMainboard from "@/components/List/Deck/Mainboard";
import DeckDescription from "@/components/List/Deck/Description";
import { useEffect, useState } from "react";
import statsTypes from "@/types/stats-types";
import { DeckType } from "@/types/deck";
import { CardType } from "@/types/card";

const Deck: React.FC<DeckType> = ({ items, deckName, isBlured }) => {
    const [ maindeck, setMaindeck ]             = useState<CardType[]>([]);
    const [ sideboard, setSideboard ]           = useState<CardType[]>([]);
    const [ totalMaindeck, setTotalMaindeck ]   = useState(0);
    const [ totalSideboard, setTotalSideboard ] = useState(0);

    function getDeckCards(deck: CardType[]): void {
        let itemsListMain: CardType[] = [];
        let itemsListSide: CardType[] = [];
        let totalMain  = 0;
        let totalSide  = 0;

        for (var i = 0; i < deck.length; i++) {
            if (deck[i].board === statsTypes.MD) {
                totalMain = totalMain + deck[i].num;
                itemsListMain.push(deck[i]);
            }
            if (deck[i].board === statsTypes.SB) {
                totalSide = totalSide + deck[i].num;
                itemsListSide.push(deck[i]);
            }
        }

        setMaindeck(itemsListMain)
        setSideboard(itemsListSide)
        setTotalMaindeck(totalMain);
        setTotalSideboard(totalSide);
    }

    useEffect(() => {
        getDeckCards(items);
    }, []);

    return (
        <section>
            <article className={isBlured === true ? "blink blured" : ""}>
                <DeckDescription
                    totalMaindeck  = {totalMaindeck}
                    totalSideboard = {totalSideboard}
                    deckName       = {deckName}
                />
                {maindeck.length > 0 &&
                    <DeckMainboard items={maindeck}></DeckMainboard>
                }
                {sideboard.length > 0 &&
                    <DeckSideboard items={sideboard}></DeckSideboard>
                }
            </article>
        </section>
    )
}

export default Deck;