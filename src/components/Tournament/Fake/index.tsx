import Title from "@/components/Tournament/Title";
import tournamentsFake from "@/fakeData/tournament";

const TournamentTitleBlured: React.FC = () => {
    return (
        <Title tournament={tournamentsFake[0]} isBlured={true}></Title>
    )
}

export default TournamentTitleBlured;