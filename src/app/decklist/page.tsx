import DecklistForm from "@/components/Forms/Decklist";
import Title from "@/components/HTag/Title";
import SimpleBreadcrumb from "@/components/Breadcrumb/Simple";
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { seo_tags } from '@/components/Seo';
import { baseUrl } from "@/types/server/baseUrl";

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale }  = await params;
    const t           = await getTranslations({ locale, namespace: 'decklist' });
    const url         = `${baseUrl}/decklist`;
    const title       = t('title');
    const description = t('description');

    return seo_tags(title, description, url);
}

const Decklist = () => {
    const t = useTranslations('decklist');

    return (
        <main className="left w100">
            <SimpleBreadcrumb title="decklist" />
            <Title title={t('text-title')} />
            <p className="mb40 color-gray">{t('text-description')}</p>
            <DecklistForm></DecklistForm>
        </main>
    );
}

export default Decklist;