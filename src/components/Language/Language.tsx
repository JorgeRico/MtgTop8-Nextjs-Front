import { Locale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import LocaleSwitcher from './LocaleSwitcher';
import { cookies } from 'next/headers';

export default async function Language() {
    const locale = await getLocale();

    async function changeLocaleAction(locale: Locale) {
        'use server';
        const store = await cookies();
        store.set('locale', locale);
    }

    return (
        <LocaleSwitcher changeLocaleAction={changeLocaleAction} />
    );
}