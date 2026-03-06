type MyComponentProps = {
    position  : number | null;
    player    : string;
    deck      : string;
    isHeader? : boolean;
}

const BlockLine: React.FC<MyComponentProps> = ({ position, player, deck, isHeader = false }) => {
    return (
        <>
            <div className="padTournamentBox w-20">
                {position ? position : '#'}
            </div>
            <div className="padTournamentBox w-200 player">
                {player}
            </div>
            <div className={`padTournamentBox w-150 ${isHeader ? 'headerDeckName': 'deckName'}`}>
                {deck}
            </div>
        </>
    )
}

export default BlockLine;