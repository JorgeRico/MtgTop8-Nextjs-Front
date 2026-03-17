import SimpleBreadcrumb from '@/components/Breadcrumb/Simple';
import { useTranslations } from 'next-intl';
import Title from '@/components/HTag/Title';
import CurrentEvents from "@/app/_events/current";
import PastEvents from "@/app/_events/past";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { defaultOg } from '@/components/Seo';

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale } = await params;
    const t          = await getTranslations({ locale, namespace: 'home' });
    const baseUrl    = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app';

    return {
        title       : t('title'),
        description : t('description'),
        openGraph   : {
            title       : t('title'),
            description : t('description'),
            url         : baseUrl,
            type        : "website",
            ...defaultOg,
        }
    }
}

const Home = () => {
    const t = useTranslations('home');

    return (
        <main className="left w100">
            <SimpleBreadcrumb isHome={true} />
            <Title title={t('text-title')} />
            <p className="color-gray mb40">{t('text-description')}</p>
            <CurrentEvents title={t('Current Leagues')}></CurrentEvents>
            <PastEvents title={t('Past Leagues')}></PastEvents>
        </main>
    );
}

export default Home;