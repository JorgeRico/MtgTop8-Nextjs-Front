import "./../module.css";
import { useTranslations } from 'next-intl';
import Image from "next/image";

const SuccessMessage: React.FC = () => {
    const success = useTranslations('success');
    const alttags = useTranslations('alt-tags');

    return (
        <div className="left w100 mb40 sendImage">
            <div className="left">
                <Image
                    width     = {100}
                    height    = {80}
                    className = "alert invertColor mt10"
                    src       = "/images/mail_big.webp"
                    alt       = {alttags('legacy mtg cat mail')}
                    title     = {alttags('legacy mtg cat mail')}
                    priority
                />
            </div>
            <div className="left mt15 ml25 w50">
                <div className="left w100 mb20">{success('Thank you for contacting us')}</div>
                <div className="left w100">{success("Your query is in the stack In response we'll play a brainstorm")}</div>
            </div>
        </div>
    )
}

export default SuccessMessage;