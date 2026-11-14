"use client"

import PastLeaguesComponent from "@/components/List/League/Past/Past";
import endpoints from "@/types/server/endpoints";
import { useState, useEffect } from "react";
import { getAxiosEndpoint, addUrlPaginationParams } from '@/hooks/useApi';
import Pagination from "@/components/List/Pagination";
import { useTranslations } from 'next-intl';
import { LeagueType, PastLeagues } from "@/types/schemas/database/league";
import { AxiosResponse } from 'axios';
const assetPath = "/images/home";

const PastEvents = ({title} : {title: string}) => {
    const [ pastLeagues, setPastLeagues ]           = useState<LeagueType[]>([]);
    // const [ showPastElements, setShowPastElements ] = useState<boolean>(false);
    const [ totalPastLeagues, setTotalPastLeagues ] = useState<number>(0);
    const numItems : number                         = 5;
    const [ currentPage, setCurrentPage ]           = useState<number>(1);
    const t                                         = useTranslations('past-leagues');

    const PastLeaguesHeader = () => {
        return (
            <>
                <div className="section-heading">
                    <span className="heading-icon" aria-hidden="true">
                        <img src={`${assetPath}/past.png`} alt="" />
                    </span>
                    <div>
                        <h1 id="past-leagues-title">{title}</h1>
                        <p>{t("text-description")}</p>
                    </div>
                </div>
                <nav className="season-picker" aria-label="Filter leagues by season">
                    <span>{t("season")}:</span>
                    {totalPastLeagues > 0 &&
                        <Pagination total={totalPastLeagues} itemsPerPage={numItems} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                    }
                </nav>
            </>
        )
    };

    useEffect(() => {
        async function apiCallPast(): Promise<void> {
            // setShowPastElements(false);
            setPastLeagues([]);

            try {
                const response: AxiosResponse<PastLeagues> = await getAxiosEndpoint(addUrlPaginationParams(endpoints.API_LEAGUE_PAST, numItems, currentPage))
                setPastLeagues(response.data.leagues);
                setTotalPastLeagues(response.data.total)
                // setShowPastElements(true);
            } catch (err) {
                console.log(err);
                console.log('Error')
            };
        }

        apiCallPast();
    }, [currentPage]);

    return (
        <>
            <section className="flex flex-col gap-space-lg" aria-labelledby="past-leagues-title">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <header className="section-header">
                            <PastLeaguesHeader></PastLeaguesHeader>
                        </header>
                        <PastLeaguesComponent leagues={pastLeagues}></PastLeaguesComponent>
                    </div>
                    
                    <div className="px-6 mb-5 rounded-xl bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-2 text-mana-black font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[18px]">
                                <img src={`${assetPath}/folder.png`} alt="" />
                            </span>
                            <span className="league-meta font-body-sm text-body-sm">
                                {t('historical-archives')}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PastEvents;
