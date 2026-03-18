import ModalPopUp from "@/components/Modal";
import { CardType } from "@/types/card";

const DeckCard: React.FC<CardType> = ({ card }) => {
    return (
        <>
            <article className="cardItem">
                {card.num} {card.name}
                <span className="modalImg">
                    <ModalPopUp img={card.imgUrl} name={card.name} modalType={`deck-${card.id}`} />
                </span>
            </article>
        </>
    )
}

export default DeckCard;