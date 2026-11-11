import endpoints from "@/types/server/endpoints";
import { replaceUrlIdParam } from '@/hooks/useApi';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LeagueComponent from './component';
import { seo_tags } from '@/components/Seo';
import { baseUrl } from "@/types/server/baseUrl";
import { LeagueType, AveragePlayersLeague } from "@/types/schemas/database/league";

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

interface PageProps {
    params: Promise<{ locale: string, id: string }>
}

export default async function LeaguePage({ params }: PageProps) {
    const { id } = await params;

    const [leagueRes, avgRes] = await Promise.all([
        fetch(replaceUrlIdParam(endpoints.API_LEAGUE_ID, id)),
        fetch(replaceUrlIdParam(endpoints.API_LEAGUE_ID_AVERAGE, id))
    ]);

    const league: LeagueType = await leagueRes.json();
    const average: AveragePlayersLeague = await avgRes.json();

    return (
        <LeagueComponent
            id={id}
            initialLeague={league}
            initialAverage={average.average}
        />
    );
}
