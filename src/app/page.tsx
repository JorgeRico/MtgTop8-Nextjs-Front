// import Page from '../../.next/dev/types/routes';
import SimpleBreadcrumb from '@/components/Breadcrumb/Simple';
import { useTranslations } from 'next-intl';
import Title from '@/components/HTag/Title';

export default function Home() {
    const t = useTranslations('home');

                    
                    // <CurrentEvents title={t('seo-tags.home.Current Leagues')}></CurrentEvents>
                    
                    // <PastEvents title={t('seo-tags.home.Past Leagues')}></PastEvents> 

    return (
        <main className="left w100">
            <SimpleBreadcrumb isHome={true} />
            <Title title={t('text-title')} />
            <p className="color-gray mb40">{t('text-description')}</p>
        </main>
    );
}