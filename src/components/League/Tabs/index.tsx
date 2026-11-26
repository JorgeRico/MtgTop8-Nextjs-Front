'use client';

import type {ReactNode} from 'react';
import {useTranslations} from 'next-intl';
import BarChartIcon from '@/components/Icons/BarChart';
import LeaderboardIcon from '@/components/Icons/Leaderboard';
import MapIcon from '@/components/Icons/Map';
import TrophyIcon from '@/components/Icons/Trophy';
import leagueTabs, {LeagueTabType} from '@/types/schemas/website/league';

interface LeagueTabsProps {
  active: LeagueTabType;
  setActive: (tab: LeagueTabType) => void;
  numStages: number;
  lastSync: string;
}

const LeagueTabs = ({
  active,
  setActive,
  numStages,
  lastSync
}: LeagueTabsProps) => {
  const t = useTranslations('league.detail');

  const tabs: Array<{id: LeagueTabType; icon: ReactNode; label: string}> = [
    {id: leagueTabs.VENUE, icon: <MapIcon />, label: t('tab_location')},
    {id: leagueTabs.STATS, icon: <BarChartIcon />, label: t('tab_stats')},
    {id: leagueTabs.TOURNAMENTS, icon: <TrophyIcon />, label: t('tab_winners')},
    {
      id: leagueTabs.STANDINGS,
      icon: <LeaderboardIcon />,
      label: t('tab_players')
    }
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
              {tab.icon}
              <span>{tab.label}</span>
              {tab.id === leagueTabs.TOURNAMENTS && numStages > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-size-10 font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-surface-elevated text-mana-black'}`}
                >
                  {numStages}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {lastSync !== '' && (
        <div className="hidden sm:flex items-center gap-space-xs text-mana-black font-label-sm text-label-sm whitespace-nowrap">
          <span className="material-symbols-outlined text-size-16 text-mana-green">
            sync
          </span>
          <span>{t('last_sync', {date: lastSync})}</span>
        </div>
      )}
    </div>
  );
};

export default LeagueTabs;
