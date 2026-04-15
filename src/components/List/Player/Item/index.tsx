import { useState } from 'react';
import "../module.css";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import endpoints from "@/types/server/endpoints";
import Deck from "@/components/List/Deck";
import Button from "@/components/List/Button";
import BlockLine from "@/components/List/Player/BlockLine";
import { useTranslations } from 'next-intl';
import { PlayerItemType } from "@/types/schemas/database/player";
import { AxiosResponse } from 'axios';
import { CardType } from "@/types/schemas/database/card";
import decklist from "@/fakeData/decklist";

const TournamentPlayerItem: React.FC<PlayerItemType> = ({ item, index }) => {
    const [ renderDeckItems, setRenderDeckItems ] = useState<CardType[]>([]);
    const t                                       = useTranslations('player');
    const [ isBlured, setIsBlured ]               = useState<boolean>(true);
    const [ loadingDeck, setLoadingDeck ]         = useState<boolean>(false);

    async function apiCall(id: number): Promise<void> {
        setIsBlured(true);

        try {
            const response: AxiosResponse<CardType[]> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_DECK_CARDS, id.toString()));
            setRenderDeckItems(response.data);
            setIsBlured(false);
        } catch (err) {
            console.log(err);
            console.log('error loading deck')
        };
    }

    function hideDeckLists(): void {
        const elems = Array.from(document.querySelectorAll('.decklists'));
        elems.forEach(elem => elem.classList.add('none'));
    }

    function handleCards(index: number, idDeck: number): void {
        const element = document.querySelector('#deck-'+index);
        const button  = document.querySelector('#button-deck-'+index);
        button?.setAttribute('disabled', 'true');

        if (element?.classList.contains('none')) {
            setLoadingDeck(true);
            hideDeckLists();
            apiCall(idDeck);
            element?.classList.toggle('none');
        } else {
            setLoadingDeck(false)
            element?.classList.toggle('none');
        }

        setTimeout(() => { button?.removeAttribute('disabled') }, 1000);
    }

    return (
        <main>
            <section className="item left mb15 bg-footer border-red overflowHidden playersBox" id={'player-'+(index+1)} aria-label={`${item.name} - ${item.deckName}`}>
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
                        {loadingDeck === true &&
                            <>
                                {isBlured === true &&
                                    <Deck items={decklist.deckItems} deckName={item.deckName} isBlured={isBlured} />
                                }
                                {isBlured === false &&
                                    <Deck items={renderDeckItems} deckName={item.deckName} isBlured={isBlured} />
                                }
                            </>
                        }
                    </article>
                </section>
        </main>
    )
}

export default TournamentPlayerItem;