"use client"

import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import "./../module.css";
import Success from "@/components/Forms/Success";
import Error from "@/components/Forms/Error";
import InputForm from "@/components/Forms/Input";
import { useTranslations } from 'next-intl';
import { SendObjectType } from "@/types/schemas/website/forms";

const Contact: React.FC = () => {
    const [ showButton, setShowButton ]   = useState<boolean>(true);
    const [ showSuccess, setShowSuccess ] = useState<boolean>(false);
    const [ showError, setShowError ]     = useState<boolean>(false);
    const [ toSend, setToSend ]           = useState<SendObjectType>({name: '', message: '', reply_to: '' });
    const [ mail_service ]                = useState<string>(process.env.NEXT_PUBLIC_MAIL_SERVICE_ID || '');
    const [ mail_template ]               = useState<string>(process.env.NEXT_PUBLIC_MAIL_TEMPLATE || '');
    const [ mail_public_key ]             = useState<string>(process.env.NEXT_PUBLIC_MAIL_PUBLIC_ID || '');
    const t                               = useTranslations('contact');
    const errors                          = useTranslations('errors');

    const onSubmit = (e) => {
        e.preventDefault();
        setShowButton(false);

        emailjs.send(mail_service, mail_template, toSend, mail_public_key)
            .then((response) => {
                setShowSuccess(true);
            })
            .catch((err) => {
                // console.log('FAILED...', err);
                setShowError(true);
                setTimeout(() => {setShowButton(true)}, 2000);
                setTimeout(() => {setShowError(false)}, 2000);
            });
    };

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <>
            <section className="left w100">
                {showSuccess == true ? (
                    <Success></Success>
                ) : (
                    <>
                        <form onSubmit={onSubmit} className="left mb40 overflowHidden form">
                            <InputForm
                                name         = "name"
                                type         = "text"
                                placeholder  = {t('Your name')}
                                label        = {t('Name')}
                                value        = {toSend.name}
                                handleChange = {handleChange}
                            />
                            <InputForm
                                name         = "reply_to"
                                type         = "email"
                                placeholder  = {t('Your email')}
                                label        = {t('E-mail')}
                                value        = {toSend.reply_to}
                                handleChange = {handleChange}
                            />
                            <div className="left mb20 w100">
                                <label className="left w100 mb15">{t('Message')}</label>
                                <textarea
                                    className   = "left w70 mb10 pad"
                                    name        = 'message'
                                    placeholder = {t('Your message')}
                                    value       = {toSend.message}
                                    onChange    = {handleChange}
                                    required
                                />
                            </div>

                            {showButton == true &&
                                <div className="left w100">
                                    <button className="pointer pad bg-red color-white" type='submit' aria-label={t('Submit')}>{t('Submit')}</button>
                                </div>
                            }

                            {showError == true &&
                                <Error message={errors('forms.Please, fill all data fields')}></Error>
                            }
                        </form>
                    </>
                )}
            </section>
        </>
    );
}

export default Contact;