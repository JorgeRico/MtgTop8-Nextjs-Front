import fakeTournament from "@/fakeData/tournament";
import LeagueTournamentTitle from "@/components/List/League/Title";

const BluredTournamentTitle = () => {
    return (
        <LeagueTournamentTitle
            leagueName     = {fakeTournament.leagueName}
            format         = {fakeTournament.format}
            isBlured       = {true}
            numPlayers     = {fakeTournament.numPlayers}
            classification = {fakeTournament.classification}
            location       = {fakeTournament.location}
            locationName   = {fakeTournament.locationName}
        />
    )
}

export default BluredTournamentTitle;