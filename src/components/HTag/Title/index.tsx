import HTag from "@/components/HTag";
import { TitleType } from "@/types/schemas/website/title";

const Title: React.FC<TitleType> = ({ title }) => {
    return (
        <HTag Tag="h1" className="f24" text={title} />
    );
}

export default Title;