// import HeaderLogo from "@components/Header/Logo";
// import RightBlock from "/src/components/Header/RightBlock";
// import Mail from "/src/assets/images/mail.webp";
// import Cards from "/src/assets/images/cards.webp";
// import endpoints from "/src/services/endpoints.jsx";
// import Language from "./components/Language/LocaleSwitcher";
// import { useTranslation } from 'react-i18next';

export default function Header() {
    // const { t } = useTranslation();

    return (
        <>
            <section className="overflowHidden container">
                <article className="left w100 overflowHidden header">
                    {/* <HeaderLogo></HeaderLogo> */}
                    <div className="right padheader">
                        <div className="right">
                            {/* <Language></Language> */}
                        </div>
                        <br></br>
                        <div className="right overflowHidden mt10 headerInfo">
                            {/* <RightBlock image={Mail} text={t('header.Contact us')} endpoint={endpoints.HTTP_CONTACT}></RightBlock>
                            <RightBlock image={Cards} text={t('header.Decklist')} endpoint={endpoints.HTTP_DECKLIST}></RightBlock> */}
                            bloque
                        </div>
                    </div>
                </article>
            </section>
            <div className="left w100 topLine"></div>
        </>
    );
}