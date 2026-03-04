import Link from 'next/link';

type MyComponentProps = {
    endpoint : string;
    title    : string;
};

const TitleLinkItemBreadcrumb: React.FC<MyComponentProps> = ({ endpoint, title }) => {
    return (
        <div className="left ml5">
            <Link href={endpoint}>
                {title}
            </Link>
        </div>
    );
}

export default TitleLinkItemBreadcrumb;