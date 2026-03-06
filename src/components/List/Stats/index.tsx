import statsTypes from "@/services/stats-types"
import "./module.css";
import CardBlockStats from "@/components/List/Stats/Cards";
import SubTitle from "@/components/HTag/SubTitle";
import HTag from "@/components/HTag";
import StatsImage from "@/components/Icons/Stats";
import { useTranslations } from 'next-intl';

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

    const headerTitleBlock = (text: string): string => {
        return (
            <div className="left w100 grey-bottom">
                <SubTitle title={
                        <>
                            <StatsImage></StatsImage>
                            <span className="left ml5">{t('Player Stats')}</span>
                        </>
                    }
                />
            </div>
        )
    }

    const cardStats = () => {
        return (
            <>
                {isLeague && (
                        <>
                            {headerTitleBlock(t('Player Stats'))}
                            <CardBlockStats
                                id={id}
                                text={t('Top Players')}
                                endpoint={endpoint.replace('{id}', id).replace('{option}', statsTypes.PLAYERS)}
                                cardType={statsTypes.PLAYERS}
                                isPlayer={true}
                            />
                        </>
                    )
                }

                {headerTitleBlock(t('Card Stats'))}
                <CardBlockStats
                    id={id}
                    text={t('Top Cards')}
                    endpoint={endpoint.replace('{id}', id).replace('{option}', statsTypes.TOP)}
                    cardType={statsTypes.TOP}
                    isPlayer={false}
                />

                <CardBlockStats
                    id={id}
                    text={t('Top Creatures')}
                    endpoint={endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.CREATURE)}
                    cardType={statsTypes.CREATURE}
                    isPlayer={false}
                />

                <CardBlockStats
                    id={id}
                    text={t('Top Instants')}
                    endpoint={endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.INSTANT)}
                    cardType={statsTypes.INSTANT}
                    isPlayer={false}
                />

                <CardBlockStats
                    id={id}
                    text={t('Top Sorceries')}
                    endpoint={endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.SORCERY)}
                    cardType={statsTypes.SORCERY}
                    isPlayer={false}
                />

                <CardBlockStats
                    id={id}
                    text={t('Top Artifacts')}
                    endpoint={endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.ARTIFACT)}
                    cardType={statsTypes.ARTIFACT}
                    isPlayer={false}
                />

                <CardBlockStats
                    id={id}
                    text={t('Top Enchantments')}
                    endpoint={endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.ENCHANTMENT)}
                    cardType={statsTypes.ENCHANTMENT}
                    isPlayer={false}
                />

                <CardBlockStats
                    id={id}
                    text={t('Top Planeswalkers')}
                    endpoint={endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.PLANESWALKER)}
                    cardType={statsTypes.PLANESWALKER}
                    isPlayer={false}
                />

                <CardBlockStats
                    id={id}
                    text={t('Top Lands')}
                    endpoint={endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.LAND)}
                    cardType={statsTypes.LAND}
                    isPlayer={false}
                />

                {headerTitleBlock(t('Deck Stats'))}
                <CardBlockStats
                    id={id}
                    text={t('Top Mainboard Cards')}
                    endpoint={endpoint.replace('{id}', id).replace('{option}', statsTypes.MAINBOARD)}
                    cardType={statsTypes.MAINBOARD}
                    isPlayer={false}
                />

                <CardBlockStats
                    id={id}
                    text={t('Top Sideboard Cards')}
                    endpoint={endpoint.replace('{id}', id).replace('{option}', statsTypes.SIDEBOARD)}
                    cardType={statsTypes.SIDEBOARD}
                    isPlayer={false}
                />
            </>
        )
    }

    return (
        <section className={`left mt10 w100 ${isBlured ? 'blink blured' : ''}`}>
            <article className="mb20 statsBoxContent flex-container">
                <div className="left mt50 mb10 overflowHidden">
                    <HTag
                        Tag       = "h2"
                        className = "left f24 mb5"
                        text      = {
                            <>
                                <StatsImage></StatsImage>
                                <span className="left ml5">{t('Stats')}</span>
                            </>
                        }
                    />
                    <p className="left w100 color-gray mb0 ml10">{title}</p>
                    <p className="left w100 color-gray mb0 ml10">{t('All tournament stats')}</p>
                    <p className="left w100 color-gray mb0 ml10">{t('Most played cards and main deck and sideboard card stats')}</p>
                </div>
                {cardStats()}
            </article>
        </section>
    );
}

export default StatsBox;