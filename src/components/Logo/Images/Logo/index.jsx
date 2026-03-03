// import { useTranslation } from 'react-i18next';
import Image from "next/image";

export default function LogoImage() {
    // const { t } = useTranslation();

    return (
        <Image 
            src="/images/stats-logo.webp"
            height={25} 
            width={129} 
            alt=""
            // alt={t('alt-tags.mtg stats')} 
            priority 
        />
    );
}