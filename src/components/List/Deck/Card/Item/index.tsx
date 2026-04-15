import ModalPopUp from "@/components/Modal";
import { CardType } from "@/types/schemas/database/card";

interface DeckCardProps {
    card: CardType;
}

const DeckCard: React.FC<DeckCardProps> = ({ card }) => {
    return (
        <article className="cardItem" aria-label={card.name}>
            {card.num} {card.name}
            <span className="modalImg">
                <ModalPopUp img={card.imgUrl} name={card.name} modalType={`deck-${card.id}`} />
            </span>
        </article>
    )
}

export default DeckCard;