import "./module.css"
import Header from "@/components/List/Stats/Block/Header";
import Content from "@/components/List/Stats/Block/Content";
import { StatsArrayItemsType } from "@/types/schemas/database/stats";

const StatsList: React.FC<StatsArrayItemsType> = ({ items, isPlayer, text }) => {
    return (
        <>
            <Header isPlayer={isPlayer} />
            {(items.length > 0) &&
                items?.map((item) => (
                    <Content item={item} isPlayer={isPlayer} text={text} key={item.id} />
                ))
            }
        </>
    )
}

export default StatsList;