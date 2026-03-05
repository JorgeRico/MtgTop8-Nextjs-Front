"use client"

import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import "./../module.css";
import Success from "@/components/Forms/Success";
import Error from "@/components/Forms/Error";
import InputForm from "@/components/Forms/Contact/Input";
import { useTranslations } from 'next-intl';

const Contact: React.FC = () => {
    const [ showButton, setShowButton ]   = useState(true);
    const [ showSuccess, setShowSuccess ] = useState(false);
    const [ showError, setShowError ]     = useState(false);
    const [ toSend, setToSend ]           = useState({name: '', message: '', reply_to: '' });
    const mail_service                    = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID;
    const mail_template                   = process.env.NEXT_PUBLIC_MAIL_TEMPLATE;
    const mail_public_key                 = process.env.NEXT_PUBLIC_MAIL_PUBLIC_ID;
    const form                            = useRef();
    const t                               = useTranslations('forms');
    const errors                          = useTranslations('errors');

    const onSubmit = (e) => {
        e.preventDefault();
        setShowButton(false);

        emailjs.sendForm(mail_service, mail_template, form.current, mail_public_key)
            .then((response) => {
                // console.log('SUCCESS!', response.status, response.text);
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
                    <>
                        <Success></Success>
                    </>
                ) : (
                    <>
                        <form ref={form} onSubmit={onSubmit} className="left w100 mb40 overflowHidden form contact">
                            <InputForm name="name" type="text" placeholder={t('contact.Your name')} label={t('contact.Name')} value={toSend.name} handleChange={handleChange}></InputForm>
                            <InputForm name="reply_to" type="email" placeholder={t('contact.Your email')} label={t('contact.E-mail')} value={toSend.reply_to} handleChange={handleChange}></InputForm>
                            <div className="left mb20 w100">
                                <label className="left w100 mb15">{t('contact.Message')}</label>
                                <textarea
                                    className="left w70 mb10 pad"
                                    name='message'
                                    placeholder={t('contact.Your message')}
                                    value={toSend.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {showButton == true &&
                                <div className="left w100">
                                    <button className="pointer pad bg-red color-white" type='submit'>{t('contact.Submit')}</button>
                                </div>
                            }

                            {showError == true &&
                                <Error message={errors('contact.Please, fill all data fields.')}></Error>
                            }
                        </form>
                    </>
                )}
            </section>
        </>
    );
}

export default Contact;