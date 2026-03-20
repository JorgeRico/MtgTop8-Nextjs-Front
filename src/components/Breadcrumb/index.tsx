import { BreadcrumbLoadingType } from "@/types/schemas/website/breadcrumb";

const Breadcrumb: React.FC<BreadcrumbLoadingType> = ({ component, loading }) => {
    return (
        <section className={`left w100 f14 ${loading === false ? 'blink blured' : ''}`}>
            {component}
        </section>
    );
}

export default Breadcrumb;