"use client"

import ListLeague from "@/components/List/League";
import BluredLeagueList from "@/fakeData/components/leagueList";
import SubTitle from "@/components/HTag/SubTitle";
import endpoints from "@/types/endpoints";
import { useState, useEffect } from "react";
import { getAxiosEndpoint, addUrlPaginationParams } from '@/hooks/useApi';
import Pagination from "@/components/List/Pagination";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { LeagueType } from '@/types/league';
import { TitleType } from '@/types/title';
import { AxiosResponse } from 'axios';

const PastEvents: React.FC<TitleType> = ({ title }) => {
    const [ pastLeagues, setPastLeagues ]           = useState<LeagueType[]>([]);
    const [ showPastElements, setShowPastElements ] = useState<boolean>(false);
    const [ totalPastLeagues, setTotalPastLeagues ] = useState<number>(0);
    const numItems : number                         = 5;
    const [ currentPage, setCurrentPage ]           = useState<number>(1);
    const t                                         = useTranslations('seo-tags');

    useEffect(() => {
        async function apiCallPast(): Promise<void> {
            setShowPastElements(false);
            setPastLeagues([]);

            try {
                const response: AxiosResponse<any> = await getAxiosEndpoint(addUrlPaginationParams(endpoints.API_LEAGUE_PAST, numItems, currentPage))
                setPastLeagues(response.data.leagues);
                setTotalPastLeagues(response.data.total)
                setShowPastElements(true);
            } catch (err) {
                console.log(err);
                console.log('Error')
            };
        }

        apiCallPast();
    }, [currentPage]);

    return (
        <main>
            <div className="left w100 mt20 mb20 grey-bottom">
                <div className="left mt15 mr10">
                    <Image
                        className = "trophyIcon"
                        src       = "/images/trophy.webp"
                        height    = {32}
                        width     = {32}
                        alt       = {t('past-leagues.text-description')}
                        title     = {t('past-leagues.text-description')}
                        priority
                    />
                </div>
                <SubTitle title={title} />
                <p className="left w100 mt0 color-gray">{t('past-leagues.text-description')}</p>
            </div>
            {showPastElements === false ? (
                    <BluredLeagueList></BluredLeagueList>
                ) : (
                    <>
                        {totalPastLeagues && (
                            <ListLeague url={endpoints.HTTP_LEAGUE} items={pastLeagues} isBlured={false} />
                        )}
                    </>
                )
            }
            {totalPastLeagues > 0 &&
                <Pagination text={t('past-leagues.pagination')} total={totalPastLeagues} itemsPerPage={numItems} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
            }
        </main>
    );
}

export default PastEvents;