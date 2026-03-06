import Title from "@/components/HTag/Title";
import SimpleBreadcrumb from "@/components/Breadcrumb/Simple";
import { useTranslations } from 'next-intl';

function NotFound() {
    const t = useTranslations('seo-tags');

    return (
        <>
            <SimpleBreadcrumb title={t('not-found.breadcrumb')} />
            <Title title={t('not-found.text-title')} />
            <p className="mb40 color-gray">{t('not-found.text-description')}</p>
        </>
    );
}

export default NotFound;