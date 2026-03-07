import ModalPopUp from "@/components/Modal";
import { DeckCardType } from "@/types/deck";

const DeckCard: React.FC<DeckCardType> = ({ card }) => {
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