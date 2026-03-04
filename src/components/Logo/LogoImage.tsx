import Image from "next/image";
import { useTranslations } from 'next-intl';

const LogoImage: React.FC = () => {
    const t = useTranslations('alt-tags');

    return (
        <Image
            src="/images/stats-logo.webp"
            height={25}
            width={129}
            alt={t('mtg stats')}
            title={t('mtg stats')}
            priority
        />
    );
}

export default LogoImage;