import PlayerList from "@/components/List/Player/Normal";
import players from "@/fakeData/playerList";

const TournamentPlayersBlured: React.FC = () => {
    return (
        <PlayerList items={players} isBlured={true} />
    )
}

export default TournamentPlayersBlured;