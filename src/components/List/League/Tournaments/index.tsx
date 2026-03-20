import { useState, useEffect } from "react";
import endpoints from "@/types/server/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import BluredTournamentList from "@/fakeData/components/tournamentList";
import LeagueTournamentContent from "@/components/List/League/Content";
import Pagination from "@/components/List/Pagination";
import { useTranslations } from 'next-intl';
import { TournamentIdType } from "@/types/schemas/tournament";
import { AxiosResponse, AxiosError } from 'axios';

const LeagueTournament: React.FC<TournamentIdType> = ({ id }) => {
    const [ renderElements, setRenderElements]  = useState([]);
    const [ showElements, setShowElements ]     = useState(false);
    const t                                     = useTranslations('league');
    const [ total, setTotal ]                   = useState(0);
    const [ currentPage, setCurrentPage ]       = useState(1);

    useEffect(() => {
        async function apiCall(): Promise<void> {
            try {
                const response: AxiosResponse<any> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_LEAGUE_TOURNAMENTS, id))
                setRenderElements(response.data);
                setTotal(response.data.length);
                setShowElements(true);
            } catch (err) {
                // if ((err as AxiosError).response?.status === 404) {
                //     setNoResults(true);
                // }
                setShowElements(true);
                console.log('error league tournament')
            };
        }

        apiCall();
    }, []);

    return (
        <>
            {!showElements ? (
                    <BluredTournamentList></BluredTournamentList>
                ) : (
                    <>
                        <LeagueTournamentContent
                            renderElements = {renderElements}
                            url            = {endpoints.HTTP_TOURNAMENT}
                            isBlured       = {false}
                        />
                        <Pagination text={t('tournament.Tournaments')} total={total} itemsPerPage={total} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                    </>
                )
            }
        </>
    )
}

export default LeagueTournament;