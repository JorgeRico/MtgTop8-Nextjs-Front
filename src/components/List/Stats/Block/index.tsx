import "./module.css"
import Header from "@/components/List/Stats/Block/Header";
import Content from "@/components/List/Stats/Block/Content";
import { StatsArrayItemsType } from "@/types/schemas/database/stats";

const StatsList = ({ items, isPlayer, text }: StatsArrayItemsType) => {
    return (
        <>
            <Header isPlayer={isPlayer} />
            {(items.length > 0) &&
                items?.map((item, index) => (
                    <Content item={item} isPlayer={isPlayer} text={text} key={index} />
                ))
            }
        </>
    )
}

export default StatsList;