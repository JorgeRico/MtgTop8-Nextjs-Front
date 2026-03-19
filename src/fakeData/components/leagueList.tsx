import { v4 as uuidv4 } from "uuid";
import LeagueList from "@/components/List/League";
import league from "@/fakeData/leagueList";

const BluredLeagueList: React.FC = () => {
    return (
        <LeagueList key={uuidv4()} url={league.url} items={league.items} isBlured={true} ></LeagueList>
    )
}

export default BluredLeagueList;