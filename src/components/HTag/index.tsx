type MyComponentProps = {
    Tag       : any;
    className : string;
    text      : string;
};

const HTag: React.FC<MyComponentProps> = ({ Tag, className, text }) => {
    return (
        <Tag className={className}>
            {text}
        </Tag>
    );
}

export default HTag;