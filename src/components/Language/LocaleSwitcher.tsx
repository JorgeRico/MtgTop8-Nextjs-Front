'use client';

import {Locale, useLocale} from 'next-intl';
// import {Locale, NextIntlClientProvider} from 'next-intl';


type Props = {
    changeLocaleAction: (locale: Locale) => Promise<void>;
};

// import {cookies} from 'next/headers';

export default function LocaleSwitcher({changeLocaleAction}: Props) {
    const locale = useLocale();

    // async function changeLocaleAction(locale: Locale) {
    //     'use server';
    //     const store = await cookies();
    //     store.set('locale', locale);
    // }

    return (
        <div style={{display: 'flex', gap: 5}}>
        {['en', 'es', 'cat'].map((cur) => (
            <button
            key={cur}
            onClick={() => changeLocaleAction(cur as Locale)}
            style={{fontWeight: locale === cur ? 'bold' : 'normal'}}
            >
            {cur.toUpperCase()}
            </button>
        ))}
        </div>
    );
}