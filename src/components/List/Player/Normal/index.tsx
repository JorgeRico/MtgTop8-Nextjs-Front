import { v4 as uuidv4 } from "uuid";
import "./module.css";
import PlayerItem from "@/components/List/Player/Normal/Item";
import TournamentHeaderPlayers from "@/components/List/Player/Normal/Header";


const TournamentPlayers: React.FC<MyComponentProps>({ items, isBlured }) {
    return (
        <section className={isBlured ? "blink blured" : ""}>
            <TournamentHeaderPlayers></TournamentHeaderPlayers>
            {(items.length > 0) && (
                items.map((item, index) => (
                    <PlayerItem item={item} index={index} key={uuidv4()}></PlayerItem>
                ))
            )}
        </section>
    )
}

export default TournamentPlayers;