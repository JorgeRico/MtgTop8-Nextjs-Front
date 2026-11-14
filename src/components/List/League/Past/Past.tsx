"use client";

import "./modules.css";
import { useTranslations } from "next-intl";
import { LeagueType } from "@/types/schemas/database/league";
import { useRouter } from "next/navigation";

type PastLeaguesComponentProps = {
    leagues: LeagueType[];
};

export default function PastLeagues({ leagues }: PastLeaguesComponentProps) {
    const t         = useTranslations("past-leagues");
    const assetPath = "/images/home";
    const router    = useRouter();

    const handlOnClick = (league: LeagueType) => {
        router.push("/leagues/" + league.id);
    }

    return (
        <main className="archive-page">
            <section className="past-leagues" aria-labelledby="past-leagues-title">
                <div className="league-stack" aria-live="polite">
                    {leagues.map((league, index) => (
                        <article className="league-card mt-2" key={index}>
                            <div className="league-summary">
                                <span className="medal-icon" aria-hidden="true">
                                    <img src={`${assetPath}/badge.png`} alt="" />
                                </span>
                                <div className="league-copy">
                                    <h2>{league.name}</h2>
                                    <div className="winner-row">
                                        <span className="dot winner">•</span>
                                        <span className="winner">{t('Winner')}: {"league.winner"}</span>
                                    </div>
                                    <div className="league-meta">
                                        <span>{"league.tournaments"} {t('Tournaments')}</span>
                                        <span>{"league.competitors"} {t(('Competitors'))}</span>
                                        <span className="completed">{t('Completed')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button
                                    className="secondary-action cursor-pointer"
                                    type="button"
                                    onClick={() => handlOnClick(league)}
                                >
                                    <img src={`${assetPath}/list.png`} alt="" />
                                    {t('Top 8 Decks')}
                                </button>
                                <button
                                    className="primary-action cursor-pointer"
                                    type="button"
                                    onClick={() => handlOnClick(league)}
                                >
                                    {t('View league')}
                                    <img src={`${assetPath}/full_arrow_forward.png`} alt="" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
