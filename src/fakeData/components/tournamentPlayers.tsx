import PlayerList from "@/components/List/Player";
import fakePlayers from "@/fakeData/playerList";

const BluredTournamentPlayers = () => {
    return (
        <PlayerList items={fakePlayers} isBlured={true} />
    )
}

export default BluredTournamentPlayers;