import Button from "@/components/List/Button";
import { useTranslations } from 'next-intl';

type MyComponentProps = {
    text : string;
}

const StatsBox: React.FC<MyComponentProps> = ({ text }) => {
    const t = useTranslations('stats');

    return (
        <article className="left w100 mb10 bg-footer">
            <div className="wAuto overflowHidden border-red">
                <div className="left wAuto paddingStatsBox f14">
                    <strong>{text}</strong>
                </div>
                <div className="right wAuto p10 statsButton f12">
                    <Button buttonText={t('View')}></Button>
                </div>
            </div>
        </article>
    )
}

export default StatsBox;