'use client'

import { useTranslations } from 'next-intl';
import { LeagueStandingType } from '@/types/schemas/website/league';

interface LeagueStandingsProps {
    standings  : Array<LeagueStandingType>;
    isLoading  : boolean;
    year       : string;
}

const LeagueStandings = ({ standings, isLoading, year }: LeagueStandingsProps) => {
    const t = useTranslations('league.detail');

    if (isLoading) {
        return (
            <div className="bg-surface-card rounded-xl p-space-lg flex items-center gap-3 text-body-md text-mana-black">
                <span className="material-symbols-outlined text-size-18 animate-spin">progress_activity</span>
                <span>{t('loading_standings')}</span>
            </div>
        );
    }

    if (standings.length === 0) {
        return (
            <div className="bg-surface-card rounded-xl p-space-lg text-body-md text-mana-black flex items-center gap-2">
                <span className="material-symbols-outlined text-size-18">info</span>
                <span>{t('no_standings')}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-space-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                <div>
                    <h2 className="font-headline-md text-headline-md text-mana-white tracking-tight">{t('leaderboard_title', { year })}</h2>
                    <p className="font-body-sm text-body-sm text-mana-black">{t('leaderboard_desc')}</p>
                </div>
            </div>

            <div className="bg-surface-card rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-body-md text-body-md">
                        <thead className="bg-surface-elevated font-label-sm text-label-sm text-mana-black uppercase tracking-wider">
                            <tr>
                                <th className="py-3 px-4">{t('rank')}</th>
                                <th className="py-3 px-4">{t('player')}</th>
                                <th className="py-3 px-4">{t('stages')}</th>
                                <th className="py-3 px-4">{t('main_archetype')}</th>
                                <th className="py-3 px-4 text-right">{t('wins')}</th>
                                <th className="py-3 px-4 text-right">{t('points')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-base">
                            {standings.map((row, index) => (
                                <tr className="hover:bg-surface-elevated transition-colors group" key={index}>
                                    <td className={`py-3.5 px-4 font-stat-mono font-bold ${index === 0 ? 'text-arcane-gold' : 'text-mana-white'}`}>#{index + 1}</td>
                                    <td className="py-3.5 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-arcane-gold' : 'bg-mana-black'}`}></span>
                                            <span className="font-bold text-mana-white group-hover:text-primary transition-colors">{row.name}</span>
                                            {row.wins > 0 && (
                                                <span className="px-1.5 py-[2px] rounded bg-surface-elevated text-size-10 text-arcane-gold uppercase font-bold">
                                                    {row.wins}x {t('champion')}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-4 text-mana-black">{row.stages}</td>
                                    <td className="py-3.5 px-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-base text-xs text-mana-white">
                                            <span>{row.deck}</span>
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right font-stat-mono text-mana-white">{row.wins}</td>
                                    <td className={`py-3.5 px-4 text-right font-stat-mono text-stat-mono font-bold ${index === 0 ? 'text-arcane-gold' : 'text-mana-white'}`}>{row.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-space-md bg-surface-base/40 flex items-center justify-between">
                    <span className="text-body-sm text-mana-black">{t('showing_participants', { shown: standings.length, total: standings.length })}</span>
                </div>
            </div>
        </div>
    );
};

export default LeagueStandings;
