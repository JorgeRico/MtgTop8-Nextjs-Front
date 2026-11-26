'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';
import endpoints from '@/types/server/endpoints';

const LeagueComponentFooter = () => {
	const t = useTranslations('league.detail');

	return (
		<section className="mt-10 mb-10 bg-surface-card rounded-xl p-space-md md:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-lg">
			<div className="flex items-start gap-space-md">
				<span className="material-symbols-outlined text-primary text-size-26">
					gavel
				</span>
				<div className="flex flex-col gap-space-xs">
					<h2 className="font-headline-sm text-headline-sm text-mana-white">
						{t('rulebook_title')}
					</h2>
					<p className="font-body-sm text-body-sm text-mana-black max-w-2xl">
						{t('rulebook_text')}
					</p>
					<p className="font-label-sm text-label-sm text-mana-black uppercase">
						{t('rulebook_note')}
					</p>
				</div>
			</div>
			<Link
				className="px-space-md py-space-sm rounded-lg bg-surface-elevated hover:bg-primary-container hover:text-white text-on-surface font-label-md text-label-md transition-colors flex items-center gap-2 shrink-0"
				href={endpoints.HTTP_CONTACT}
			>
				<span className="material-symbols-outlined text-size-18">
					contact_support
				</span>
				<span>{t('rulebook_contact')}</span>
			</Link>
		</section>
	);
};

export default LeagueComponentFooter;
