'use client';

import {useTranslations} from 'next-intl';
import QueryStatsIcon from '@/components/Icons/QueryStats';

const StatsPanelHeader = () => {
    const tStats = useTranslations('stats');
    
    return (
        <>
            <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/40 shadow-lg">
                <header className="flex flex-col gap-2 border-b border-outline-variant/15 bg-surface-container-low/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <QueryStatsIcon className="size-6 shrink-0 text-primary" />
                        <div>
                            <h2 className="font-headline-md text-headline-md text-mana-white">
                                {tStats('Stats')}
                            </h2>
                            <p className="font-body-sm text-body-sm text-mana-black">
                                {tStats('All tournament stats')}
                            </p>
                        </div>
                    </div>
                </header>
            </section>
        </>
    );
};

export default StatsPanelHeader;
