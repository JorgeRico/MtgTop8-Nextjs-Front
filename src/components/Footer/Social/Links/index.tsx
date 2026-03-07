import LinkImage from "@/components/Link/Image";
import { useTranslations } from 'next-intl';

const SocialLinksFooter: React.FC = () => {
    const t = useTranslations('footer');

    return (
        <section className="left w100 links">
            <LinkImage className="" url="https://www.instagram.com/legacy.cat/" img="/images/instagram.webp" title={t('check on instagram')} width={32} height={32} />
            <LinkImage className="ml15" url="https://x.com/Lliga_Legacy" img="/images/x.webp" title={t('check on x')} width={32} height={32} />
            <LinkImage className="ml15" url="https://www.youtube.com/@catmagiclegacy" img="/images/youtube.webp" title={t('check on youtube channel - mtg - catmagiclegacy')} width={32} height={32} />
            <LinkImage className="ml15" url="https://www.twitch.tv/catmagiclegacy" img="/images/twitch.webp" title={t('check on twitch channel - mtg - catmagiclegacy')} width={32} height={32} />
        </section>
    );
}

export default SocialLinksFooter;