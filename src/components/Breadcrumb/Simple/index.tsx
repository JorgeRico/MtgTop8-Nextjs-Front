import HomeItemBreadcrumb from "@/components/Breadcrumb/Items/Home";
import TitleItemBreadcrumb from "@/components/Breadcrumb/Items/Title";
import DashItemBreadcrumb from "@/components/Breadcrumb/Items/Dash";
import { BreadcrumbSimpleType } from "@/types/schemas/website/breadcrumb";

const SimpleBreadcrumb = ({ title, isHome = false }: BreadcrumbSimpleType) => {
    return (
        <section className={!isHome ? "left w100 f14 mb40" : "left w100 f14 mb20"}>
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