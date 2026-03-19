import { useState, useEffect } from "react";
import endpoints from "@/types/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import BluredTournamentList from "@/fakeData/components/tournamentList";
import LeagueTournamentBlock from "@/components/List/League/Tournament/Block";
import Pagination from "@/components/List/Pagination";
import { useTranslations } from 'next-intl';
import { TournamentType, TournamentListItemType } from "@/types/tournament";
import { AxiosResponse, AxiosError } from 'axios';

const LeagueTournament: React.FC<TournamentListItemType> = ({ id, format, leagueName, location, locationName }) => {
    const [ renderElements, setRenderElements]  = useState(null);
    const [ showElements, setShowElements ]     = useState(false);
    const [ numPlayers, setNumplayers ]         = useState(0);
    const [ noResults, setNoResults ]           = useState(false);
    const [ classification, setClassification ] = useState(null);
    const [ total, setTotal ]                   = useState(0);
    const [ currentPage, setCurrentPage ]       = useState(1);
    const t                                     = useTranslations('league');

    function countPlayers(data: TournamentType[]): void {
        var totalPlayers = 0;
        var numTournaments = data.length;

        data.map((item) => (
            totalPlayers += item.players
        ))

        setNumplayers(Math.ceil(totalPlayers/numTournaments))
    }

    useEffect(() => {
        async function apiCall(): Promise<void> {
            try {
                const response: AxiosResponse<any> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_LEAGUE_TOURNAMENTS, id))
                setRenderElements(response.data);
                setShowElements(true);
                countPlayers(response.data);
                setTotal(response.data.length);
                // setClassification('pppp');
            } catch (err) {
                if ((err as AxiosError).response?.status === 404) {
                    setNoResults(true);
                }
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
                    (noResults === true) ? (
                        <div className="radius5 cardsList bg-footer padStatsBox">
                            {t("errors.league.Sorry, now we don't have tournaments registered for this league")}
                        </div>
                    ) : (
                        <>
                            <LeagueTournamentBlock
                                format         = {format}
                                leagueName     = {leagueName}
                                renderElements = {renderElements}
                                url            = {endpoints.HTTP_TOURNAMENT}
                                isBlured       = {false}
                                numPlayers     = {numPlayers}
                                classification = {classification}
                                location       = {location}
                                locationName   = {locationName}
                            />
                            <Pagination
                                text           = {t('list.Tournaments')}
                                total          = {total}
                                itemsPerPage   = {total}
                                currentPage    = {currentPage}
                                setCurrentPage = {setCurrentPage}>
                            </Pagination>
                        </>
                    )
                )
            }
        </>
    )
}

export default LeagueTournament;