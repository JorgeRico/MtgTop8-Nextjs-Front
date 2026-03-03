import SocialLogoFooter from '@/components/Footer/Social/Logo';
import SocialDescriptionFooter from '@/components/Footer/Social/Description';
import SocialLinksFooter from '@/components/Footer/Social/Links';
// import Language from "/src/components/Language";
// import Subtitle from '/src/components/HTag/SubTitle';
// import HTag from "/src/components/HTag";
// import { useTranslation } from 'react-i18next';

export default function SocialFooter() {
    // const { t } = useTranslation();

    return (
        <>
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
                                {/* <Subtitle title={t('footer.Follow us')} /> */}
                                <SocialLinksFooter></SocialLinksFooter>
                            </div>
                            <div className="padfooter">
                                {/* <HTag Tag="p" text={`${t('footer.Change language')}:`} className="left w100"></HTag> */}
                                {/* <div className="left languages">
                                    <Language></Language>
                                </div> */}
                            </div>                            
                        </section>
                    </div>
                </article>
            </section>
        </>
    );
}