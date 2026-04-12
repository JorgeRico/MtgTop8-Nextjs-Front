'use client';

import "./module.css";
import { useRef } from 'react';
import languages from "@/types/server/languages";
import { Locale, useLocale, useTranslations } from 'next-intl';

type Props = {
    changeLocaleAction: (locale: Locale) => Promise<void>;
};

export default function LocaleSwitcher({changeLocaleAction}: Props) {
    const locale           = useLocale();
    const langContainerRef = useRef<null | HTMLDivElement>(null);
    const t                = useTranslations('language');
    
    const handleClickButton = () => {
        const element = langContainerRef;
        element.current?.classList.toggle('none');
    };

    const changeLanguage = (languageCode: string) => {
        const element = langContainerRef;
        changeLocaleAction(languageCode as Locale)
        element.current?.classList.toggle('none');
    };

    const getLangInfo = (lang: string) => {
        return languages.find((list) => lang === list.code)?.name ?? '';
    }

    const buttonBlock = (code: string, name: string) => {
        return (
            <>
                <span className="uppercase">
                    {code}
                </span>
                <span> - </span>
                <span>
                    {name}
                </span>
            </>
        )
    }

    return (
        <>
            <div className="languageBox mt10">
                <button aria-label={t('Select language')} className="bg-footer" onClick={() => handleClickButton()}>
                    {buttonBlock(locale, getLangInfo(locale))}
                </button>
            </div>
            <div className="languageBox dropdown bg-footer none mt10" ref={langContainerRef}>
                {languages.map((lang) => (
                    <button
                        className  = {`${locale === lang.code ? "selected" : ""}`}
                        key        = {lang.code}
                        onClick    = {() => changeLanguage(lang.code)}
                        aria-label = {lang.code}
                    >
                        {buttonBlock(lang.code, lang.name)}
                    </button>
                ))}
            </div>
        </>
    );
}