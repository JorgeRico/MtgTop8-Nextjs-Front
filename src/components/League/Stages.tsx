import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { TournamentType } from '@/types/schemas/database/tournament';
import { LeagueChampionType } from '@/types/schemas/website/league';

interface LeagueStagesProps {
    tournaments : Array<TournamentType>;
    champions   : Record<number, LeagueChampionType>;
    url         : string;
}

const LeagueStages = ({ tournaments, champions, url }: LeagueStagesProps) => {
    const t = useTranslations('league.detail');

    if (tournaments.length === 0) {
        return (
            <div className="bg-surface-card rounded-xl p-space-lg text-body-md text-mana-black flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">info</span>
                <span>{t('no_tournaments')}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-space-lg">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="font-headline-md text-headline-md text-mana-white tracking-tight">{t('circuit_stages')}</h2>
                    <p className="font-body-sm text-body-sm text-mana-black">{t('circuit_stages_desc')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-space-md w-full">
                {tournaments.map((item, index) => {
                    const champion = champions[item.id];

                    return (
                        <div className="bg-surface-card rounded-xl p-space-md transition-all flex flex-col justify-between gap-space-md relative overflow-hidden group" key={item.id}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-surface-elevated rounded-bl-full pointer-events-none group-hover:bg-primary-container/10 transition-colors"></div>

                            <div className="flex flex-col gap-space-xs">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-space-xs">
                                        <span className="px-2 py-0.5 rounded bg-surface-elevated text-mana-white font-label-sm text-label-sm uppercase font-bold">
                                            {t('stage')} {index + 1}
                                        </span>
                                        <span className="text-mana-black font-body-sm">{item.date}</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full bg-surface-base text-mana-black font-label-sm text-label-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px] text-mana-green">check_circle</span>
                                        {t('completed')}
                                    </span>
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                    <div>
                                        {/* <h3 className="font-headline-sm text-headline-sm text-mana-white group-hover:text-primary transition-colors">{item.name}</h3> */}
                                        <div className="flex items-center gap-space-sm mt-1 px-2 text-body-sm text-mana-black">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px]">groups</span>
                                                {item.players} {t('players')}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px]">timer</span>
                                                {item.leagueName}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {champion && (
                                    <div className="mt-3 p-2.5 rounded bg-surface-base/80 flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-arcane-gold/20 text-arcane-gold flex items-center justify-center font-bold text-xs shrink-0">
                                                <span className="material-symbols-outlined text-[16px]">military_tech</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-label-sm text-label-sm text-mana-black uppercase">{t('champion')}</span>
                                                <span className="font-label-lg text-label-lg text-mana-white">{champion.name}</span>
                                            </div>
                                        </div>
                                        {champion.deck !== '' && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-card text-xs">
                                                <span className="font-label-sm text-label-sm text-on-surface font-semibold">{champion.deck}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between pt-2">
                                {/* <span className="text-body-sm text-mana-black">{item.year}</span> */}
                                <Link className="px-space-md py-1.5 rounded bg-surface-elevated hover:bg-primary-container hover:text-white text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1" href={`${url}${item.id}`}>
                                    <span>{t('view_tournament')}</span>
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </Link>
                            </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                {/* <span className="text-body-sm text-mana-black">{item.year}</span> */}
                                <Link className="px-space-md py-1.5 rounded bg-surface-elevated hover:bg-primary-container hover:text-white text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1" href={`${url}${item.id}`}>
                                    <span>{t('view_tournament')}</span>
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LeagueStages;
