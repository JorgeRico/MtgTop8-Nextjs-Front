import { useTranslations } from 'next-intl';
import Image from "next/image";

const LocationImage: React.FC = () => {
    const t = useTranslations('alt-tags');

    return (
        <Image
            className = "left ml5"
            src       = "/images/location.webp"
            height    = {20}
            width     = {20}
            alt       = {t('mtg location')}
            title     = {t('mtg location')}
            priority
        />
    );
}

export default LocationImage;