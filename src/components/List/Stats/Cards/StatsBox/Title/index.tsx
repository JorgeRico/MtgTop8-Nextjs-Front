import "@/components/List/Stats/module.css";
import SubTitle from "@/components/HTag/SubTitle";
import StatsImage from "@/components/Icons/Stats";

type MyComponentProps = {
    text : string;
}

const TitleBlock: React.FC<MyComponentProps> = ({ text }) => {    
    return (
        <div className="left w100 grey-bottom">
            <SubTitle title={
                    <>
                        <StatsImage></StatsImage>
                        <span className="left ml5 mt1 statsSpan">{text}</span>
                    </>
                }
            />
        </div>
    );
}

export default TitleBlock;