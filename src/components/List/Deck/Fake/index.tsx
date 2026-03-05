import Deck from "@/components/List/Deck/Normal";
import decklist from "@/fakeData/decklist.tsx";
import BluredDeck from './index';

const BluredDeck: React.FC = () => {
    return (
        <Deck items={decklist.deckItems} deckName={decklist.deckName} isBlured={true} />
    )
}

export default BluredDeck;