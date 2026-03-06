import { useState, useEffect } from "react";
import StatsBox from "@/components/List/Stats";
import endpoints from "@/services/endpoints.tsx";

type MyComponentProps = {
    id       : number;
    isLeague : boolean;
    title    : string;
}

const LeagueStats: React.FC<MyComponentProps> = ({ id, isLeague, title }) => {
    const [ showElements, setShowElements ] = useState(false);

    useEffect(() => {
        setTimeout(() => {setShowElements(true)}, 500);
    }, []);

    return (
        <>
            <section className="left w100 mt10">
                <StatsBox
                    id            = {id}
                    isLeague      = {isLeague}
                    endpoint      = {isLeague ? endpoints.API_LEAGUE_STATS : endpoints.API_TOURNAMENT_STATS}
                    endpointCards = {isLeague ? endpoints.API_LEAGUE_CARD_STATS : endpoints.API_TOURNAMENT_CARD_STATS}
                    isBlured      = {showElements === false ? true : false }
                    title         = {title}
                />
            </section>
        </>
    )
}

export default LeagueStats;