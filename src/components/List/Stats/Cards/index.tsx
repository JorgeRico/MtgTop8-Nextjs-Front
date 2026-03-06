import { useState } from "react";
import { getAxiosEndpoint } from '@/hooks/useApi';
import StatsListBlock from "@/components/List/Stats/Block";
import BluredStatsList from "@/components/List/Stats/Cards/Fake";
import Block from "@/components/List/Stats/Cards/Block";
import { useTranslations } from 'next-intl';

type MyComponenntProps = {
    text     : string;
    cardType : string;
    endpoint : string;
    isPlayer : boolean;
}

const StatsBox: React.FC<MyComponenntProps> = ({ text, cardType, endpoint, isPlayer }) => {
    const [ renderElements, setRenderElements ] = useState([]);
    const [ noResults, setNoResults ]           = useState(false);
    const t                                     = useTranslations('errors');

    // api call
    async function apiCardTypeCall() {
        await getAxiosEndpoint(endpoint)
            .then((response) => {
                setRenderElements(response.data.stats);
            })
            .catch((err) => {
                if (err.status === 404) {
                    setNoResults(true);
                }
                console.log('error League card stats')
            });
    }

    const handleClickCardTypes = () => {
        hideStats();
        setRenderElements(null);
        showStats();
        apiCardTypeCall()
    }

    function hideStats() {
        const elems = Array.from(document.querySelectorAll('.cardStats'));
        elems.forEach(elem => elem.id !== cardType ? elem.classList.add('none') : null);
    }

    function showStats() {
        document.querySelector('#' + cardType).classList.toggle('none');
    }

    return (
        <section className="listItem flex-item cardsList pointer" >
            <span onClick={() => handleClickCardTypes()}>
                <Block text={text}></Block>
            </span>
            <div className="left mt10 mb30 overflowHidden cardStats none" id={cardType}>
                {!renderElements ? (
                    (noResults === true) ? (
                        <div className="radius5 cardsList bg-footer padStatsBox">
                            {t("stats.Sorry, now we don't have tournaments registered for this league")}
                        </div>
                    ) : (
                        <BluredStatsList></BluredStatsList>
                    )
                ) : (
                    <StatsListBlock items={renderElements} isPlayer={isPlayer} text={text} />
                )}
            </div>
        </section>
    )
}

export default StatsBox;