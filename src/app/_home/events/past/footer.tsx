import { useTranslations } from 'next-intl';

const PastEventsFooter = () => {
    const t         = useTranslations('past-leagues');
    const assetPath = "/images/home";
    
    return (
        <>
            <div className="px-6 mb-5 rounded-xl bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-mana-black font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[18px]">
                        <img src={`${assetPath}/folder.png`} alt="" />
                    </span>
                    <span className="league-meta font-body-sm text-body-sm">
                        {t('historical-archives')}
                    </span>
                </div>
            </div>
        </>
    )
}

export default PastEventsFooter;
