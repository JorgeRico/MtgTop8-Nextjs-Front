import Title from "@/components/Tournament/Title";

const TournamentTitleBlured: React.FC = () => {
    const tournament = {
        name    : 'Fake Tournament',
        format  : 'Legacy',
        players : '35',
        date    : '22/10/2025'
    }

    return (
        <Title tournament={tournament} isBlured={true}></Title>
    )
}

export default TournamentTitleBlured;