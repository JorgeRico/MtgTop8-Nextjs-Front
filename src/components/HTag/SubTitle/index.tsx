import HTag from "@/components/HTag";

type MyComponentProps = {
    title: string;
};

const SubTitle: React.FC<MyComponentProps> = ({ title }) => {
    return (
        <HTag Tag="h2" className="left mb15 f20" text={title} />
    );
}

export default SubTitle;