import LeagueList from "@/components/List/League";
import league from "@/fakeData/leagueList";

const BluredLeagueList = () => {
    return (
        <LeagueList key="blured-league-list" url={league.url} items={league.items} isBlured={true} ></LeagueList>
    )
}

export default BluredLeagueList;