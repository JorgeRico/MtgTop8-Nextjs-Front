import { TitleType } from '@/types/schemas/title';

const TitleItemBreadcrumb: React.FC<TitleType> = ({ title }) => {
    return (
        <div className="left ml5">
            {title}
        </div>
    );
}

export default TitleItemBreadcrumb;