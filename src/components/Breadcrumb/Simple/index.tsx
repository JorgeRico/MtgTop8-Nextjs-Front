import HomeItemBreadcrumb from "@/components/Breadcrumb/Items/Home";
import TitleItemBreadcrumb from "@/components/Breadcrumb/Items/Title";
import DashItemBreadcrumb from "@/components/Breadcrumb/Items/Dash";

type MyComponentProps = {
    title  : string;
    isHome : boolean;
};

const SimpleBreadcrumb: React.FC<MyComponentProps> = ({ title = null, isHome = false }) => {
    return (
        <section className="left w100 f14 mb40">
            {!isHome &&
                <HomeItemBreadcrumb></HomeItemBreadcrumb>
                // <DashItemBreadcrumb></DashItemBreadcrumb>
                // <TitleItemBreadcrumb title={title}></TitleItemBreadcrumb>
            }
        </section>
    );
}

export default SimpleBreadcrumb;