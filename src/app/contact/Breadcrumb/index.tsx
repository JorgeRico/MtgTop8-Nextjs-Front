"use client";

import { useTranslations } from "next-intl";

const ContactBreadcrumb = () => {
    const t = useTranslations("contact");

    return (
        <nav className="contact-breadcrumb">
            <a href="/">
                <span className="material-symbols-outlined">home</span>
                <span>home</span>
            </a>
            <span className="contact-breadcrumb__sep">/</span>
            <span className="contact-breadcrumb__current">{t("contact_inquiries")}</span>
        </nav>
    );
};

export default ContactBreadcrumb;
