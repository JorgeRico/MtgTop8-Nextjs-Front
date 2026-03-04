import HomeItemBreadcrumb from "@/components/Breadcrumb/Items/Home";
import TitleItemBreadcrumb from "@/components/Breadcrumb/Items/Title";
import DashItemBreadcrumb from "@/components/Breadcrumb/Items/Dash";
import TitleLinkItemBreadcrumb from "@/components/Breadcrumb/Items/TitleLink";
import { useTranslations } from 'next-intl';

type MyComponentProps = {
    title    : string;
    date     : string;
    endpoint : number;
};

const BreadcrumbTournament: React.FC<MyComponentProps> = ({ title, date, endpoint }) => {
    const t = useTranslations('header');

    return (
        <HomeItemBreadcrumb></HomeItemBreadcrumb>
        <DashItemBreadcrumb></DashItemBreadcrumb>
        <TitleItemBreadcrumb title={t('breadcrumb.league')}></TitleItemBreadcrumb>
        <DashItemBreadcrumb></DashItemBreadcrumb>
        <TitleLinkItemBreadcrumb title={title} endpoint={endpoint}></TitleLinkItemBreadcrumb>
        <DashItemBreadcrumb></DashItemBreadcrumb>
        <TitleItemBreadcrumb title={t('breadcrumb.tournament')}></TitleItemBreadcrumb>
        <DashItemBreadcrumb></DashItemBreadcrumb>
        <TitleItemBreadcrumb title={date}></TitleItemBreadcrumb>
    );
}

export default BreadcrumbTournament;