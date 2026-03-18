import Title from "@/components/HTag/Title";
import SimpleBreadcrumb from "@/components/Breadcrumb/Simple";
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { seo_tags } from '@/components/Seo';
import { baseUrl } from "@/types/baseUrl";

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale }  = await params;
    const t           = await getTranslations({ locale, namespace: 'not-found' });
    const url         = `${baseUrl}/not-found`;
    const title       = t('title');
    const description = t('description');

    return seo_tags(title, description, url);
}

const NotFound = () => {
    const t = useTranslations('not-found');

    return (
        <main>
            <SimpleBreadcrumb title={t('breadcrumb')} />
            <Title title={t('text-title')} />
            <p className="mb40 color-gray">{t('text-description')}</p>
        </main>
    );
}

export default NotFound;