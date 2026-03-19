import PlayerList from "@/components/List/Player";
import fakePlayers from "@/fakeData/playerList";

const BluredTournamentPlayers: React.FC = () => {
    return (
        <PlayerList items={fakePlayers} isBlured={true} />
    )
}

export default BluredTournamentPlayers;