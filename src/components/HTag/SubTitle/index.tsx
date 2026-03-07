import HTag from "@/components/HTag";
import { TitleAnyType } from "@/types/title";

const SubTitle: React.FC<TitleAnyType> = ({ title }) => {
    return (
        <HTag Tag="h2" className="left mb15 f20" text={title} />
    );
}

export default SubTitle;