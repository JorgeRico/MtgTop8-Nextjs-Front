import ContactForm from "@/components/Forms/Contact";
import Title from "@/components/HTag/Title";
import SimpleBreadcrumb from "@/components/Breadcrumb/Simple";
import { useTranslations } from 'next-intl';

const Contact = () => {
    const t = useTranslations('seo-tags');

    return (
        <main className="left w100">
            <SimpleBreadcrumb title={t('contact-form.breadcrumb')} />
            <Title title={t('contact-form.text-title')} />
            <p className="mb40 color-gray">{t('contact-form.text-description')}</p>
            <ContactForm></ContactForm>
        </main>
    );
}

export default Contact;