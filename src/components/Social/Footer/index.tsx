'use client';

import socialLinks from '@/types/social/social';
import '../modules.css';

function SocialLink({
  href,
  Icon,
  className,
  label
}: (typeof socialLinks)[number]) {
  return (
    <a
      aria-label={label}
      className="social-link flex items-center gap-2 rounded bg-surface-elevated px-3 py-1 transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span
        className={`relative flex shrink-0 items-center justify-center ${className}`}
      >
        <Icon className="block h-full w-full object-contain mt-3" />
      </span>

      <span className="whitespace-nowrap mt-1 leading-4 tracking-0-24 text-slate-200">
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
  );
}

export default SocialLinks;
