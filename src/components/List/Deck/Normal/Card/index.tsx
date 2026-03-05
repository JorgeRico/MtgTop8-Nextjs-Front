import ModalPopUp from "@/components/Modal";

type MyComponentProps = {
    card : PropTypes.object
}
const DeckCard: React.FC<MyComponentProps> = ({ card }) => {
    return (
        <article className="cardItem">
            {card.num} {card.name}
            <span className="modalImg">
                <ModalPopUp img={card.imgUrl} name={card.name} modalType={`deck-${card.id}`} />
            </span>
        </article>
    )
}

export default DeckCard;