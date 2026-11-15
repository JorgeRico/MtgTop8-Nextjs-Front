"use client"

import endpoints from "@/types/server/endpoints";
import { useState, useEffect } from "react";
import { getAxiosEndpoint } from '@/hooks/useApi';
import { useTranslations } from 'next-intl';
import { LeagueType } from "@/types/schemas/database/league";
import { AxiosResponse } from 'axios';
import CurrentComponent from "@/components/List/League/Current/Current";

const CurrentEvents = ({title} : {title: string}) => {
    const [ currentLeagues, setCurrentLeagues ] = useState<LeagueType[]>([]);
    // const [ showCurrentElements, setShowCurrentElements ] = useState<boolean>(false);
    const t                                     = useTranslations('current-leagues');
    const assetPathPrefix                       = "/images/home";

    useEffect(() => {
        async function apiCallCurrent(): Promise<void> {
            try {
                const response: AxiosResponse<LeagueType[]> = await getAxiosEndpoint(endpoints.API_LEAGUE_CURRENT)
                setCurrentLeagues(response.data);
                // setShowCurrentElements(true);
            } catch (err) {
                console.log(err);
                console.log('Error')
            };
        }

        apiCallCurrent();
    }, []);

    const CurrentLeaguesHeader = () => {
        return (
            <>
                <div className="flex items-center gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#121820] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                        <img alt="" className="h-[15px] w-[15px]" src={`${assetPathPrefix}/yellow_cup.png`} />
                    </div>
                    <div>
                        <h2
                            className="font-jakarta-semibold text-lg leading-6 text-[#f8fafc]"
                            id="current-leagues-title"
                        >
                            {title}
                        </h2>
                        <p className="font-inter-regular text-xs leading-4 text-[#94a3b8]">
                            {t('Explore current leagues, view standings, round pairings, and decklists')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-[#121820] px-2.5 py-1">
                    <span className="size-2 rounded-full bg-[#10b981]" />
                    <span className="font-inter-bold text-[11px] leading-[14px] tracking-[0.55px] text-[#10b981]">
                    {t('In Progress')}
                    </span>
                </div>
            </>
        )
    }

    return (
        <>
            <main className="mb-15">
                <section aria-labelledby="current-leagues-title" className="flex w-full flex-col gap-6">
                    <header className="section-heading flex mb-2 w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                        <CurrentLeaguesHeader></CurrentLeaguesHeader>
                    </header>
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {currentLeagues.map((league, index) => (
                            <CurrentComponent key={index} league={league}></CurrentComponent>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default CurrentEvents;