type MyComponentProps = {
    Tag       : any;
    className : string;
    text      : any;
};

const HTag: React.FC<MyComponentProps> = ({ Tag, className, text }) => {
    return (
        <Tag className={className}>
            {text}
        </Tag>
    );
}

export default HTag;