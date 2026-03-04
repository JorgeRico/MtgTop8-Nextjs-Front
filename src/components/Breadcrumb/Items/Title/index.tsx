type MyComponentProps = {
    title : string;
};

const TitleItemBreadcrumb: React.FC<MyComponentProps> = ({ title }) => {
    return (
        <div className="left ml5">
            {title}
        </div>
    );
}

export default TitleItemBreadcrumb;