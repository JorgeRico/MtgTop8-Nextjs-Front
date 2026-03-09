import DecklistForm from "@/components/Forms/Decklist";
import Title from "@/components/HTag/Title";
import SimpleBreadcrumb from "@/components/Breadcrumb/Simple";
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface MetadataProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({params,}: MetadataProps): Promise<Metadata> {
    const { locale } = await params;
    const t          = await getTranslations({ locale, namespace: 'seo-tags' });

    return {
        title       : t('decklist-form.title'),
        description : t('decklist-form.description')
    }
}

const Decklist = () => {
    const t = useTranslations('seo-tags');

    return (
        <main className="left w100">
            <SimpleBreadcrumb title="decklist" />
            <Title title={t('decklist-form.text-title')} />
            <p className="mb40 color-gray">{t('decklist-form.text-description')}</p>
            <DecklistForm></DecklistForm>
        </main>
    );
}

export default Decklist;