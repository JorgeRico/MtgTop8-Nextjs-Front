import { TitleType } from "@/types/schemas/website/title";

const TitleItemBreadcrumb = ({ title }: TitleType) => {
    return (
        <div className="left ml5">
            {title}
        </div>
    );
}

export default TitleItemBreadcrumb;