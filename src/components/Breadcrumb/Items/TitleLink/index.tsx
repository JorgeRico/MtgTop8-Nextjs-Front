import Link from 'next/link';
import { BreadcrumbTitleLinkType } from "@/types/breadcrumb";

const TitleLinkItemBreadcrumb: React.FC<BreadcrumbTitleLinkType> = ({ endpoint, title }) => {
    return (
        <div className="left ml5">
            <Link href={endpoint}>
                {title}
            </Link>
        </div>
    );
}

export default TitleLinkItemBreadcrumb;