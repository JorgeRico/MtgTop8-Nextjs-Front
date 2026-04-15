import DeckCard from "@/components/List/Deck/Card/Item";
import { v4 as uuidv4 } from "uuid";
import { DeckCardTListType } from "@/types/schemas/database/deck";

const CardTypeList: React.FC<DeckCardTListType> = ({ items, text }) => {
    return (
        <div className="deckItems mb10" aria-labelledby={text}>
            <h4 id={text}>{text}</h4>
            {items?.map((item) => (
                <DeckCard card={item} key={uuidv4()}></DeckCard>
            ))}
        </div>
    )
}

export default CardTypeList;