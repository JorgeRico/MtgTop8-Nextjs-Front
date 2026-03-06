"use client"

import ListLeague from "@/components/List/League/Normal";
import BluredLeagueList from "@/components/List/League/Fake";
import SubTitle from "@/components/HTag/SubTitle";
import endpoints from "@/services/endpoints";
import { useState, useEffect } from "react";
import { getAxiosEndpoint, addUrlPaginationParams } from '@/hooks/useApi';
import Pagination from "@/components/List/Pagination";
import { useTranslations } from 'next-intl';
import Image from "next/image";

type MyComponentProps = {
    title : string;
}

const PastEvents: React.FC<MyComponentProps> = ({ title }) => {
    const [ pastLeagues, setPastLeagues ]           = useState<any>([]);
    const [ showPastElements, setShowPastElements ] = useState(false);
    const [ totalPastLeagues, setTotalPastLeagues ] = useState(0);
    const numItems                                  = 5;
    const [ currentPage, setCurrentPage ]           = useState(1);
    const t                                         = useTranslations('seo-tags');

    useEffect(() => {
        async function apiCallPast() {
            setShowPastElements(false);
            setPastLeagues(null);

            await getAxiosEndpoint(addUrlPaginationParams(endpoints.API_LEAGUE_PAST, numItems, currentPage))
            .then((response) => {
                setPastLeagues(response.data.leagues);
                setTotalPastLeagues(response.data.total)
                setShowPastElements(true);
            })
            .catch((err) => {
                console.log(err);
                console.log('Error')
            });
        }

        apiCallPast();
    }, [currentPage]);

    return (
        <section>
            <div className="left w100 mt20 mb20 grey-bottom">
                <div className="left mt15 mr10">
                    <Image
                        src="/images/trophy.webp"
                        height={32}
                        width={32}
                        alt={t('past-leagues.text-description')}
                        title={t('past-leagues.text-description')}
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
        </section>
    );
}

export default PastEvents;