import statsTypes from "@/services/stats-types.tsx"
import "./module.css";
import CardBlockStats from "@/components/List/Stats/Cards";
import SubTitle from "@/components/HTag/SubTitle";
import HTag from "@/components/HTag";
import StatsImage from "@/components/Icons/Stats";
import { useTranslation } from 'react-i18next';

export default function StatsBox({ id, title, isLeague, endpoint, endpointCards, isBlured }) {
    const t = useTranslations('stats');

    const cardStats = () => {
        return (
            {isLeague === true &&
                <div className="left w100 grey-bottom">
                    <SubTitle title={
                            <StatsImage></StatsImage>
                            <span className="left ml5">{t('Player Stats')}</span>
                        }
                    />
                </div>
                <CardBlockStats
                    id={id}
                    text={t('Top Players')}
                    endpoint={endpoint.replace('{id}', id).replace('{option}', t(statsTypes.PLAYERS))}
                    cardType={t(statsTypes.PLAYERS)}
                    isPlayer={true}
                />
            }

            <div className="left w100 grey-bottom">
                <SubTitle title={
                        <StatsImage></StatsImage>
                        <span className="left ml5">{t('Card Stats')}</span>
                    }
                />
            </div>
            <CardBlockStats
                id={id}
                text={t('Top Cards')}
                endpoint={endpoint.replace('{id}', id).replace('{option}', t(statsTypes.TOP))}
                cardType={t(statsTypes.TOP)}
                isPlayer={false}
            />

            <CardBlockStats
                id={id}
                text={t('Top Creatures')}
                endpoint={endpointCards.replace('{id}', id).replace('{cardType}', t(statsTypes.CREATURE))}
                cardType={t(statsTypes.CREATURE)}
                isPlayer={false}
            />

            <CardBlockStats
                id={id}
                text={t('Top Instants')}
                endpoint={endpointCards.replace('{id}', id).replace('{cardType}', t(statsTypes.INSTANT))}
                cardType={t(statsTypes.INSTANT)}
                isPlayer={false}
            />

            <CardBlockStats
                id={id}
                text={t('Top Sorceries')}
                endpoint={endpointCards.replace('{id}', id).replace('{cardType}', t(statsTypes.SORCERY))}
                cardType={t(statsTypes.SORCERY)}
                isPlayer={false}
            />

            <CardBlockStats
                id={id}
                text={t('Top Artifacts')}
                endpoint={endpointCards.replace('{id}', id).replace('{cardType}', t(statsTypes.ARTIFACT))}
                cardType={t(statsTypes.ARTIFACT)}
                isPlayer={false}
            />

            <CardBlockStats
                id={id}
                text={t('Top Enchantments')}
                endpoint={endpointCards.replace('{id}', id).replace('{cardType}', t(statsTypes.ENCHANTMENT))}
                cardType={t(statsTypes.ENCHANTMENT)}
                isPlayer={false}
            />

            <CardBlockStats
                id={id}
                text={t('Top Planeswalkers')}
                endpoint={endpointCards.replace('{id}', id).replace('{cardType}', t(statsTypes.PLANESWALKER))}
                cardType={t(statsTypes.PLANESWALKER)}
                isPlayer={false}
            />

            <CardBlockStats
                id={id}
                text={t('Top Lands')}
                endpoint={endpointCards.replace('{id}', id).replace('{cardType}', t(statsTypes.LAND))}
                cardType={t(statsTypes.LAND)}
                isPlayer={false}
            />

            <div className="left w100 grey-bottom">
                <SubTitle title={
                        <StatsImage></StatsImage>
                        <span className="left ml5">{t('Deck Stats')}</span>
                    }
                />
            </div>
            <CardBlockStats
                id={id}
                text={t('Top Mainboard Cards')}
                endpoint={endpoint.replace('{id}', id).replace('{option}', t(statsTypes.MAINBOARD))}
                cardType={t(statsTypes.MAINBOARD)}
                isPlayer={false}
            />

            <CardBlockStats
                id={id}
                text={t('Top Sideboard Cards')}
                endpoint={endpoint.replace('{id}', id).replace('{option}', t(statsTypes.SIDEBOARD))}
                cardType={t(statsTypes.SIDEBOARD)}
                isPlayer={false}
            />
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
                            <StatsImage></StatsImage>
                            <span className="left ml5">{t('Stats')}</span>
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