import {getFormat} from "@/hooks/useCommon";
import fakeTournament from "@/fakeData/tournament";
import LeagueTournamentTitle from "@/components/List/League/Title";

const BluredTournamentTitle = () => {
    return (
        <LeagueTournamentTitle
            leagueName     = {fakeTournament.leagueName}
            format         = {getFormat(fakeTournament.format)}
            isBlured       = {true}
            numPlayers     = {fakeTournament.players}
            classification = {fakeTournament.classification}
            location       = {fakeTournament.location}
            locationName   = {fakeTournament.locationName}
        />
    )
}

export default BluredTournamentTitle;