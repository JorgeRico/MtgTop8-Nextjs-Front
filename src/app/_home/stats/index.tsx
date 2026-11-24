"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import "./modules.css";

type Stat = {
    label: string;
    value: string;
    detailTone: "green" | "cyan" | "muted" | "peach";
};

const Stats = () => {
    const [ selectedStat, setSelectedStat ] = useState<number | null>(null);
    const t                                 = useTranslations('home');

    const stats: Stat[] = [
        {
            label: "Active leagues",
            value: "3",
            detailTone: "green",
        },
        {
            label: "Tracked decks",
            value: "418",
            detailTone: "cyan",
        },
        {
            label: "Circuit players",
            value: "164",
            detailTone: "muted",
        },
        {
            label: "Next event",
            value: "MAR 01",
            detailTone: "peach",
        },
    ];

    return (
        <main className="mb-20">
            <section className="hero" aria-labelledby="page-title" data-node-id="40:8">
                <div className="hero-copy">
                    <div className="circuit-badge">
                        <span className="circuit-dot" aria-hidden="true" />
                        <span>{t('catalan-circuit-2026')}</span>
                    </div>
                    <h1 id="page-title" className="mb-1">{t('league-title')}</h1>
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
                                aria-label={`${stat.label}`}
                                onClick={() => setSelectedStat(isSelected ? null : index)}
                            >
                                <span className="stat-label">{stat.label}</span>
                                <span className="stat-reading">
                                    <span className={`stat-value ${stat.detailTone === "peach" ? "tone-peach" : ""}`}>
                                        {stat.value}
                                    </span>
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