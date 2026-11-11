import HTag from "@/components/HTag";
import { TitleType } from "@/types/schemas/website/title";

const Title = ({ title }: TitleType) => {
    return (
        <HTag Tag="h1" className="f24" text={title} />
    );
}

export default Title;