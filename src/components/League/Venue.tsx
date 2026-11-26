import Link from 'next/link';
import {useTranslations} from 'next-intl';
import CalendarMonthIcon from '@/components/Icons/CalendarMonth';
import GroupIcon from '@/components/Icons/Group';
import GroupsIcon from '@/components/Icons/Groups';
import {TournamentType} from '@/types/schemas/database/tournament';

interface LeagueVenueProps {
  location: string | null;
  locationName: string;
  classification: string;
  year: string;
  tournaments: Array<TournamentType>;
  url: string;
}

const LeagueVenue = ({
  location,
  locationName,
  classification,
  year,
  tournaments,
  url
}: LeagueVenueProps) => {
  const t = useTranslations('league.detail');

  const hasLocation = location != null && location !== '';

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-6 bg-surface-card rounded-xl p-space-md md:p-space-lg flex flex-col justify-between gap-space-md">
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase">
              <span className="material-symbols-outlined text-size-16">
                pin_drop
              </span>
              <span>{t('venue_headquarters')}</span>
            </div>

            <div className="flex flex-wrap items-center gap-space-sm text-mana-black font-body-md text-body-md pt-1">
              {location != null && location !== '' && (
                <Link
                  className="flex items-center gap-1 text-on-surface hover:text-primary transition-colors group"
                  href={`https://maps.app.goo.gl/${location}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-primary text-size-18 group-hover:scale-110 transition-transform">
                    location_on
                  </span>
                  <span className="underline decoration-surface-container-highest group-hover:decoration-primary font-headline-md text-headline-md text-mana-white">
                    {locationName}
                  </span>
                  <span className="material-symbols-outlined text-size-14 text-mana-black">
                    open_in_new
                  </span>
                </Link>
              )}
              {location == null && location === '' && (
                <h2 className="font-headline-md text-headline-md text-mana-white">
                  {t('venue_unknown')}
                </h2>
              )}
              {classification != null && classification !== '' && (
                <>
                  <span className="text-surface-container-highest">•</span>
                  <span className="flex items-center gap-1 text-body-sm text-mana-black">
                    <span className="material-symbols-outlined text-size-16">
                      leaderboard
                    </span>
                    {classification}
                  </span>
                </>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2 text-body-sm">
              <div className="flex items-center gap-2">
                <CalendarMonthIcon className="size-[18px] text-mana-blue" />
                <span className="text-mana-white">
                  {t('season')} {year}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GroupIcon className="size-[18px] text-mana-green" />
                <span className="text-mana-white">
                  {tournaments.length} {t('stages_lowercase')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GroupsIcon className="size-[18px] text-mana-green" />
                <span className="text-mana-white">
                  {tournaments.length} {t('attendance_avg')}
                </span>
              </div>
            </div>
          </div>

          {hasLocation && (
            <div className="pt-space-md flex flex-wrap items-center gap-space-sm">
              <Link
                className="px-space-md py-space-sm rounded-lg bg-primary-container text-white font-label-md text-label-md hover:bg-orange-600 transition-colors flex items-center gap-1.5 shadow-orange-glow"
                href={`https://maps.app.goo.gl/${location}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-size-18">
                  navigation
                </span>
                <span>{t('venue_maps')}</span>
              </Link>
              <a
                className="px-space-md py-space-sm rounded-lg bg-surface-elevated text-mana-white font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1.5"
                href="https://instagram.com/legacy.cat"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-size-18">
                  help
                </span>
                <span>{t('venue_contact')}</span>
              </a>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 bg-surface-card rounded-xl p-space-md flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-mana-white tracking-tight">
              {t('venue_schedule')}
            </h2>
            <span className="text-xs text-mana-blue font-bold">
              {tournaments.length} {t('stages_lowercase')}
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            {tournaments.map((item, index) => (
              <Link
                className="group flex items-center justify-between gap-space-sm rounded bg-surface-base p-3 transition-colors hover:bg-surface-elevated"
                href={`${url}${item.id}`}
                key={item.id}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-surface-elevated text-mana-white font-label-sm text-label-sm uppercase font-bold shrink-0">
                    {t('stage')} {index + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="block font-label-lg text-label-lg text-mana-white truncate">
                      {item.name}
                    </span>
                    <span className="block text-body-sm text-mana-black">
                      {item.date} • {item.players} {t('players')}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-size-18 text-mana-black transition-colors group-hover:text-primary shrink-0">
                  arrow_forward
                </span>
              </Link>
            ))}

            {tournaments.length === 0 && (
              <div className="p-3 rounded bg-surface-base text-body-sm text-mana-black">
                {t('no_tournaments')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueVenue;
