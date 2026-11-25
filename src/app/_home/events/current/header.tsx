'use client';

import {useTranslations} from 'next-intl';

const CurrentLeaguesHeader = ({title}: {title: string}) => {
	const t               = useTranslations('current-leagues');
	const assetPathPrefix = '/images/home';

    return (
        <>
            <header className="section-heading flex mb-2 w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                    <div className="current-leagues-icon flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-card">
                        <img
                            alt=""
                            className="current-leagues-icon-image"
                            src={`${assetPathPrefix}/yellow_cup.png`}
                        />
                    </div>
                    <div>
                        <h2 className="current-leagues-title mb-2 font-jakarta-semibold text-lg leading-6" id="current-leagues-title">
                            {title}
                        </h2>
                        <p className="current-leagues-description font-inter-regular text-xs leading-4">
                            {t('Explore current leagues, view standings, round pairings, and decklists')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-surface-card px-2.5 py-1">
                    <span className="current-leagues-status-dot size-2 rounded-full" />
                    <span className="current-leagues-status-label font-inter-bold">
                        {t('In Progress')}
                    </span>
                </div>
            </header>
        </>
    );
};

export default CurrentLeaguesHeader;
