import "./../module.css";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { ErrorMessageFormType } from "@/types/forms";

const ErrorMessage: React.FC<ErrorMessageFormType> = ({ message }) => {
    const t    = useTranslations('errors');
    const tags = useTranslations('alt-tags');

    return (
        <div className="left w100 mb40">
            <div className="left">
                <Image
                    className="alert"
                    src="/images/error-mail.webp"
                    alt={tags('mtg stats')}
                    title={tags('mtg stats')}
                    priority
                />
            </div>
            <div className="left mt15 ml25 w50">
                <div className="left w100 mb20">{message}</div>
                <div className="left w100">{t('contact.Pay 3 extra manas and try again.')}</div>
            </div>
        </div>
    )
}

export default ErrorMessage;