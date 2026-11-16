"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const Faq = ({
  items,
}: {
  items: FaqItem[];
}) => {
  const t = useTranslations("contact");
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    items.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleFaq = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="contact-card">
      <div className="contact-card__title contact-card__title--gold">
        <span className="material-symbols-outlined">quiz</span>
        {t("frequently_asked")}
      </div>

      <div className="contact-faq-list">
        {items.map((item) => (
          <div className="contact-faq" key={item.id}>
            <button
              aria-expanded={expanded[item.id]}
              className="contact-faq__trigger"
              onClick={() => toggleFaq(item.id)}
              type="button"
            >
              <span className="contact-faq__question">{item.question}</span>
              <span className="material-symbols-outlined contact-faq__icon">
                {expanded[item.id] ? "expand_less" : "expand_more"}
              </span>
            </button>
            {expanded[item.id] && (
              <div className="contact-faq__answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
