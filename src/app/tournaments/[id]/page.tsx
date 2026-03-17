import endpoints from "@/types/endpoints";
import { replaceUrlIdParam } from '@/hooks/useApi';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TournamentComponent from "./component";

interface MetadataProps {
    params: Promise<{ locale: string, id: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale, id } = await params;
    const t              = await getTranslations({ locale, namespace: 'seo-tags' });

    const res  = await fetch(replaceUrlIdParam(endpoints.API_TOURNAMENT_DATA, id));
    const data = await res.json();

    const url = (process.env.NEXT_PUBLIC_BASE_WEBSITE_URL ? process.env.NEXT_PUBLIC_BASE_WEBSITE_URL : 'https://mtg-stats.vercel.app') + '/tournaments/' + id

    return {
        title       : `${t('tournaments.title')} | ${data.name} - ${data.date}`,
        description : t('tournaments.description'),
        openGraph   : {
            title       : `${t('tournaments.title')} | ${data.name} - ${data.date}`,
            description : t('tournaments.description'),
            url         : new URL(url)
        }
    }
}

const Tournament: React.FC = () => {
    return (
        <TournamentComponent></TournamentComponent>
    );
}

export default Tournament;