import { useTranslations } from 'next-intl';
import Image from "next/image";

const LogoIconsImage: React.FC = () => {
    const t = useTranslations('alt-tags');

    return (
        <Image
            className = "f24 logos invertColor"
            src       = "/images/mtg-logos.webp"
            height    = {17}
            width     = {100}
            alt       = {t('mtg stats')}
            title     = {t('mtg stats')}
            priority
        />
    );
}

export default LogoIconsImage;