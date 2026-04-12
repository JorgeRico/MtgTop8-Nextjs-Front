import { TournamentBluredType } from "@/types/schemas/database/tournament";
import HeaderTitle from "@/components/Tournament/Header/Title";
import HeaderSubTitle from "@/components/Tournament/Header/SubTitle";

const TournamentBlock: React.FC<TournamentBluredType> = ({ tournament, isBlured }) => {
    return (
        <main>
            <HeaderTitle
                tournament = {tournament}
                isBlured   = {isBlured}
            />
            <HeaderSubTitle
                tournament = {tournament}
                isBlured  = {isBlured}
            />
        </main>
    )
}

export default TournamentBlock;