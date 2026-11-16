import DecklistForm from "@/components/Forms/Decklist";
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { seo_tags } from '@/components/Seo';
import { baseUrl } from "@/types/server/baseUrl";

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale }  = await params;
    const t           = await getTranslations({ locale, namespace: 'decklist' });
    const url         = `${baseUrl}/decklist`;
    const title       = t('title');
    const description = t('description');

    return seo_tags(title, description, url);
}

const Decklist = () => {
    const t = useTranslations('decklist');

    return (
        <main className="w-full pt-20 bg-surface-base min-h-screen">
            <div className="flex flex-col w-full">
                <div className="relative w-full max-w-[1280px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
                    {/* Ambient glow orbs */}
                    <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
                    <div className="absolute top-1/2 right-10 w-80 h-80 bg-mana-blue/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

                    {/* 1. Breadcrumbs & live standard badge */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-space-md">
                        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-label-md text-mana-black">
                            <a className="hover:text-primary transition-colors flex items-center gap-1" href="/">
                                <span className="material-symbols-outlined text-[16px]">home</span>
                                <span>{t('breadcrumb_home')}</span>
                            </a>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary font-semibold">{t('breadcrumb_current')}</span>
                        </nav>
                        <div className="flex items-center gap-2 bg-surface-card px-3 py-1 rounded-full shadow-sm">
                            <span className="inline-block w-2 h-2 rounded-full bg-mana-green animate-ping"></span>
                            <span className="inline-block w-2 h-2 rounded-full bg-mana-green -ml-3"></span>
                            <span className="font-label-sm text-label-sm text-mana-white tracking-wider uppercase">{t('circuit_standard')}</span>
                        </div>
                    </div>

                    {/* 2. Header banner with glassmorphic layout */}
                    <header className="relative rounded-xl bg-surface-card p-space-md md:p-space-xl overflow-hidden shadow-xl mb-space-xl">
                        <div className="absolute -right-16 -top-16 opacity-5 pointer-events-none select-none">
                            <span className="material-symbols-outlined text-[320px] text-white">description</span>
                        </div>
                        <div className="relative z-10 flex flex-col gap-space-sm max-w-3xl">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm tracking-wider uppercase">
                                    {t('official_tool')}
                                </span>
                                <span className="text-mana-black text-xs font-label-md">• {t('tool_context')}</span>
                            </div>
                            <h1 className="font-display-hero text-headline-lg-mobile md:text-display-hero text-mana-white tracking-tight">
                                {t('hero_title')}
                            </h1>
                            <p className="font-body-lg text-body-lg text-mana-black max-w-2xl">
                                {t('hero_lead')}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 pt-space-xs">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated text-mana-white font-label-sm text-label-sm shadow-sm">
                                    <span className="material-symbols-outlined text-mana-blue text-[16px]">verified</span>
                                    {t('feature_wes')}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated text-mana-white font-label-sm text-label-sm shadow-sm">
                                    <span className="material-symbols-outlined text-mana-green text-[16px]">spellcheck</span>
                                    {t('feature_validation')}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated text-mana-white font-label-sm text-label-sm shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-[16px]">rule</span>
                                    {t('feature_counts')}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated text-mana-white font-label-sm text-label-sm shadow-sm">
                                    <span className="material-symbols-outlined text-arcane-gold text-[16px]">picture_as_pdf</span>
                                    {t('feature_pdf')}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* 3. Interactive form + 4. Preview/export */}
                    <DecklistForm />

                    {/* 5. Competitive regulation notice (MTR compliance) */}
                    <footer className="bg-surface-card rounded-xl p-space-lg shadow-md mb-space-2xl">
                        <div className="flex flex-col md:flex-row items-start gap-space-md">
                            <div className="p-2.5 rounded-lg bg-surface-elevated text-arcane-gold shrink-0">
                                <span className="material-symbols-outlined text-[28px]">gavel</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="font-headline-sm text-headline-sm text-mana-white">{t('mtr_title')}</h4>
                                <p className="font-body-md text-body-md text-mana-black leading-relaxed">{t('mtr_intro')}</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 font-body-sm text-body-sm text-mana-black">
                                    <li className="flex items-center gap-2 bg-surface-base/60 p-2 rounded">
                                        <span className="material-symbols-outlined text-mana-blue text-[16px]">chevron_right</span>
                                        <span>{t('mtr_rule_1')}</span>
                                    </li>
                                    <li className="flex items-center gap-2 bg-surface-base/60 p-2 rounded">
                                        <span className="material-symbols-outlined text-mana-blue text-[16px]">chevron_right</span>
                                        <span>{t('mtr_rule_2')}</span>
                                    </li>
                                    <li className="flex items-center gap-2 bg-surface-base/60 p-2 rounded">
                                        <span className="material-symbols-outlined text-mana-blue text-[16px]">chevron_right</span>
                                        <span>{t('mtr_rule_3')}</span>
                                    </li>
                                    <li className="flex items-center gap-2 bg-surface-base/60 p-2 rounded">
                                        <span className="material-symbols-outlined text-mana-blue text-[16px]">chevron_right</span>
                                        <span>{t('mtr_rule_4')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </main>
    );
};

export default Decklist;
