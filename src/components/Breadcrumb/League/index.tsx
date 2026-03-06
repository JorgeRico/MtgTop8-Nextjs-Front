import HomeItemBreadcrumb from "@/components/Breadcrumb/Items/Home";
import TitleItemBreadcrumb from "@/components/Breadcrumb/Items/Title";
import DashItemBreadcrumb from "@/components/Breadcrumb/Items/Dash";
import { useTranslations } from 'next-intl';

type MyComponentProps = {
    title : string;
};

const BreadcrumbLeague: React.FC<MyComponentProps> = ({ title }) => {
    const t = useTranslations('header');

    return (
        <>
            <HomeItemBreadcrumb></HomeItemBreadcrumb>
            <DashItemBreadcrumb></DashItemBreadcrumb>
            <TitleItemBreadcrumb title={t('breadcrumb.league')}></TitleItemBreadcrumb>
            <DashItemBreadcrumb></DashItemBreadcrumb>
            <TitleItemBreadcrumb title={title}></TitleItemBreadcrumb>
        </>
    );
}

export default BreadcrumbLeague;