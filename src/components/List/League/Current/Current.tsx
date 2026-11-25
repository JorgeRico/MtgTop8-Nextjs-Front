import { useTranslations } from "next-intl";
import { LeagueType } from "@/types/schemas/database/league";
import { useRouter } from "next/navigation";

type CurrentLeagueComponentProps = {
    league: LeagueType;
};

const CurrentComponent = ({ league }: CurrentLeagueComponentProps) => {
    const t               = useTranslations("league");
    const assetPathPrefix = "/images/home";
    const router          = useRouter();

    const handlOnClick = (league: LeagueType) => {
        router.push("/leagues/" + league.id);
    }

    return (
        <article className="relative flex min-h-233 min-w-0 flex-col justify-between rounded-xl bg-surface-card p-6 shadow-card-soft transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex w-full flex-col gap-4">
                <div className="flex w-full items-start justify-between gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-container">
                        <img alt="" src={`${assetPathPrefix}/medal.png`} />
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                        <span className="rounded-full bg-surface-container px-2 py-0.5 font-inter-bold text-size-11 leading-14 tracking-0-55 text-slate-400">
                            {t('Format')}: {t('Legacy')}
                        </span>
                        <span className="rounded-full bg-emerald-500-20 px-2 py-0.5 font-inter-bold text-size-11 leading-14 tracking-0-55 text-emerald-500">
                            {t('Active')}
                        </span>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-1">
                    <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate font-inter-semibold text-size-11 leading-14 tracking-0-55 text-peach">
                            {"league.organizer"}
                        </span>
                        <span className="font-inter-regular text-base leading-6 text-slate-400">•</span>
                        <span className="truncate font-inter-bold text-size-11 leading-14 tracking-0-55 text-slate-400">
                            {t('Monthly Event')}
                        </span>
                    </div>
                    <h3 className="font-jakarta-semibold text-lg leading-6 text-slate-50">{league.name}</h3>
                    <p className="pt-1 font-inter-regular text-xs leading-4 text-slate-400">
                        {t('Description')}
                    </p>
                </div>
            </div>

            <div className="w-full pt-6">
                <div className="flex w-full items-center justify-between gap-4 pt-4">
                    <div className="min-w-0">
                        <p className="font-inter-bold text-size-11 leading-14 tracking-0-55 text-slate-400">
                            {t('Stage')}
                        </p>
                        <p className="truncate font-inter-semibold text-sm leading-5 tracking-0-14 text-slate-50">
                            {"league.stage"}
                        </p>
                    </div>
                    <button
                        className="group cursor-pointer flex shrink-0 items-center gap-1 rounded-lg bg-primary-container px-4 py-2 font-inter-semibold text-sm leading-5 tracking-0-14 text-white shadow-hairline transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
                        onClick={() => handlOnClick(league)}
                        type="button"
                    >
                        {t('View league')}
                        <img src={`${assetPathPrefix}/full_arrow_forward.png`} alt="" />
                    </button>
                </div>
            </div>
        </article>
    );
}

export default CurrentComponent;