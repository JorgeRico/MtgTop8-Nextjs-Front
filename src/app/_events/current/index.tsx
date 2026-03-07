"use client"

import ListLeague from "@/components/List/League/Normal";
import BluredLeagueList from "@/components/List/League/Fake";
import SubTitle from "@/components/HTag/SubTitle";
import endpoints from "@/services/endpoints";
import { useState, useEffect } from "react";
import { getAxiosEndpoint } from '@/hooks/useApi';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { LeagueType } from '@/types/league';
import { TitleType } from '@/types/title';

const Events: React.FC<TitleType> = ({ title }) => {
    const [ currentLeagues, setCurrentLeagues ]           = useState<LeagueType[]>([]);
    const [ showCurrentElements, setShowCurrentElements ] = useState<boolean>(false);
    const [ totalLeagues, setTotalLeagues ]               = useState<number>(0);
    const t                                               = useTranslations('seo-tags');

    useEffect(() => {
        async function apiCallCurrent(): Promise<void> {
            await getAxiosEndpoint(endpoints.API_LEAGUE_CURRENT)
            .then((response) => {
                setCurrentLeagues(response.data);
                setTotalLeagues(response.data.length);
                setShowCurrentElements(true);
            })
            .catch((err) => {
                console.log('Error')
            });
        }

        apiCallCurrent();
    }, []);

    return (
        <main>
            <div className="left w100 mb20 grey-bottom">
                <div className="left mt15 mr10">
                    <Image
                        src="/images/trophy.webp"
                        height={32}
                        width={32}
                        alt={t('current-leagues.text-description')}
                        title={t('current-leagues.text-description')}
                        priority
                    />
                </div>
                <SubTitle title={title} />
                <p className="left w100 mt0 color-gray">{t('current-leagues.text-description')}</p>
            </div>
            {showCurrentElements === false ? (
                    <BluredLeagueList></BluredLeagueList>
                ) : (
                    <>
                        {currentLeagues != null && (
                            <ListLeague url={endpoints.HTTP_LEAGUE} items={currentLeagues} isBlured={false} />
                        )}
                    </>
                )
            }
        </main>
    );
}

export default Events;