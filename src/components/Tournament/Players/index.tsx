import { useState, useEffect } from "react";
import endpoints from "@/types/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import PlayerList from "@/components/List/Player/Normal";
import PlayersBlured from "@/components/List/Player/Fake";
import Title from "@/components/Tournament/Title";
import TournamentTitleBlured from "@/components/Tournament/Fake";
import SubTitle from "@/components/HTag/SubTitle";
import ListImage from "@/components/Icons/List";
import { useTranslations } from 'next-intl';
import { TournamentSimpleType } from "@/types/tournament";
import { AxiosResponse } from 'axios';
import { PlayerArrayType } from "@/types/player";

const TournamentPlayers: React.FC<TournamentSimpleType> = ({ id, tournament }) => {
    const [ renderPlayers, setRenderPlayers] = useState([]);
    const [ showPlayers, setShowPlayers ]    = useState(false);
    const t                                  = useTranslations('tournaments');

    useEffect(() => {
        async function apiCall(): Promise<void>{
            try {
                const response: AxiosResponse<any> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_TOURNAMENT_PLAYERS, id))
                setRenderPlayers(response.data);
                setShowPlayers(true);
            } catch (err) {
                console.log('error tournament')
            };
        }

        apiCall();
    }, []);

    return (
        <>
            {showPlayers === false ? (
                <TournamentTitleBlured></TournamentTitleBlured>
            ) : (
                <Title tournament={tournament} isBlured={false}></Title>
            )}
            <section className="left w100 mt40 mb10">
                <SubTitle title={
                        <>
                            <ListImage></ListImage>
                            <span className="left ml10 mt3">{`${t('players.Top Players')} ${tournament?.name ? '- ' + tournament?.name : ''}`}</span>
                        </>
                    }
                />
            </section>
            <section className="left w100 mb20">
                {showPlayers === false ? (
                        <PlayersBlured></PlayersBlured>
                    ) : (
                        <>
                            {renderPlayers.length > 0 && (
                                <PlayerList items={renderPlayers} isBlured={false} />
                            )}
                        </>
                    )
                }
            </section>
        </>
    )
}

export default TournamentPlayers;