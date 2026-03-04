import SocialLogoFooter from '@/components/Footer/Social/Logo';
import SocialDescriptionFooter from '@/components/Footer/Social/Description';
import SocialLinksFooter from '@/components/Footer/Social/Links';
import Language from "@/components/Language/LocaleSwitcher.tsx";
import Subtitle from '@/components/HTag/SubTitle';
import HTag from "@/components/HTag";
import { useTranslations } from 'next-intl';

const SocialFooter: React.FC = () => {
    const t = useTranslations('footer');

    return (
        <section className="footer overflowHidden bg-footer">
            <article className="container">
                <div className="social-container p20 overflowHidden">
                    <section className="social-item mb20">
                        <div className="padfooter">
                            <SocialLogoFooter></SocialLogoFooter>
                        </div>
                        <div className="overflowHidden padfooter">
                            <SocialDescriptionFooter></SocialDescriptionFooter>
                        </div>
                    </section>
                    <section className="social-item">
                        <div className="padfooter">
                            <Subtitle title={t('Follow us')} />
                            <SocialLinksFooter></SocialLinksFooter>
                        </div>
                        <div className="padfooter">
                            <HTag Tag="p" text={`${t('Change language')}:`} className="left w100"></HTag>
                            <div className="left languages">
                                <Language></Language>
                            </div>
                        </div>
                    </section>
                </div>
            </article>
        </section>
    );
}

export default SocialFooter;