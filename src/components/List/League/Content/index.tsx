import TournamentList from "@/components/List/Tournament";
import { LeagueTournamentElements } from "@/types/schemas/database/league";
import LeagueTournamentTitle from "@/components/List/League/Title";

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