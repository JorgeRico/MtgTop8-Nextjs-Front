import { useTranslations } from 'next-intl';
import Image from "next/image";

const ListImage: React.FC = () => {
    const t = useTranslations('alt-tags');

    return (
        <Image
            className = "left ml5 pt6"
            src       = "/images/list.webp"
            height    = {24}
            width     = {24}
            alt       = {t('alt-tags.mtg stats list image')}
            title     = {t('alt-tags.mtg stats list image')}
            priority
        />
    );
}

export default ListImage;