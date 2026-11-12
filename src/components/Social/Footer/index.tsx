"use client";

import socialLinks from "@/types/social/social";

function SocialLink({
    href,
    icon,
    className,
    label,
}: (typeof socialLinks)[number]) {
    return (
        <a
            aria-label = {label}
            className  = "social-link flex items-center gap-2 rounded bg-[#1a222d] px-3 py-1 transition-colors duration-150 hover:bg-[#263240] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06b6d4]"
            href       = {href}
            rel        = "noopener noreferrer"
            target     = "_blank"
        >
            <span className={`relative flex shrink-0 items-center justify-center ${className}`}>
                <img
                    alt         = ""
                    aria-hidden = "true"
                    className   = "block h-full w-full object-contain mt-3"
                    src         = {icon}
                />
            </span>

            <span className="whitespace-nowrap mt-1 leading-4 tracking-[0.24px] text-[#e0e2ea]">
                {label}
            </span>
        </a>
    );
}

function SocialLinks() {
    return (
        <>
            {socialLinks.map((link) => (
                <SocialLink {...link} key={link.label} />
            ))}
        </>
    )
}

export default SocialLinks;