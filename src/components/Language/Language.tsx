
import { cookies } from "next/headers";
import LanguageMenu from "./LocaleSwitcher";
import languages from "@/types/server/languages";

export default async function Language() {
    const cookieStore = await cookies();

    const localeCode = cookieStore.get("locale")?.value ?? "en";

    const currentLocale =
        languages.find((lang) => lang.code === localeCode) ??
        languages.find((lang) => lang.code === "en") ??
        languages[0];

    async function changeLocaleAction(locale: string) {
        "use server";

        const store = await cookies();

        store.set("locale", locale, {
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365,
        });
    }

    return (
        <LanguageMenu
            currentLocale={currentLocale}
            onLanguageChange={changeLocaleAction}
        />
    );
}
