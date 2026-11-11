import stats from "@/fakeData/statsList";
import ContentStatsList from "@/components/List/Stats/Block/Content";

const LoadingCards = () => {
    return (
        <div className="left w100 overflowHidden blink blured">
            {stats.map((item, index) =>
                <ContentStatsList item={item} isPlayer={false} text={item.name} key={index} />
            )}
        </div>
    );
}

export default LoadingCards;