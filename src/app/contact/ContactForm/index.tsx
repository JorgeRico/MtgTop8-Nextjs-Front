"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import FaqQuestions from "@/app/contact/Faq";
import Breadcrumb from "@/app/contact/Breadcrumb";
import Social from "@/app/contact/Social";
import { faqItems } from "@/app/contact/faqItems";

type FieldName = "fullName" | "emailAddr" | "topicSelect" | "inquiryMessage";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const Contact = () => {
    const t = useTranslations("contact");
    const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

    const validate = (field: FieldName, value: string): string | undefined => {
        const trimmed = value.trim();

        switch (field) {
            case "fullName":
                if (!trimmed) return t("error_name_required");
                if (trimmed.length < 2) return t("error_name_short");
                return undefined;
            case "emailAddr":
                if (!trimmed) return t("error_email_required");
                if (!EMAIL_PATTERN.test(trimmed)) return t("error_email_invalid");
                return undefined;
            case "topicSelect":
                if (!trimmed) return t("error_topic_required");
                return undefined;
            case "inquiryMessage":
                if (!trimmed) return t("error_message_required");
                if (trimmed.length < 10) return t("error_message_short");
                return undefined;
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        const nextErrors: Partial<Record<FieldName, string>> = {};
        const fields: FieldName[] = ["fullName", "emailAddr", "topicSelect", "inquiryMessage"];

        fields.forEach((field) => {
            const message = validate(field, String(data.get(field) ?? ""));
            if (message) nextErrors[field] = message;
        });

        setErrors(nextErrors);

        const firstInvalid = fields.find((field) => nextErrors[field]);

        if (firstInvalid) {
            const element = form.elements.namedItem(firstInvalid);
            if (element instanceof HTMLElement) {
                element.focus();
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }

        const toast = document.getElementById("formSuccessToast");
        if (toast) {
            toast.removeAttribute("hidden");
            toast.scrollIntoView({ behavior: "smooth", block: "nearest" });
            setTimeout(() => {
                toast.setAttribute("hidden", "");
            }, 7000);
        }
    };

    const handleFieldChange = (field: FieldName, value: string) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const message = validate(field, value);
            const next = { ...prev };
            if (message) next[field] = message;
            else delete next[field];
            return next;
        });
    };

    const fieldProps = (field: FieldName) => ({
        "aria-invalid": errors[field] ? true : undefined,
        "aria-describedby": errors[field] ? `${field}-error` : undefined,
        onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            handleFieldChange(field, event.target.value),
    });

    const errorProps = (field: FieldName) =>
        errors[field] ? { id: `${field}-error` } : {};

    return (
        <main className="contact-shell">
            <div className="contact-content">
                <Breadcrumb />

                <header className="contact-header">
                    <div className="contact-badge">
                        <span className="contact-badge__dot"></span>
                        {t("organizer_helpdesk")}
                    </div>
                    <h1 className="contact-title">{t("contact_title")}</h1>
                    <p className="contact-lead">{t("contact_lead")}</p>
                </header>

                <div className="contact-grid">
                    <section className="contact-grid__main">
                        <div className="contact-card">
                            <div className="contact-card__accent"></div>

                            <form className="contact-form" noValidate onSubmit={handleFormSubmit}>
                                <div className="contact-form__grid contact-form__grid--2">
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="fullName">
                                            {t("full_name")} <span className="contact-label__required">*</span>
                                        </label>
                                        <input
                                            className="contact-input"
                                            id="fullName"
                                            name="fullName"
                                            placeholder={t("player_name")}
                                            required
                                            type="text"
                                            {...fieldProps("fullName")}
                                        />
                                        {errors.fullName && (
                                            <span className="contact-field__error" {...errorProps("fullName")}>
                                                <span className="material-symbols-outlined">error</span>
                                                {errors.fullName}
                                            </span>
                                        )}
                                    </div>
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="emailAddr">
                                            {t("email_address")} <span className="contact-label__required">*</span>
                                        </label>
                                        <input
                                            className="contact-input"
                                            id="emailAddr"
                                            name="emailAddr"
                                            placeholder="your_contact_email@domain.com"
                                            required
                                            type="email"
                                            {...fieldProps("emailAddr")}
                                        />
                                        {errors.emailAddr && (
                                            <span className="contact-field__error" {...errorProps("emailAddr")}>
                                                <span className="material-symbols-outlined">error</span>
                                                {errors.emailAddr}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="contact-form__grid contact-form__grid--2">
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="topicSelect">
                                            {t("inquiry_topic")} <span className="contact-label__required">*</span>
                                        </label>
                                        <select
                                            className="contact-select"
                                            defaultValue=""
                                            id="topicSelect"
                                            name="topicSelect"
                                            required
                                            {...fieldProps("topicSelect")}
                                        >
                                            <option disabled value="">{t("select_category")}</option>
                                            <option value="standings">{t("topic_standings")}</option>
                                            <option value="registration">{t("topic_registration")}</option>
                                            <option value="decklist">{t("topic_decklist")}</option>
                                            <option value="feedback">{t("topic_feedback")}</option>
                                        </select>
                                        {errors.topicSelect && (
                                            <span className="contact-field__error" {...errorProps("topicSelect")}>
                                                <span className="material-symbols-outlined">error</span>
                                                {errors.topicSelect}
                                            </span>
                                        )}
                                    </div>
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="leagueSelect">{t("target_stage")}</label>
                                        <select className="contact-select" defaultValue="general" id="leagueSelect" name="leagueSelect">
                                            <option value="general">{t("stage_general")}</option>
                                            <option value="valles">{t("stage_valles")}</option>
                                            <option value="minoria">{t("stage_minoria")}</option>
                                            <option value="ingenio">{t("stage_ingenio")}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="contact-field">
                                    <label className="contact-label" htmlFor="inquiryMessage">
                                        {t("message_details")} <span className="contact-label__required">*</span>
                                    </label>
                                    <textarea
                                        className="contact-textarea"
                                        id="inquiryMessage"
                                        name="inquiryMessage"
                                        placeholder={t("message_placeholder")}
                                        required
                                        rows={5}
                                        {...fieldProps("inquiryMessage")}
                                    />
                                    {errors.inquiryMessage && (
                                        <span className="contact-field__error" {...errorProps("inquiryMessage")}>
                                            <span className="material-symbols-outlined">error</span>
                                            {errors.inquiryMessage}
                                        </span>
                                    )}
                                </div>

                                <div className="contact-submit-row">
                                    <button className="contact-submit" type="submit">
                                        <span>{t("send_message")}</span>
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                    <div className="contact-response">
                                        <span className="material-symbols-outlined">verified</span>
                                        <span>{t("response_time")}</span>
                                    </div>
                                </div>

                                <div className="contact-toast" hidden id="formSuccessToast">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <div className="contact-toast__copy">
                                        <span className="contact-toast__title">{t("dispatch_success")}</span>
                                        <span className="contact-toast__detail">{t("dispatch_detail")}</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>

                    <aside className="contact-grid__aside contact-aside">
                        <Social />
                        <FaqQuestions items={faqItems} />
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default Contact;
