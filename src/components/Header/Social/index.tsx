"use client";

const assetSocialPathPrefix = "/images/social";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/legacy.cat/",
    icon: `${assetSocialPathPrefix}/4bfae.svg`,
    className: "h-[27.5px] w-[23px]",
  },
  {
    label: "X",
    href: "https://x.com/Lliga_Legacy",
    icon: `${assetSocialPathPrefix}/32e6c.svg`,
    className: "h-[26px] w-[21.5px]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@catmagiclegacy",
    icon: `${assetSocialPathPrefix}/f2f8b.svg`,
    className: "h-[26px] w-[23px]",
  },
  {
    label: "Twitch",
    href: "https://www.twitch.tv/catmagiclegacy",
    icon: `${assetSocialPathPrefix}/c10e6.svg`,
    className: "h-[27.5px] w-[23px]",
  },
];

function SocialLinks() {
  return (
    <nav
      aria-label="Social media"
      className="hidden items-center gap-1.5 rounded bg-[#121820] px-2.5 py-1 sm:flex"
    >
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          className={`relative block shrink-0 rounded-sm opacity-80 transition duration-200 hover:-translate-y-0.5 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${social.className}`}
        >
          <img src={social.icon} alt="" className="absolute inset-0 block size-full max-w-none" />
        </a>
      ))}
    </nav>
  );
}

export default SocialLinks;