import endpoints from "@/types/endpoints";
import { replaceUrlIdParam } from '@/hooks/useApi';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TournamentComponent from "./component";
import { defaultOpenGraph } from '@/components/Seo';

interface MetadataProps {
    params: Promise<{ locale: string, id: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale, id } = await params;
    const t              = await getTranslations({ locale, namespace: 'seo-tags' });

    const res  = await fetch(replaceUrlIdParam(endpoints.API_TOURNAMENT_DATA, id));
    const data = await res.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app';
    const url     = `${baseUrl}/tournaments/${id}`;

    return {
        title       : `${t('tournaments.title')} | ${data.name} - ${data.date}`,
        description : t('tournaments.description'),
        openGraph   : defaultOpenGraph(`${t('tournaments.title')} | ${data.name} - ${data.date}`, t('tournaments.description'), url),
    }
}

const Tournament: React.FC = () => {
    return (
        <TournamentComponent></TournamentComponent>
    );
}

export default Tournament;