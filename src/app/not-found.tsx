import Title from "@/components/HTag/Title";
import SimpleBreadcrumb from "@/components/Breadcrumb/Simple";
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale } = await params;
    const t          = await getTranslations({ locale, namespace: 'not-found' });

    return {
        title       : t('title'),
        description : t('description'),
        openGraph   : {
            title       : t('title'),
            description : t('description'),
            url         : new URL(process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app' + '/not-found')
        }
    }
}

const NotFound = () => {
    const t = useTranslations('seo-tags');

    return (
        <main>
            <SimpleBreadcrumb title={t('not-found.breadcrumb')} />
            <Title title={t('not-found.text-title')} />
            <p className="mb40 color-gray">{t('not-found.text-description')}</p>
        </main>
    );
}

export default NotFound;