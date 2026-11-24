import { seo_tags } from '@/components/Seo';
import { getTranslations } from 'next-intl/server';
import { baseUrl } from '@/types/server/baseUrl';
import ContactClient from '@/app/contact/ContactForm';
import "./modules.css";

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps) {
    const { locale }  = await params;
    const t           = await getTranslations({ locale, namespace: 'contact' });
    const url         = `${baseUrl}/contact`;
    const title       = t('title');
    const description = t('description');

    return seo_tags(title, description, url);
}

export default function Contact() {
    return <ContactClient />;
}