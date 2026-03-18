import endpoints from "@/types/endpoints";
import { replaceUrlIdParam } from '@/hooks/useApi';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TournamentComponent from "./component";
import { seo_tags } from '@/components/Seo';
import { baseUrl } from "@/types/baseUrl";

interface MetadataProps {
    params: Promise<{ locale: string, id: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale, id } = await params;
    const t              = await getTranslations({ locale, namespace: 'seo-tags' });

    const res            = await fetch(replaceUrlIdParam(endpoints.API_TOURNAMENT_DATA, id));
    const data           = await res.json();

    const url            = `${baseUrl}/tournaments/${id}`;
    const title          = `${t('tournaments.title')} | ${data.name} - ${data.date}`;
    const description    = t('tournaments.description');

    return seo_tags(title, description, url);
}

const Tournament: React.FC = () => {
    return (
        <TournamentComponent></TournamentComponent>
    );
}

export default Tournament;