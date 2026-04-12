import ImageLink from "@/components/Link/Link";
import endpoints from "@/types/server/endpoints";

const HomeItemBreadcrumb: React.FC = () => {

    return (
        <div className="left homeIcon">
            <ImageLink
                url       = {endpoints.API_HOME}
                img       = "/images/home.webp"
                width     = {19}
                height    = {19}
                className = "invertColor"
                title     = ""
            />
        </div>
    );
}

export default HomeItemBreadcrumb;