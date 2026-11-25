import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface LeagueHeroProps {
    leagueName     : string;
    year           : string;
    format         : string;
    location       : string | null;
    locationName   : string;
    classification : string;
    isCurrent      : boolean;
    numPlayers     : number;
    numStages      : number;
    avgPlayers     : number;
}

const LeagueHero = ({ leagueName, year, format, location, locationName, classification, isCurrent, numPlayers, numStages, avgPlayers }: LeagueHeroProps) => {
    const t = useTranslations('league.detail');

    const handleShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';

        try {
            if (typeof navigator !== 'undefined' && navigator.share) {
                await navigator.share({ title: leagueName, url });
                return;
            }
            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                await navigator.clipboard.writeText(url);
            }
        } catch {
            console.log('Share cancelled');
        }
    };

    return (
        <section className="relative bg-surface-card rounded-xl p-space-md md:p-space-lg shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container via-mana-blue to-primary"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                    <div className="flex flex-wrap items-center gap-space-xs">
                        <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm tracking-wider uppercase flex items-center gap-1.5 ${isCurrent ? 'bg-mana-green/10 text-mana-green shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'bg-surface-elevated text-mana-black'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-mana-green animate-pulse' : 'bg-mana-black'}`}></span>
                            {isCurrent ? t('active_circuit') : t('archived_league')}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-elevated text-mana-black font-label-sm text-label-sm uppercase">
                            {t('season')} {year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-elevated text-mana-blue font-label-sm text-label-sm uppercase flex items-center gap-1">
                            <span className="material-symbols-outlined text-size-14">bolt</span>
                            {format}
                        </span>
                    </div>

                    <div className="flex items-baseline gap-space-sm pt-1">
                        <h1 className="font-headline-lg text-headline-lg text-mana-white tracking-tight">{leagueName}</h1>
                        <span className="font-stat-mono text-mana-black text-body-md hidden sm:inline">#{leagueId(leagueName)}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-space-sm text-mana-black font-body-md text-body-md pt-1">
                        {location != null && location !== '' && (
                            <Link className="flex items-center gap-1 text-on-surface hover:text-primary transition-colors group" href={`https://maps.app.goo.gl/${location}`} rel="noopener noreferrer" target="_blank">
                                <span className="material-symbols-outlined text-primary text-size-18 group-hover:scale-110 transition-transform">location_on</span>
                                <span className="underline decoration-surface-container-highest group-hover:decoration-primary font-semibold">{locationName}</span>
                                <span className="material-symbols-outlined text-size-14 text-mana-black">open_in_new</span>
                            </Link>
                        )}
                        {classification != null && classification !== '' && (
                            <>
                                <span className="text-surface-container-highest">•</span>
                                <span className="flex items-center gap-1 text-body-sm text-mana-black">
                                    <span className="material-symbols-outlined text-size-16">leaderboard</span>
                                    {classification}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-space-xs shrink-0">
                    <button className="px-space-md py-space-sm rounded-lg bg-surface-elevated hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2" onClick={handleShare} type="button">
                        <span className="material-symbols-outlined text-size-18">share</span>
                        <span>{t('share_stats')}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm mt-space-lg pt-space-md bg-surface-base/60 rounded-lg p-space-sm">
                <div className="flex flex-col px-space-sm py-1">
                    <span className="font-label-sm text-label-sm text-mana-black uppercase tracking-wider">{t('registered_grinders')}</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="font-stat-mono text-stat-mono text-mana-white">{numPlayers}</span>
                    </div>
                </div>
                <div className="flex flex-col px-space-sm py-1">
                    <span className="font-label-sm text-label-sm text-mana-black uppercase tracking-wider">{t('attendance_avg')}</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="font-stat-mono text-stat-mono text-mana-blue">{avgPlayers}</span>
                        <span className="text-mana-black text-body-sm">{t('players_stage')}</span>
                    </div>
                </div>
                <div className="flex flex-col px-space-sm py-1">
                    <span className="font-label-sm text-label-sm text-mana-black uppercase tracking-wider">{t('stages_played')}</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="font-stat-mono text-stat-mono text-mana-white">{numStages}</span>
                    </div>
                </div>
                <div className="flex flex-col px-space-sm py-1">
                    <span className="font-label-sm text-label-sm text-mana-black uppercase tracking-wider">{t('season_progress')}</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="font-stat-mono text-stat-mono text-primary">{year}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const leagueId = (name: string): string => {
    const slug = name
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    return slug;
};

export default LeagueHero;
