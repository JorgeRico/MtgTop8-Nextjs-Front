import endpoints from "@/types/endpoints";
import { replaceUrlIdParam } from '@/hooks/useApi';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LeagueComponent from './component';

interface MetadataProps {
    params: Promise<{ locale: string, id: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale, id } = await params;
    const t              = await getTranslations({ locale, namespace: 'seo-tags' });

    const res  = await fetch(replaceUrlIdParam(endpoints.API_LEAGUE_ID, id));
    const data = await res.json();

    return {
        title       : `${t('leagues.title')}: ${data.name}`,
        description : t('leagues.description'),
        openGraph   : {
            title       : `${t('leagues.title')}: ${data.name}`,
            description : t('leagues.description'),
            url         : new URL(process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app' + '/leagues/' + id)
        }
    }
}

const League: React.FC = () => {
    return (
        <LeagueComponent></LeagueComponent>
    );
}

export default League;