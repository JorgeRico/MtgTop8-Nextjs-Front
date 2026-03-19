import LeagueTournamentBlock from "@/components/List/League/Tournament/Block";
import fakeTournaments from "@/fakeData/tournaments";

const BluredTournamentList: React.FC = () => {
    return (
        <LeagueTournamentBlock
            format         = {fakeTournaments.format}
            renderElements = {fakeTournaments.items}
            url            = {fakeTournaments.url}
            isBlured       = {true}
            numPlayers     = {9999}
            leagueName     = {fakeTournaments.leagueName}
            classification = {fakeTournaments.classification}
            location       = {fakeTournaments.location}
            locationName   = {fakeTournaments.locationName}
        />
    )
}

export default BluredTournamentList;