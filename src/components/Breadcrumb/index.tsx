import Link from "next/link";
import { Fragment } from "react";

import { BreadcrumbNavType } from "@/types/schemas/website/breadcrumb";

const BreadcrumbNav = ({ ariaLabel = "Breadcrumb", className = "", items }: BreadcrumbNavType) => {
    return (
        <nav aria-label={ariaLabel} className={`breadcrumb-nav ${className}`.trim()}>
            {items.map((item, index) => {
                const isCurrent = index === items.length - 1;

                return (
                    <Fragment key={`${item.label}-${index}`}>
                        {index > 0 && <span aria-hidden="true" className="breadcrumb-nav__sep">/</span>}
                        {item.href && !isCurrent ? (
                            <Link className="breadcrumb-nav__link" href={item.href}>
                                {item.icon && <span className="material-symbols-outlined">{item.icon}</span>}
                                <span>{item.label}</span>
                            </Link>
                        ) : (
                            <span aria-current={isCurrent ? "page" : undefined} className={isCurrent ? "breadcrumb-nav__current" : "breadcrumb-nav__label"}>
                                {item.label}
                            </span>
                        )}
                    </Fragment>
                );
            })}
        </nav>
    );
};

export default BreadcrumbNav;
