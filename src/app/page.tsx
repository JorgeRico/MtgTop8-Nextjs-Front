import HomeComponent from "@/app/_home/index";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { seo_tags } from '@/components/Seo';
import { baseUrl } from '@/types/server/baseUrl';

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale }  = await params;
    const t           = await getTranslations({ locale, namespace: 'home' });
    const title       = t('title');
    const description = t('description');

    return seo_tags(title, description, baseUrl);
}

const Home = () => {
    return (
        <HomeComponent></HomeComponent>
    );
}

export default Home;