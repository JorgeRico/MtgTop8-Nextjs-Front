import { v4 as uuidv4 } from "uuid";
import "./module.css"
import Header from "@/components/List/Stats/Block/Header";
import Content from "@/components/List/Stats/Block/Content";

type MyComponentProps = {
    items    : Array<any>;
    isPlayer : boolean;
    text     : string;
}

const StatsList: React.FC<MyComponentProps> = ({ items, isPlayer, text }) => {
    return (
        <>
            <Header isPlayer={isPlayer} />
            {(items.length > 0) &&
                items?.map((item) => (
                    <Content item={item} isPlayer={isPlayer} text={text} key={uuidv4()} />
                ))
            }
        </>
    )
}

export default StatsList;