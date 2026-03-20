import HomeItemBreadcrumb from "@/components/Breadcrumb/Items/Home";
import TitleItemBreadcrumb from "@/components/Breadcrumb/Items/Title";
import DashItemBreadcrumb from "@/components/Breadcrumb/Items/Dash";
import { useTranslations } from 'next-intl';
import { TitleType } from "@/types/schemas/website/title";

const BreadcrumbLeague: React.FC<TitleType> = ({ title }) => {
    const t = useTranslations('header');

    return (
        <section>
            <HomeItemBreadcrumb></HomeItemBreadcrumb>
            <DashItemBreadcrumb></DashItemBreadcrumb>
            <TitleItemBreadcrumb title={t('breadcrumb.league')}></TitleItemBreadcrumb>
            <DashItemBreadcrumb></DashItemBreadcrumb>
            <TitleItemBreadcrumb title={title}></TitleItemBreadcrumb>
        </section>
    );
}

export default BreadcrumbLeague;