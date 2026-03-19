import { useState, useEffect } from "react";
import endpoints from "@/types/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import PlayerList from "@/components/List/Player";
import { useTranslations } from 'next-intl';
import { TournamentSimpleType } from "@/types/tournament";
import { AxiosResponse } from 'axios';
import { PlayerArrayType } from "@/types/player";
import BluredTournamentPlayers from "@/fakeData/components/tournamentPlayers";

const TournamentPlayers: React.FC<TournamentSimpleType> = ({ id, tournament }) => {
    const [ renderPlayers, setRenderPlayers] = useState([]);
    const t                                  = useTranslations('tournaments');
    const [ isBlured, setIsBlured ]          = useState(true);

    useEffect(() => {
        setIsBlured(true);
        async function apiCall(): Promise<void>{
            try {
                const response: AxiosResponse<any> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_TOURNAMENT_PLAYERS, id));
                setIsBlured(false);
                setRenderPlayers(response.data);
            } catch (err) {
                console.log('error tournament')
            };
        }

        apiCall();
    }, []);

    return (
        <section className="left w100 mb20">
            {isBlured === true &&
                <BluredTournamentPlayers />
            }
            {isBlured === false &&
                <PlayerList items={renderPlayers} isBlured={isBlured} />
            }
        </section>
    )
}

export default TournamentPlayers;