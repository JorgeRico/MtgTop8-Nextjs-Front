import { useState } from "react";
import { getAxiosEndpoint } from '@/hooks/useApi';
import StatsListBlock from "@/components/List/Stats/Block";
import BluredStatsList from "@/fakeData/components/loadingCards";
import Block from "@/components/List/Stats/Cards/Block";
import { useTranslations } from 'next-intl';
import { StatsCardTotal, StatsCardItemType, StatsArrayItemsType } from "@/types/stats";
import { AxiosResponse, AxiosError } from 'axios';

const StatsBox: React.FC<StatsCardItemType> = ({ text, cardType, endpoint, isPlayer }) => {
    const [ renderElements, setRenderElements ] = useState<StatsCardTotal[]>([]);
    const [ noResults, setNoResults ]           = useState(false);
    const [ isLoading, setIsLoading ]           = useState(true);
    const t                                     = useTranslations('errors');

    async function apiCardTypeCall(): Promise<void> {
        try {
            const response: AxiosResponse<any> = await getAxiosEndpoint(endpoint);
            setRenderElements(response.data.stats);
            setIsLoading(false);
        } catch (err) {
            if ((err as AxiosError).response?.status === 404) {
                setNoResults(true);
            }
            setIsLoading(false);
            console.log('error League card stats')
        };
    }

    const handleClickCardTypes = (): void => {
        hideStats();
        setRenderElements([]);
        showStats();
        apiCardTypeCall()
    }

    function hideStats(): void {
        const elems = Array.from(document.querySelectorAll('.cardStats'));
        elems.forEach(elem => elem.id !== cardType ? elem.classList.add('none') : null);
    }

    function showStats(): void {
        document.querySelector('#' + cardType)?.classList.toggle('none');
    }

    return (
        <section className="listItem flex-item cardsList pointer" >
            <span onClick={() => handleClickCardTypes()}>
                <Block text={text}></Block>
            </span>
            <div className="left mt10 mb30 overflowHidden cardStats none" id={cardType}>
                {isLoading && (
                    <BluredStatsList></BluredStatsList>
                )}
                {(isLoading === false && noResults === true) && (
                    <div className="radius5 cardsList bg-footer padStatsBox">
                        {t("stats.Sorry, now we don't have tournaments registered for this league")}
                    </div>
                )}
                {(isLoading === false && noResults === false) && (
                    <StatsListBlock items={renderElements} isPlayer={isPlayer} text={text} />
                )}
            </div>
        </section>
    )
}

export default StatsBox;