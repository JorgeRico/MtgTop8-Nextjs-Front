import { useState, useEffect } from "react";
import endpoints from "@/types/server/endpoints";
import { getAxiosEndpoint, replaceUrlIdParam } from '@/hooks/useApi';
import PlayerList from "@/components/List/Player";
import { TournamentIdType } from "@/types/schemas/database/tournament";
import { AxiosResponse } from 'axios';
import { PlayerType } from "@/types/schemas/database/player";
import BluredTournamentPlayers from "@/fakeData/components/tournamentPlayers";

const TournamentPlayers: React.FC<TournamentIdType> = ({ id }) => {
    const [ renderPlayers, setRenderPlayers ] = useState<PlayerType[]>([]);
    const [ isBlured, setIsBlured ]           = useState<boolean>(true);

    useEffect(() => {
        setIsBlured(true);
        async function apiCall(): Promise<void>{
            try {
                const response: AxiosResponse<PlayerType[]> = await getAxiosEndpoint(replaceUrlIdParam(endpoints.API_TOURNAMENT_PLAYERS, id));
                setIsBlured(false);
                setRenderPlayers(response.data);
            } catch (err) {
                console.log(err);
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