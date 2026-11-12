
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import languages from "@/types/server/languages";

interface Locale {
    code: string;
    name: string;
}

type Props = {
    currentLocale: Locale;
    onLanguageChange: (locale: string) => Promise<void>;
};

function LanguageMenu({ currentLocale, onLanguageChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Locale>(currentLocale);
    const [isPending, startTransition] = useTransition();

    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        setLanguage(currentLocale);
    }, [currentLocale]);

    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", closeMenu);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("mousedown", closeMenu);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, []);

    const handleLanguageChange = (code: string) => {
        const selectedLocale = languages.find(
            (lang) => lang.code === code
        );

        if (!selectedLocale || isPending) return;

        setLanguage(selectedLocale);
        setIsOpen(false);

        startTransition(async () => {
            try {
                await onLanguageChange(code);
                router.refresh();
            } catch (error) {
                console.error("Error changing locale:", error);
                setLanguage(currentLocale);
            }
        });
    };

    return (
        <div ref={menuRef} className="relative shrink-0">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                disabled={isPending}
                onClick={() => setIsOpen((open) => !open)}
                className="flex items-center gap-1.5 rounded bg-[#121820] px-2.5 py-3 transition-colors hover:bg-[#1a222d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
                <img
                    src="/images/menu/4f98c.svg"
                    alt=""
                    className="size-[13.333px]"
                />

                <span className="font-interface uppercase text-center text-[11px] font-bold leading-[14px] tracking-[0.55px] text-[#e0e2ea]">
                    {language.code}
                </span>

                <img
                    src="/images/menu/c7ef7.svg"
                    alt=""
                    className={`h-[4.317px] w-[7px] transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div
                    role="listbox"
                    aria-label="Choose language"
                    aria-busy={isPending}
                    className="absolute right-0 top-[calc(100%+8px)] z-10 min-w-full overflow-hidden rounded border border-white/5 bg-[#121820] py-1 shadow-xl"
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            role="option"
                            aria-selected={language.code === lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className="font-interface block w-full px-3 py-1.5 text-center text-[11px] font-bold tracking-[0.55px] uppercase text-[#94a3b8] hover:bg-[#1a222d] hover:text-[#f8fafc] focus:bg-[#1a222d] focus:text-[#f8fafc] focus:outline-none"
                        >
                            {lang.code}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageMenu;
