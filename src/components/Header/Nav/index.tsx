'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';
import endpoints from '@/types/server/endpoints';

const Nav = () => {
  const pathname = usePathname();
  const t = useTranslations('header');
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    {href: endpoints.HTTP_CONTACT, label: t('Contact us')},
    {href: endpoints.HTTP_DECKLIST, label: t('Decklist')}
  ];

  const isActive = (href: string) => pathname === href;

  const linkClassName = (href: string) =>
    `block rounded-sm px-3 py-2 text-13 font-medium tracking-0-24 transition duration-200 hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${isActive(href) ? 'text-[var(--primary)] underline decoration-2 underline-offset-4' : 'text-slate-50'}`;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('mousedown', closeOnOutsideClick);

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('mousedown', closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative flex items-center">
      <button
        type="button"
        aria-label={t('Menu')}
        aria-expanded={isOpen}
        aria-controls="header-mobile-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-surface-card px-2.5 py-2 text-13 font-medium text-slate-50 transition hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={`absolute left-0 block h-0.5 w-full rounded bg-current transition duration-200 ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded bg-current transition duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-full rounded bg-current transition duration-200 ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`}
          />
        </span>
      </button>

      {isOpen && (
        <nav
          id="header-mobile-menu"
          aria-label="Main navigation"
          className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-1.5 shadow-header"
        >
          {links.map(({href, label}) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={linkClassName(href)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Nav;
