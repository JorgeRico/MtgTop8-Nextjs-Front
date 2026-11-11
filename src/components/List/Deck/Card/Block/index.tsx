import DeckCard from "@/components/List/Deck/Card/Item";
import { DeckCardTListType } from "@/types/schemas/database/deck";

const CardTypeList: React.FC<DeckCardTListType> = ({ items, text }) => {
    return (
        <div className="deckItems mb10" aria-labelledby={text}>
            <h4 id={text}>{text}</h4>
            {items?.map((item) => (
                <DeckCard card={item} key={item.id}></DeckCard>
            ))}
        </div>
    )
}

export default CardTypeList;