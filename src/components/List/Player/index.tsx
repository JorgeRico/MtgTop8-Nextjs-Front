import { v4 as uuidv4 } from "uuid";
import "./module.css";
import PlayerItem from "@/components/List/Player/Item";
import TournamentHeaderPlayers from "@/components/List/Player/Header";
import { PlayerArrayBluredType } from "@/types/schemas/database/player";

const TournamentPlayers: React.FC<PlayerArrayBluredType> = ({ items, isBlured }) => {
    return (
        <>
            <section className={isBlured ? "blink blured" : ""}>
                <TournamentHeaderPlayers></TournamentHeaderPlayers>
                {(items.length > 0) && (
                    items.map((item, index) => (
                        <PlayerItem item={item} index={index} key={uuidv4()}></PlayerItem>
                    ))
                )}
            </section>
        </>
    )
}

export default TournamentPlayers;