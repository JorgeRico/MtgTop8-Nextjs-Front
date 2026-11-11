import endpoints from "@/types/server/endpoints";
import { replaceUrlIdParam } from '@/hooks/useApi';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TournamentComponent from "./component";
import { seo_tags } from '@/components/Seo';
import { baseUrl } from "@/types/server/baseUrl";
import { TournamentType } from "@/types/schemas/database/tournament";

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

interface PageProps {
    params: Promise<{ locale: string, id: string }>
}

export default async function TournamentPage({ params }: PageProps) {
    const { id } = await params;

    const res = await fetch(replaceUrlIdParam(endpoints.API_TOURNAMENT_DATA, id));
    const tournament: TournamentType = await res.json();

    return (
        <TournamentComponent
            id={id}
            initialTournament={tournament}
        />
    );
}
