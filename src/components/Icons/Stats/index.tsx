import { useTranslations } from 'next-intl';
import Image from "next/image";

const StatsImage: React.FC = () => {
    const t = useTranslations('alt-tags');

    return (
        <Image
            className = "left"
            src       = "/images/stats.webp"
            height    = {32}
            width     = {32}
            alt       = {t('mtg stats')}
            title     = {t('mtg stats')}
            priority
        />
    );
}

export default StatsImage;