import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { TournamentType } from '@/types/schemas/database/tournament';

interface LeagueVenueProps {
    location       : string | null;
    locationName   : string;
    classification : string;
    year           : string;
    tournaments    : Array<TournamentType>;
    url            : string;
}

const LeagueVenue = ({ location, locationName, classification, year, tournaments, url }: LeagueVenueProps) => {
    const t = useTranslations('league.detail');

    const hasLocation = location != null && location !== '';

    return (
        <div className="flex flex-col gap-space-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                <div className="lg:col-span-6 bg-surface-card rounded-xl p-space-md md:p-space-lg flex flex-col justify-between gap-space-md">
                    <div className="flex flex-col gap-space-sm">
                        <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase">
                            <span className="material-symbols-outlined text-size-16">pin_drop</span>
                            <span>{t('venue_headquarters')}</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-mana-white">{locationName !== '' ? locationName : t('venue_unknown')}</h2>
                        {classification !== '' && (
                            <p className="font-body-md text-body-md text-mana-black leading-relaxed">{classification}</p>
                        )}
                        <div className="mt-4 flex flex-col gap-2 text-body-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-mana-blue text-size-18">calendar_month</span>
                                <span className="text-mana-white">{t('season')} {year}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-mana-green text-size-18">groups</span>
                                <span className="text-mana-white">{tournaments.length} {t('stages_lowercase')}</span>
                            </div>
                        </div>
                    </div>

                    {hasLocation && (
                        <div className="pt-space-md flex flex-wrap items-center gap-space-sm">
                            <Link className="px-space-md py-space-sm rounded-lg bg-primary-container text-white font-label-md text-label-md hover:bg-orange-600 transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(249,115,22,0.35)]" href={`https://maps.app.goo.gl/${location}`} rel="noopener noreferrer" target="_blank">
                                <span className="material-symbols-outlined text-size-18">navigation</span>
                                <span>{t('venue_maps')}</span>
                            </Link>
                            <a className="px-space-md py-space-sm rounded-lg bg-surface-elevated text-mana-white font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1.5" href="https://instagram.com/legacy.cat" rel="noopener noreferrer" target="_blank">
                                <span className="material-symbols-outlined text-size-18">help</span>
                                <span>{t('venue_contact')}</span>
                            </a>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-6 bg-surface-card rounded-xl p-space-md flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="font-headline-md text-headline-md text-mana-white tracking-tight">{t('venue_schedule')}</h2>
                        <span className="text-xs text-mana-blue font-bold">{tournaments.length} {t('stages_lowercase')}</span>
                    </div>

                    <div className="flex flex-col gap-space-sm">
                        {tournaments.map((item, index) => (
                            <div className="flex items-center justify-between gap-space-sm p-3 rounded bg-surface-base" key={item.id}>
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="px-2 py-0.5 rounded bg-surface-elevated text-mana-white font-label-sm text-label-sm uppercase font-bold shrink-0">
                                        {t('stage')} {index + 1}
                                    </span>
                                    <div className="min-w-0">
                                        <span className="block font-label-lg text-label-lg text-mana-white truncate">{item.name}</span>
                                        <span className="block text-body-sm text-mana-black">{item.date} • {item.players} {t('players')}</span>
                                    </div>
                                </div>
                                <Link className="material-symbols-outlined text-size-18 text-mana-black hover:text-primary transition-colors shrink-0" href={`${url}${item.id}`}>
                                    arrow_forward
                                </Link>
                            </div>
                        ))}

                        {tournaments.length === 0 && (
                            <div className="p-3 rounded bg-surface-base text-body-sm text-mana-black">{t('no_tournaments')}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeagueVenue;
