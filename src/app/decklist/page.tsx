import DecklistForm from "@/components/Forms/Decklist";
import Title from "@/components/HTag/Title";
import SimpleBreadcrumb from "@/components/Breadcrumb/Simple";
import { useTranslations } from 'next-intl';

function Decklist() {
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