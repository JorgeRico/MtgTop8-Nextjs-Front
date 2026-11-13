const assetSocialPathPrefix = "/images/social";

const socialLinks = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/legacy.cat/",
        icon: `${assetSocialPathPrefix}/instagram.svg`,
        className: "h-[27.5px] w-[23px]",
        name: "Instagram",
        detail: "@legacy.cat",
        label_footer: "PHOTOS",
        iconWidth: 23,
        iconHeight: 28,
        accent: "#ffb690",
        tint: "rgba(255, 182, 144, 0.2)",
        nodeId: "40:343",
        class_name: "social-instagram"
    },
    {
        label: "X",
        href: "https://x.com/Lliga_Legacy",
        icon: `${assetSocialPathPrefix}/twitter.svg`,
        className: "h-[26px] w-[21.5px]",
        name: "X / Twitter",
        detail: "@Lliga_Legacy",
        label_footer: "PAIRINGS",
        iconWidth: 23,
        iconHeight: 28,
        accent: "#06b6d4",
        tint: "rgba(6, 182, 212, 0.2)",
        nodeId: "40:354",
        class_name: "social-twitter"
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@catmagiclegacy",
        icon: `${assetSocialPathPrefix}/youtube.svg`,
        className: "h-[26px] w-[23px]",
        name: "YouTube",
        detail: "Match Archives",
        label_footer: "VODS",
        iconWidth: 23,
        iconHeight: 28,
        accent: "#ef4444",
        tint: "rgba(239, 68, 68, 0.2)",
        nodeId: "40:332",
        class_name: "social-youtube"
    },
    {
        label: "Twitch",
        href: "https://www.twitch.tv/catmagiclegacy",
        icon: `${assetSocialPathPrefix}/twitch.svg`,
        className: "h-[27.5px] w-[23px]",
        name: "Twitch",
        detail: "@catmagiclegacy",
        label_footer: "STREAM",
        iconWidth: 23,
        iconHeight: 28,
        accent: "#d0bcff",
        tint: "rgba(208, 188, 255, 0.2)",
        nodeId: "40:321",
        class_name: "social-twitch"
    },
];

export default socialLinks;