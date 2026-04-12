import "./module.css";
import HTag from "@/components/HTag";
import StatsImage from "@/components/Icons/Stats";
import { useTranslations } from 'next-intl';
import LeagueStats from "@/components/List/Stats/Cards/StatsBox/LeagueStats";
import CardStats from "@/components/List/Stats/Cards/StatsBox/CardStats";

type MyComponentProps = {
    id            : string;
    title         : string;
    isLeague      : boolean;
    endpoint      : string;
    endpointCards : string;
    isBlured      : boolean;
}

const StatsBox: React.FC<MyComponentProps> = ({ id, title, isLeague, endpoint, endpointCards, isBlured }) => {
    const t = useTranslations('stats');

    return (
        <section className={`left mt10 w100 ${isBlured ? 'blink blured' : ''}`}>
            <article className="mb20 statsBoxContent flex-container">
                <div className="left mb10 overflowHidden">
                    <HTag
                        Tag       = "h2"
                        className = "left f24 mb5"
                        text      = {
                            <>
                                <StatsImage></StatsImage>
                                <span className="left ml5 statsSpan">{t('Stats')}</span>
                            </>
                        }
                    />
                    <p className="left w100 color-gray mb0 ml10">{title}</p>
                    <p className="left w100 color-gray mb0 ml10">{t('All tournament stats')}</p>
                    <p className="left w100 color-gray mb0 ml10">{t('Most played cards and main deck and sideboard card stats')}</p>
                </div>
                {isLeague && (
                        <LeagueStats id={id} endpoint={endpoint} />
                    )
                }
                <CardStats id={id} endpoint={endpoint} endpointCards={endpointCards} />
            </article>
        </section>
    );
}

export default StatsBox;