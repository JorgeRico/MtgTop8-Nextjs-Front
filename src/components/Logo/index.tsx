"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Logo = () => {
    const t = useTranslations('alt-tags');

    return (
        <Link href="/" aria-label="MTG Legacy Stats home" className="group flex min-w-0 items-center gap-4 rounded-md pr-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400">
            <span className="flex shrink-0 items-center gap-1 rounded bg-[#121820] p-1.5">
                <span className="size-2.5 rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 bg-gradient-1" />
                <span className="size-2.5 rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 bg-gradient-2" />
                <span className="size-2.5 rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 bg-gradient-3" />
                <span className="size-2.5 rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 bg-gradient-4" />
                <span className="size-2.5 rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 bg-gradient-5" />
            </span>

            <span className="min-w-0">
                <span className="flex items-center gap-1 mb-2">
                    <span className="font-brand truncate text-[18px] font-semibold leading-6 tracking-[-0.45px] text-[#f8fafc]">
                        {t('mtg legacy stats')}
                    </span>
                </span>
                <span className="font-interface hidden truncate text-[11px] font-bold leading-[14px] tracking-[0.55px] text-[#94a3b8] sm:block">
                    {t('catalan tournaments & meta circuit')}
                </span>
            </span>
        </Link>
    );
};

export default Logo;