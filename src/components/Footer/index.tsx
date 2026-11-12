import Logo from "@/components/Logo";
import { useTranslations } from "next-intl";
import SocialLinks from "@/components/Social/Footer";

function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="w-full bg-[#121820] px-5 py-10 sm:px-8">
            <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 sm:px-6 lg:px-12">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2">
                            <Logo />
                        </div>

                        <p className="body-copy mt-8 mb-4 text-xs leading-4 text-[#94a3b8]">
                            {t("description")}
                        </p>
                    </div>

                    <nav
                      aria-label="MTG Legacy Stats social channels"
                      className="flex flex-wrap items-center gap-4"
                    >
                        <SocialLinks />
                    </nav>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                    <p className="body-copy text-xs leading-4 text-[#94a3b8]">
                        {t("copyright")}
                    </p>

                    <p className="body-copy text-[11px] leading-4 text-[rgba(148,163,184,0.8)]">
                        {t("trademark")}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
