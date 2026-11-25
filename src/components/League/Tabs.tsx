'use client'

import { useTranslations } from 'next-intl';
import { LeagueTabType } from '@/types/schemas/website/league';

interface LeagueTabsProps {
    active     : LeagueTabType;
    setActive  : (tab: LeagueTabType) => void;
    numStages  : number;
    lastSync   : string;
}

const LeagueTabs = ({ active, setActive, numStages, lastSync }: LeagueTabsProps) => {
    const t = useTranslations('league.detail');

    const tabs: Array<{ id: LeagueTabType, icon: string, label: string }> = [
        // { id: 'tournaments', icon: 'trophy',       label: t('tab_tournaments') },
        // { id: 'standings',  icon: 'leaderboard',  label: t('tab_standings') },
        // { id: 'meta',       icon: 'query_stats',  label: t('tab_meta') },
        { id: 'location',   icon: 'map',          label: t('tab_location') },
    ];

    return (
        <div className="flex items-center justify-between overflow-x-auto pb-1 gap-space-xs">
            <div className="flex items-center gap-space-xs bg-surface-card p-1 rounded-lg">
                {tabs.map((tab) => {
                    const isActive = active === tab.id;

                    return (
                        <button
                            aria-selected={isActive}
                            className={`px-space-md py-space-sm rounded-md font-label-lg text-label-lg transition-all flex items-center gap-2 whitespace-nowrap ${isActive ? 'bg-primary-container text-white shadow-orange-glow' : 'text-mana-black hover:text-mana-white hover:bg-surface-elevated'}`}
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            role="tab"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-size-18">{tab.icon}</span>
                            <span>{tab.label}</span>
                            {tab.id === 'tournaments' && numStages > 0 && (
                                <span className={`px-1.5 py-0.5 rounded-full text-size-10 font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-surface-elevated text-mana-black'}`}>{numStages}</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {lastSync !== '' && (
                <div className="hidden sm:flex items-center gap-space-xs text-mana-black font-label-sm text-label-sm whitespace-nowrap">
                    <span className="material-symbols-outlined text-size-16 text-mana-green">sync</span>
                    <span>{t('last_sync', { date: lastSync })}</span>
                </div>
            )}
        </div>
    );
};

export default LeagueTabs;
