import HeaderLogo from "@/components/Header/Logo";
import RightBlock from "@/components/Header/RightBlock";
import Language from "@/components/Language/LocaleSwitcher";
import endpoints from "@/types/endpoints";
import { useTranslations } from 'next-intl';

const Header: React.FC = () => {
    const t = useTranslations('header');

    return (
        <>
            <section className="overflowHidden container">
                <article className="left w100 overflowHidden header">
                    <HeaderLogo></HeaderLogo>
                    <div className="right padheader">
                        <div className="right">
                            <Language></Language>
                        </div>
                        <br></br>
                        <div className="right overflowHidden mt10 headerInfo">
                            <RightBlock image="/images/mail.webp" text={t('Contact us')} endpoint={endpoints.HTTP_CONTACT}></RightBlock>
                            <RightBlock image="/images/cards.webp" text={t('Decklist')} endpoint={endpoints.HTTP_DECKLIST}></RightBlock>
                        </div>
                    </div>
                </article>
            </section>
            <div className="left w100 topLine"></div>
        </>
    );
}

export default Header;