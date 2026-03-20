import endpoints from "@/types/server/endpoints";
import { replaceUrlIdParam } from '@/hooks/useApi';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LeagueComponent from './component';
import { seo_tags } from '@/components/Seo';
import { baseUrl } from "@/types/server/baseUrl";

interface MetadataProps {
    params: Promise<{ locale: string, id: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale, id } = await params;
    const t              = await getTranslations({ locale, namespace: 'seo-tags' });

    const res            = await fetch(replaceUrlIdParam(endpoints.API_LEAGUE_ID, id));
    const data           = await res.json();

    const url            = `${baseUrl}/leagues/${id}`;
    const title          = `${t('leagues.title')} | ${data.name}`;
    const description    = t('leagues.description');

    return seo_tags(title, description, url);
}

const League: React.FC = () => {
    return (
        <LeagueComponent></LeagueComponent>
    );
}

export default League;