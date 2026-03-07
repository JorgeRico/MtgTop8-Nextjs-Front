import HomeItemBreadcrumb from "@/components/Breadcrumb/Items/Home";
import TitleItemBreadcrumb from "@/components/Breadcrumb/Items/Title";
import DashItemBreadcrumb from "@/components/Breadcrumb/Items/Dash";
import { BreadcrumbSimpleType } from "@/types/breadcrumb";

const SimpleBreadcrumb: React.FC<BreadcrumbSimpleType> = ({ title, isHome = false }) => {
    return (
        <section className="left w100 f14 mb40">
            {!isHome && (
                <>
                    <HomeItemBreadcrumb></HomeItemBreadcrumb>
                    <DashItemBreadcrumb></DashItemBreadcrumb>
                    {title &&
                        <TitleItemBreadcrumb title={title}></TitleItemBreadcrumb>
                    }
                </>
            )}
        </section>
    );
}

export default SimpleBreadcrumb;