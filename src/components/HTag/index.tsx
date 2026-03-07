import { TitleComponentType } from "@/types/title";

const HTag: React.FC<TitleComponentType> = ({ Tag, className, text }) => {
    return (
        <Tag className={className}>
            {text}
        </Tag>
    );
}

export default HTag;