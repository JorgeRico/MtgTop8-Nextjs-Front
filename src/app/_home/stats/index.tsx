"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Stat = {
    label: string;
    value: string;
    detail: string;
    detailTone: "green" | "cyan" | "muted" | "peach";
};

const Stats = () => {
    const [ selectedStat, setSelectedStat ] = useState<number | null>(null);
    const t                                 = useTranslations('home');

    const stats: Stat[] = [
        {
            label: "Active leagues",
            value: "3",
            detail: "Live",
            detailTone: "green",
        },
        {
            label: "Tracked decks",
            value: "418",
            detail: "+24",
            detailTone: "cyan",
        },
        {
            label: "Circuit players",
            value: "164",
            detail: "CAT",
            detailTone: "muted",
        },
        {
            label: "Next event",
            value: "MAR 01",
            detail: "",
            detailTone: "peach",
        },
    ];

    return (
        <main className="page-shell mb-20">
            <section className="hero" aria-labelledby="page-title" data-node-id="40:8">
                <div className="hero-copy">
                    <div className="circuit-badge">
                        <span className="circuit-dot" aria-hidden="true" />
                        <span>{t('catalan-circuit-2026')}</span>
                    </div>
                    <h1 id="page-title">{t('league-title')}</h1>
                    <p className="text-body-md text-[#94a3b8]">
                        {t('league-description')}
                    </p>
                </div>

                <div className="stats-grid" aria-label="Circuit quick stats">
                    {stats.map((stat, index) => {
                        const isSelected = selectedStat === index;

                        return (
                            <button
                                className={`stat-card ${isSelected ? "is-selected" : ""}`}
                                key={stat.label}
                                type="button"
                                aria-pressed={isSelected}
                                aria-label={`${stat.label}: ${stat.value}${stat.detail ? ` ${stat.detail}` : ""}`}
                                onClick={() => setSelectedStat(isSelected ? null : index)}
                            >
                                <span className="stat-label">{stat.label}</span>
                                <span className="stat-reading">
                                    <span className={`stat-value ${stat.detailTone === "peach" ? "tone-peach" : ""}`}>
                                        {stat.value}
                                    </span>
                                    {stat.detail && (
                                        <span className={`stat-detail tone-${stat.detailTone}`}>{stat.detail}</span>
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

export default Stats;