import LeagueTournamentBlock from "@/components/List/League/Tournament/Block";
import tournament from "@/fakeData/tournament";

const BluredTournamentList: React.FC = () => {
    return (
        <LeagueTournamentBlock
            format         = {tournament.format}
            renderElements = {tournament.items}
            url            = {tournament.url}
            isBlured       = {true}
            numPlayers     = {9999}
            leagueName     = {tournament.leagueName}
            classification = {tournament.classification}
            location       = {tournament.location}
            locationName   = {tournament.locationName}
        />
    )
}

export default BluredTournamentList;