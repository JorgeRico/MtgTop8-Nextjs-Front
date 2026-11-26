'use client';

import socialLinks from '@/types/social/social';
import '../modules.css';

function SocialLinks() {
  return (
    <nav
      aria-label="Social media"
      className="hidden items-center gap-1.5 rounded bg-surface-card px-2.5 py-1 mt-2 sm:flex"
    >
      {socialLinks.map((social) => {
        const {Icon} = social;

        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className={`relative block shrink-0 rounded-sm opacity-80 transition duration-200 hover:-translate-y-0.5 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${social.className}`}
          >
            <Icon className="absolute inset-0 block size-full max-w-none" />
          </a>
        );
      })}
    </nav>
  );
}

export default SocialLinks;
