"use client";

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import "@/app/styles/home_stats.css";

type Stat = {
    label: string;
    value: string;
};

const MIN_LOADING_MS = 1000;

const Stats = () => {
    const [ selectedStat, setSelectedStat ] = useState<number | null>(null);
    const [ isLoading, setIsLoading ]       = useState<boolean>(true);
    const t                                 = useTranslations('home');

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsLoading(false), MIN_LOADING_MS);

        return () => clearTimeout(timeoutId);
    }, []);

    const stats: Stat[] = [
        {
            label: "Active leagues",
            value: "3",
        },
        {
            label: "Tracked decks",
            value: "418",
        },
        {
            label: "Circuit players",
            value: "164",
        },
        {
            label: "Next event",
            value: "MAR 01",
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
                    <p className="text-body-md text-slate-400">
                        {t('league-description')}
                    </p>
                </div>

                {isLoading ? (
                    <Spinner label={t('loading-stats')} />
                ) : (
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
                                        <span className={`stat-value tone-cyan`}>
                                            {stat.value}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Stats;