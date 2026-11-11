import { TitleComponentType } from "@/types/schemas/website/title";

const HTag = ({ Tag, className, text }: TitleComponentType) => {
    return (
        <Tag className={className}>
            {text}
        </Tag>
    );
}

export default HTag;