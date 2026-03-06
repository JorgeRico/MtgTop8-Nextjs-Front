import ImageLink from "@/components/Link/ImageLink";
import endpoints from "@/services/endpoints";
import "./module.css";

const HomeItemBreadcrumb: React.FC = () => {

    return (
        <div className="left homeIcon">
            <ImageLink
                url       = {endpoints.API_HOME}
                img       = "/images/home.webp"
                width     = {19}
                height    = {19}
                className = "invertColor"
            />
        </div>
    );
}

export default HomeItemBreadcrumb;