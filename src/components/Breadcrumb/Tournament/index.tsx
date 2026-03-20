import HomeItemBreadcrumb from "@/components/Breadcrumb/Items/Home";
import TitleItemBreadcrumb from "@/components/Breadcrumb/Items/Title";
import DashItemBreadcrumb from "@/components/Breadcrumb/Items/Dash";
import TitleLinkItemBreadcrumb from "@/components/Breadcrumb/Items/TitleLink";
import { useTranslations } from 'next-intl';
import { BreadcrumbTournamentType } from "@/types/schemas/website/breadcrumb";

const BreadcrumbTournament: React.FC<BreadcrumbTournamentType> = ({ title, date, endpoint }) => {
    const t = useTranslations('header');

    return (
        <section>
            <HomeItemBreadcrumb></HomeItemBreadcrumb>
            <DashItemBreadcrumb></DashItemBreadcrumb>
            <TitleItemBreadcrumb title={t('breadcrumb.league')}></TitleItemBreadcrumb>
            <DashItemBreadcrumb></DashItemBreadcrumb>
            <TitleLinkItemBreadcrumb title={title} endpoint={endpoint}></TitleLinkItemBreadcrumb>
            <DashItemBreadcrumb></DashItemBreadcrumb>
            <TitleItemBreadcrumb title={t('breadcrumb.tournament')}></TitleItemBreadcrumb>
            <DashItemBreadcrumb></DashItemBreadcrumb>
            <TitleItemBreadcrumb title={date}></TitleItemBreadcrumb>
        </section>
    );
}

export default BreadcrumbTournament;