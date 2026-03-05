import { useState, ReactNode } from 'react';
import "../module.css";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi.tsx';
import endpoints from "@/services/endpoints.tsx";
import Deck from "@/components/List/Deck/Normal";
import BluredDeck from "@/components/List/Deck/Fake";
import Button from "@/components/List/Button";
import BlockLine from "@/components/List/Player/Normal/BlockLine";
import { useTranslations } from 'next-intl';

type MyComponentProps = {
    item  : React.ReactNode;
    index : number;
}

const TournamentPlayerItem: React.FC<MyComponentProps> = ({ item, index }) => {
    const [ loading, setLoading ]                 = useState(false);
    const [ renderDeckItems, setRenderDeckItems ] = useState([]);
    const t                                       = useTranslations('player');

    // api call
    async function apiCall(id) {
        setRenderDeckItems([]);
        setLoading(true);

        await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_DECK_CARDS, id))
        .then((response) => {
            setLoading(false);
            setRenderDeckItems(response.data);
        })
        .catch((err) => {
            console.log('error loading deck')
        });
    }

    function hideDeckLists() {
        const elems = Array.from(document.querySelectorAll('.decklists'));
        elems.forEach(elem => elem.classList.add('none'));
    }

    function handleCards(index, idDeck) {
        const element = document.querySelector('#deck-'+index);
        const button  = document.querySelector('#button-deck-'+index);
        button.setAttribute('disabled', 'true');

        if (element.classList.contains('none')) {
            hideDeckLists();
            apiCall(idDeck);
            element.classList.toggle('none');
        } else {
            element.classList.toggle('none');
        }

        setTimeout(() => { button.removeAttribute('disabled') }, 1000);
    }

    return (
        <section className="item left mb15 bg-footer border-red overflowHidden playersBox" id={'player-'+(index+1)}>
            <BlockLine
                position = {index+1}
                player   = {item.name}
                deck     = {item.deckName}
            />
            <div className="left viewDeck" onClick={() => handleCards((index+1), item.idDeck)}>
                <Button buttonText={t('View deck')} id={'button-deck-'+(index+1)}/>
            </div>
        </section>

        <section className="left w100 clear"></section>

        <section className="left w100 none decklists mb20" id={'deck-'+(index+1)}>
            <article className="deck overflowHidden">
                {loading === true &&
                    <BluredDeck></BluredDeck>
                }
                {renderDeckItems && (
                    <Deck items={renderDeckItems} deckName={item.deckName} isBlured={false} />
                )}
            </article>
        </section>
    )
}

export default TournamentPlayerItem;