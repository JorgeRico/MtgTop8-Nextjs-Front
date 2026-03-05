import LeagueTournamentBlock from "@/components/List/League/Tournament/Block";
import tournament from "@/fakeData/tournament.tsx";

const BluredTournamentList: React.FC = () => {
    return (
        <LeagueTournamentBlock
            format         = {tournament.format}
            renderElements = {tournament.items}
            url            = {tournament.url}
            isBlured       = {true}
            numPlayers     = {9999}
        />
    )
}

export default BluredTournamentList;