import "./module.css";
import DeckSideboard from "@/components/List/Deck/Normal/Sideboard";
import DeckMainboard from "@/components/List/Deck/Normal/Mainboard";
import DeckDescription from "@/components/List/Deck/Normal/Description";

type MyComponentProps = {
    items    : PropTypes.array,
    deckName : string,
    isBlured : boolean
}

const Deck: React.FC<MyComponentProps> = ({ items, deckName, isBlured }) => {
    return (
        <>
            {items.length > 0 && (
                <article className={isBlured ? "blink blured" : ""}>
                    <DeckDescription items={items} deckName={deckName}></DeckDescription>
                    <DeckMainboard items={items}></DeckMainboard>
                    <DeckSideboard items={items}></DeckSideboard>
                </article>
            )}
        </>
    )
}

export default Deck;