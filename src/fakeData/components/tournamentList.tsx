import LeagueTournamentContent from "@/components/List/League/Content";
import fakeTournaments from "@/fakeData/tournaments";

const BluredTournamentList = () => {
    return (
        <LeagueTournamentContent
            renderElements = {fakeTournaments.items}
            url            = {fakeTournaments.url}
            isBlured       = {true}
        />
    )
}

export default BluredTournamentList;