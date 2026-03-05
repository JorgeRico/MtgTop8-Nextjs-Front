import { v4 as uuidv4 } from "uuid";
import LeagueList from "@/components/List/League/Normal";
import league from "@/fakeData/leagueList.tsx";

const BluredLeagueList: React.FC = () => {
    return (
        <LeagueList key={uuidv4()} url={league.url} items={league.items} isBlured={true} ></LeagueList>
    )
}

export default BluredLeagueList;