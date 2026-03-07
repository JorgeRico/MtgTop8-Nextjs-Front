import SimpleBreadcrumb from '@/components/Breadcrumb/Simple';
import { useTranslations } from 'next-intl';
import Title from '@/components/HTag/Title';
import CurrentEvents from "@/app/_events/current";
import PastEvents from "@/app/_events/past";

const Home = () => {
    const t = useTranslations('home');

    return (
        <main className="left w100">
            <SimpleBreadcrumb isHome={true} />
            <Title title={t('text-title')} />
            <p className="color-gray mb40">{t('text-description')}</p>
            <CurrentEvents title={t('Current Leagues')}></CurrentEvents>
            <PastEvents title={t('Past Leagues')}></PastEvents>
        </main>
    );
}

export default Home;