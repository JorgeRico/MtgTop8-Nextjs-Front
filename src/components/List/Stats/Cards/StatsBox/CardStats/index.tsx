import statsTypes from "@/types/server/stats-types";
import "@/components/List/Stats/module.css";
import CardBlockStats from "@/components/List/Stats/Cards";
import { useTranslations } from 'next-intl';
import TitleBlock from "@/components/List/Stats/Cards/StatsBox/Title";

type MyComponentProps = {
    id            : string;
    endpoint      : string;
    endpointCards : string;
}

const CardStats: React.FC<MyComponentProps> = ({ id, endpoint, endpointCards }) => {
    const t = useTranslations('stats');

    return (
        <>
            <TitleBlock text={t('Card Stats')} />
            <CardBlockStats
                text     = {t('Top Cards')}
                endpoint = {endpoint.replace('{id}', id).replace('{option}', statsTypes.TOP)}
                cardType = {statsTypes.TOP}
                isPlayer = {false}
            />

            <CardBlockStats
                text     = {t('Top Creatures')}
                endpoint = {endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.CREATURE)}
                cardType = {statsTypes.CREATURE}
                isPlayer = {false}
            />

            <CardBlockStats
                text     = {t('Top Instants')}
                endpoint = {endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.INSTANT)}
                cardType = {statsTypes.INSTANT}
                isPlayer = {false}
            />

            <CardBlockStats
                text     = {t('Top Sorceries')}
                endpoint = {endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.SORCERY)}
                cardType = {statsTypes.SORCERY}
                isPlayer = {false}
            />

            <CardBlockStats
                text     = {t('Top Artifacts')}
                endpoint = {endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.ARTIFACT)}
                cardType = {statsTypes.ARTIFACT}
                isPlayer = {false}
            />

            <CardBlockStats
                text     = {t('Top Enchantments')}
                endpoint = {endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.ENCHANTMENT)}
                cardType = {statsTypes.ENCHANTMENT}
                isPlayer = {false}
            />

            <CardBlockStats
                text     = {t('Top Planeswalkers')}
                endpoint = {endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.PLANESWALKER)}
                cardType = {statsTypes.PLANESWALKER}
                isPlayer = {false}
            />

            <CardBlockStats
                text     = {t('Top Lands')}
                endpoint = {endpointCards.replace('{id}', id).replace('{cardType}', statsTypes.LAND)}
                cardType = {statsTypes.LAND}
                isPlayer = {false}
            />

            <TitleBlock text={t('Deck Stats')} />
            <CardBlockStats
                text     = {t('Top Mainboard Cards')}
                endpoint = {endpoint.replace('{id}', id).replace('{option}', statsTypes.MAINBOARD)}
                cardType = {statsTypes.MAINBOARD}
                isPlayer = {false}
            />

            <CardBlockStats
                text     = {t('Top Sideboard Cards')}
                endpoint = {endpoint.replace('{id}', id).replace('{option}', statsTypes.SIDEBOARD)}
                cardType = {statsTypes.SIDEBOARD}
                isPlayer = {false}
            />
        </>
    )
}

export default CardStats;