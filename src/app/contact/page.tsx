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
    const t          = await getTranslations({ locale, namespace: 'contact' });

    const url = (process.env.NEXT_PUBLIC_BASE_WEBSITE_URL != undefined ? process.env.NEXT_PUBLIC_BASE_WEBSITE_URL : 'https://mtg-stats.vercel.app') + '/contact'

    return {
        title       : t('title'),
        description : t('description'),
        openGraph   : {
            title       : t('title'),
            description : t('description'),
            url         : new URL(url)
        }
    }
}

const Contact = () => {
    const t = useTranslations('contact');

    return (
        <main className="left w100">
            <SimpleBreadcrumb title={t('breadcrumb')} />
            <Title title={t('text-title')} />
            <p className="mb40 color-gray">{t('text-description')}</p>
            <ContactForm></ContactForm>
        </main>
    );
}

export default Contact;