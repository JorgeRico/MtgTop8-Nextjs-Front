// import { useTranslation } from 'react-i18next';
import Image from "next/image";

export default function LogoImage() {
    // const { t } = useTranslation();

    return (
        <>
            {/* <img src={Logos} width="100" height="17" alt={t('alt-tags.mtg stats')} className="f24 logos invertColor" /> */}
            <Image 
                className="f24 logos invertColor"
                src="/images/mtg-logos.webp"
                height={17} 
                width={100} 
                alt="" 
                priority 
                />
        </>
    );
}