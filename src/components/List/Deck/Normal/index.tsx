import "./module.css";
import DeckSideboard from "@/components/List/Deck/Normal/Sideboard";
import DeckMainboard from "@/components/List/Deck/Normal/Mainboard";
import DeckDescription from "@/components/List/Deck/Normal/Description";
import { useEffect, useState } from "react";
import statsTypes from "@/services/stats-types.tsx";

type MyComponentProps = {
    items    : PropTypes.array,
    deckName : string,
    isBlured : boolean
}

const Deck: React.FC<MyComponentProps> = ({ items, deckName, isBlured }) => {
    const [ maindeck, setMaindeck ]             = useState([]);
    const [ sideboard, setSideboard ]           = useState([]);
    const [ totalMaindeck, setTotalMaindeck ]   = useState(0);
    const [ totalSideboard, setTotalSideboard ] = useState(0);

    function getDeckCards(deck) {
        let itemsListMain = [];
        let itemsListSide = [];
        let totalMain  = 0;
        let totalSide  = 0;

        for (var i = 0; i < deck.length; i++) {
            if (deck[i].board === statsTypes.MD) {
                totalMain = totalMain + parseInt(deck[i].num);
                itemsListMain.push(deck[i])
            }
            if (deck[i].board === statsTypes.SB) {
                totalSide = totalSide + parseInt(deck[i].num);
                itemsListSide.push(deck[i])
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