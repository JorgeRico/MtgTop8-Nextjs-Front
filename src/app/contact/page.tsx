import ContactForm from "@/components/Forms/Contact";
import Title from "@/components/HTag/Title";
import SimpleBreadcrumb from "@/components/Breadcrumb/Simple";
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale } = await params;
    const t          = await getTranslations({ locale, namespace: 'seo-tags' });

    return {
        title       : t('contact-form.title'),
        description : t('contact-form.description')
    }
}

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