import HTag from "@/components/HTag";

type MyComponentProps = {
    title: string;
};

const Title: React.FC<MyComponentProps> = ({ title }) => {
    return (
        <HTag Tag="h1" className="f24" text={title} />
    );
}

export default Title;