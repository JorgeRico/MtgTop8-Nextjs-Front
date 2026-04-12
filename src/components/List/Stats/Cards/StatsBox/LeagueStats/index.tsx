import statsTypes from "@/types/server/stats-types";
import "@/components/List/Stats/module.css";
import CardBlockStats from "@/components/List/Stats/Cards";
import { useTranslations } from 'next-intl';
import TitleBlock from "@/components/List/Stats/Cards/StatsBox/Title";

type MyComponentProps = {
    id       : string;
    endpoint : string;
}

const LeagueStats: React.FC<MyComponentProps> = ({ id, endpoint }) => {
    const t = useTranslations('stats');

    return (
        <>
            <TitleBlock text={t('Player Stats')} />
            <CardBlockStats
                text     = {t('Top Players')}
                endpoint = {endpoint.replace('{id}', id).replace('{option}', statsTypes.PLAYERS)}
                cardType = {statsTypes.PLAYERS}
                isPlayer = {true}
            />
        </>
    )
}

export default LeagueStats;