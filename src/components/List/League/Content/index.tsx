import TournamentList from "@/components/List/Tournament";
import { TournamentElements } from "@/types/schemas/tournament";
import LeagueTournamentTitle from "@/components/List/League/Title";

const LeagueTournamentBlock: React.FC<TournamentElements> = ({ isBlured, renderElements, url }) => {

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