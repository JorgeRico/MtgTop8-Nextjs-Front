import TournamentList from "@/components/List/Tournament";
import { LeagueTournamentElements } from "@/types/schemas/database/league";

const LeagueTournamentBlock: React.FC<LeagueTournamentElements> = ({ isBlured, renderElements, url }) => {

    return (
        <main>
            <div className={`left w100 mb10 ${isBlured ? 'blink blured' : ''}`}>
                {renderElements &&
                    <TournamentList
                        url   = {url}
                        items = {renderElements}
                    />
                }
            </div>
        </main>
    )
}

export default LeagueTournamentBlock;