"use client";

import { useTranslations } from "next-intl";

type Platform = "twitch" | "twitter" | "youtube" | "instagram";

const platformData: Record<Platform, {
  href: string;
  icon: string;
  bg: string;
  fg: string;
  labelKey: string;
  detailKey: string;
}> = {
  twitch: {
    href: "https://twitch.tv/catmagiclegacy",
    icon: "live_tv",
    bg: "rgba(145,70,255,0.2)",
    fg: "#9146FF",
    labelKey: "social_twitch",
    detailKey: "social_twitch_detail",
  },
  twitter: {
    href: "https://x.com/Lliga_Legacy",
    icon: "tag",
    bg: "#2A3649",
    fg: "#06B6D4",
    labelKey: "social_twitter",
    detailKey: "social_twitter_detail",
  },
  youtube: {
    href: "https://youtube.com/@catmagiclegacy",
    icon: "smart_display",
    bg: "rgba(239,68,68,0.2)",
    fg: "#EF4444",
    labelKey: "social_youtube",
    detailKey: "social_youtube_detail",
  },
  instagram: {
    href: "https://instagram.com/legacy.cat",
    icon: "photo_camera",
    bg: "rgba(249,115,22,0.2)",
    fg: "#FFB690",
    labelKey: "social_instagram",
    detailKey: "social_instagram_detail",
  },
};

const Social = () => {
  const t = useTranslations("contact");

  return (
    <div className="contact-card">
      <h2 className="contact-card__title contact-card__title--gold">
        <span className="material-symbols-outlined">hub</span>
        {t("official_channels")}
      </h2>

      <div className="contact-social-list">
        {Object.keys(platformData).map((platform) => {
          const data = platformData[platform as Platform];

          return (
            <a
              key={platform}
              className="contact-social"
              href={data.href}
              rel="noreferrer"
              target="_blank"
            >
              <span className="contact-social__lead">
                <span
                  className="contact-social__icon"
                  style={{ background: data.bg, color: data.fg }}
                >
                  <span className="material-symbols-outlined">{data.icon}</span>
                </span>
                <span className="contact-social__copy">
                  <span className="contact-social__name">{t(data.labelKey)}</span>
                  <span className="contact-social__detail">{t(data.detailKey)}</span>
                </span>
              </span>
              <span className="material-symbols-outlined contact-social__external">
                open_in_new
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Social;
