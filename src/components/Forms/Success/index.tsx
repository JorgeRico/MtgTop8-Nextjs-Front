import "./../module.css";
import { useTranslations } from 'next-intl';
import Image from "next/image";

function SuccessMessage() {
    const t    = useTranslations('sucess');
    const tags = useTranslations('alt-tags');

    return (
        <div className="left w100 mb40 sendImage">
            <div className="left">
                <Image
                    className="alert invertColor mt10"
                    src="/images/mail_big.webp"
                    alt={tags('legacy mtg cat mail')}
                    title={tags('legacy mtg cat mail')}
                    priority
                />
            </div>
            <div className="left mt15 ml25 w50">
                <div className="left w100 mb20">{t('Thank you for contacting us,')}</div>
                <div className="left w100">{t("Your query is in the stack. In response we'll play a brainstorm")}</div>
            </div>
        </div>
    )
}

export default SuccessMessage;