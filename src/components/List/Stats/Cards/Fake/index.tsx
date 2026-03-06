import { v4 as uuidv4 } from "uuid";
import stats from "@/fakeData/statsList";
import ContentStatsList from "@/components/List/Stats/Block/Content";

const LoadingCards: React.FC = () => {
    return (
        <div className="left w100 overflowHidden blink blured">
            {stats.map(item =>
                <ContentStatsList item={item} isPlayer={false} text={item.name} key={uuidv4()} />
            )}
        </div>
    );
}

export default LoadingCards;