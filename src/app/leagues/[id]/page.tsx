import endpoints from "@/types/endpoints";
import { replaceUrlIdParam } from '@/hooks/useApi';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LeagueComponent from './component';
import { defaultOpenGraph } from '@/components/Seo';

interface MetadataProps {
    params: Promise<{ locale: string, id: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale, id } = await params;
    const t              = await getTranslations({ locale, namespace: 'seo-tags' });

    const res  = await fetch(replaceUrlIdParam(endpoints.API_LEAGUE_ID, id));
    const data = await res.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app';
    const url     = `${baseUrl}/leagues/${id}`;

    return {
        title       : `${t('leagues.title')} | ${data.name}`,
        description : t('leagues.description'),
        openGraph   : defaultOpenGraph(`${t('leagues.title')} | ${data.name}`, t('leagues.description'), url),
    }
}

const League: React.FC = () => {
    return (
        <LeagueComponent></LeagueComponent>
    );
}

export default League;