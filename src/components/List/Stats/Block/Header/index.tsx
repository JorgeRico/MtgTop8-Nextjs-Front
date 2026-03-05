import { useTranslations } from 'next-intl';

type MyComponentProps = {
    isPlayer : boolean;
}

const TopStatsList: React.FC<MyComponentProps> = ({ isPlayer }) => {
    const t = useTranslations('stats');

    const topPlayerStats = () => {
        return (
            <div className="cardItem overflowHidden bg-red p5 mb10">
                <span className="left ml25">{t('Total')}</span>
                <span className="left ml15">{t('Name')}</span>
            </div>
        )
    }

    const topCardStats = () => {
        return (
            <div className="cardItem overflowHidden bg-red p5 mb10">
                <span className="left ml15 w-15">&nbsp;</span>
                <span className="left ml15">{t('Total')}</span>
                <span className="left ml15">{t('Name')}</span>
            </div>
        )
    }

    return (
        <div className="left w100">
            {isPlayer === true ? (
                    topPlayerStats()
                ) : (
                    topCardStats()
                )
            }
        </div>
    )
}

export default TopStatsList;