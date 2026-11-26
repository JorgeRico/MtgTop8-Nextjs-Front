import {useTranslations} from 'next-intl';
import QueryStatsIcon from '@/components/Icons/QueryStats';
import Spinner from '@/components/Spinner';
import {TournamentType} from '@/types/schemas/database/tournament';
import {LeagueChampionType} from '@/types/schemas/website/league';

interface LeagueStagesProps {
  tournaments: Array<TournamentType>;
  champions: Record<number, LeagueChampionType>;
  isLoading: boolean;
}

const toTimestamp = (date: string): number => {
  const [day, month, year] = date.split('/').map(Number);

  if ([day, month, year].some(Number.isNaN)) {
    const parsed = Date.parse(date);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return new Date(year < 100 ? 2000 + year : year, month - 1, day).getTime();
};

const LeagueStages = ({
  tournaments,
  champions,
  isLoading
}: LeagueStagesProps) => {
  const t = useTranslations('league.detail');

  const orderedTournaments = tournaments
    .map((item, originalIndex) => ({item, stage: originalIndex + 1}))
    .sort(
      (a, b) =>
        toTimestamp(b.item.date) - toTimestamp(a.item.date) || b.stage - a.stage
    );

  if (tournaments.length === 0) {
    return (
      <div className="bg-surface-card rounded-xl p-space-lg text-body-md text-mana-black flex items-center gap-2">
        <span className="material-symbols-outlined text-size-18">info</span>
        <span>{t('no_tournaments')}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-space-lg">
      <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/40 shadow-lg">
        <header className="flex flex-col gap-2 border-b border-outline-variant/15 bg-surface-container-low/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <QueryStatsIcon className="size-6 shrink-0 text-primary" />
            <div>
              <h2 className="font-headline-md text-headline-md text-mana-white">
                {t('circuit_stages')}
              </h2>
              <p className="font-body-sm text-body-sm text-mana-black">
                {t('circuit_stages_desc')}
              </p>
            </div>
          </div>
        </header>
      </section>

      <div className="grid grid-cols-1 gap-space-md w-full">
        {orderedTournaments.map(({item, stage}) => {
          const champion = champions[item.id];

          return (
            <div
              className="bg-surface-card rounded-xl p-space-md transition-all flex flex-col justify-between gap-space-md relative overflow-hidden"
              key={item.id}
            >
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="px-2 py-0.5 rounded bg-surface-elevated text-mana-white font-label-sm text-label-sm uppercase font-bold">
                      {t('stage')} {stage}
                    </span>
                    <span className="text-mana-black font-body-sm">
                      {item.date}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-base text-mana-black font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-size-14 text-mana-green">
                      check_circle
                    </span>
                    {t('completed')}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-space-sm mt-1 px-2 text-body-sm text-mana-black">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-size-16">
                          groups
                        </span>
                        {item.players} {t('players')}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-size-16">
                          timer
                        </span>
                        {item.leagueName}
                      </span>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className="mt-3 p-2.5 rounded bg-surface-base/80 flex min-h-14 items-center justify-center">
                    <Spinner label={t('loading_winners')} />
                  </div>
                ) : champion ? (
                  <div className="mt-3 p-2.5 rounded bg-surface-base/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-arcane-gold/20 text-arcane-gold flex items-center justify-center font-bold text-xs shrink-0">
                        <span className="material-symbols-outlined text-size-16">
                          military_tech
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-mana-black uppercase">
                          {t('champion')}
                        </span>
                        <span className="font-label-lg text-label-lg text-mana-white">
                          {champion.name}
                        </span>
                      </div>
                    </div>
                    {champion.deck !== '' && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-card text-xs">
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                          {champion.deck}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeagueStages;
