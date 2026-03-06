import DeckCard from "@/components/List/Deck/Normal/Card";
import { v4 as uuidv4 } from "uuid";

type MyComponentProps = {
    items : PropTypes.array;
    text  : string;
}

const CardTypeList: React.FC<MyComponentProps> = ({ items, text }) => {
    return (
        <>
            {(items.length > 0) && (
                <div className="deckItems mb10">
                    <h4>{text}</h4>
                    {items?.map((item) => (
                        <DeckCard card={item} key={uuidv4()}></DeckCard>
                    ))}
                </div>
            )}
        </>
    )
}

export default CardTypeList;