"use client"

import PastLeaguesComponent from "@/components/List/League/Past/Past";
import endpoints from "@/types/server/endpoints";
import { useState, useEffect } from "react";
import { getAxiosEndpoint, addUrlPaginationParams } from '@/hooks/useApi';
import { useTranslations } from 'next-intl';
import { LeagueType, PastLeagues } from "@/types/schemas/database/league";
import { AxiosResponse } from 'axios';
import Spinner from '@/components/Spinner';
import PastEventsFooter from '@/app/_home/events/past/footer';
import PastEventsHeader from '@/app/_home/events/past/header';

const MIN_LOADING_MS = 1000;

const PastEvents = ({title} : {title: string}) => {
    const [ pastLeagues, setPastLeagues ]           = useState<LeagueType[]>([]);
    const [ isLoading, setIsLoading ]               = useState<boolean>(true);
    const [ totalPastLeagues, setTotalPastLeagues ] = useState<number>(0);
    const numItems : number                         = 5;
    const [ currentPage, setCurrentPage ]           = useState<number>(1);
    const t                                         = useTranslations('past-leagues');

    useEffect(() => {
        let active = true;
        const startedAt = Date.now();

        async function apiCallPast(): Promise<void> {
            setIsLoading(true);
            setPastLeagues([]);

            try {
                const response: AxiosResponse<PastLeagues> = await getAxiosEndpoint(addUrlPaginationParams(endpoints.API_LEAGUE_PAST, numItems, currentPage))
                if (!active) return;
                setPastLeagues(response.data.leagues);
                setTotalPastLeagues(response.data.total)
            } catch (err) {
                if (!active) return;
                console.log(err);
                console.log('Error')
            } finally {
                if (!active) return;
                const remaining = Math.max(0, MIN_LOADING_MS - (Date.now() - startedAt));
                if (remaining > 0) {
                    await new Promise<void>((resolve) => setTimeout(resolve, remaining));
                }
                if (active) {
                    setIsLoading(false);
                }
            }
        }

        apiCallPast();

        return () => {
            active = false;
        };
    }, [currentPage]);

    return (
        <>
            <main className="mb-20">
                <section className="flex flex-col gap-space-lg" aria-labelledby="past-leagues-title">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <PastEventsHeader
                                title            = {title}
                                totalPastLeagues = {totalPastLeagues} 
                                numItems         = {numItems} 
                                currentPage      = {currentPage} 
                                setCurrentPage   = {setCurrentPage}
                            />
                            {isLoading ? (
                                <Spinner label={t('loading-past-leagues')} />
                            ) : (
                                <PastLeaguesComponent leagues={pastLeagues}></PastLeaguesComponent>
                            )}
                        </div>
                        <PastEventsFooter></PastEventsFooter>
                    </div>
                </section>
            </main>
        </>
    );
}

export default PastEvents;
