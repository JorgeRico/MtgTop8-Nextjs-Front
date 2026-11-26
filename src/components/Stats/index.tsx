'use client';

import StatsPanelHeader from '@/components/Stats/header';
import StatsPanelData from '@/components/Stats/data';
import endpoints from '@/types/server/endpoints';
import statsSchema, {StatsSectionId} from '@/types/schemas/website/stats';
import {useTranslations} from 'next-intl';
import {useMemo} from 'react';

interface StatsPanelProps {
	id: string;
	isLeague?: boolean;
}

interface StatSectionConfig {
	id: StatsSectionId;
	label: string;
	accent: string;
	endpoint: string;
}

const StatsPanel = ({id, isLeague = false}: StatsPanelProps) => {
	const tStats = useTranslations('stats');

	const buildEndpoint = (
		id: string,
		section: StatsSectionId,
		isLeague: boolean
	): string => {
		if (statsSchema.isCardTypeSection(section)) {
			const endpoint = isLeague
				? endpoints.API_LEAGUE_CARD_STATS
				: endpoints.API_TOURNAMENT_CARD_STATS;
	
			return endpoint
				.replace('{id}', id)
				.replace('{cardType}', statsSchema.CARD_TYPE_OPTIONS[section]);
		}
	
		const endpoint = isLeague
			? endpoints.API_LEAGUE_STATS
			: endpoints.API_TOURNAMENT_STATS;
	
		return endpoint
			.replace('{id}', id)
			.replace('{option}', statsSchema.STATS_OPTIONS[section]);
	};

	const configs = useMemo<StatSectionConfig[]>(
		() => [
			{
				id: 'top-cards',
				label: tStats('Top Cards'),
				accent: 'bg-primary',
				endpoint: buildEndpoint(id, 'top-cards', isLeague)
			},
			{
				id: 'mainboard',
				label: tStats('Top Mainboard Cards'),
				accent: 'bg-emerald-500',
				endpoint: buildEndpoint(id, 'mainboard', isLeague)
			},
			{
				id: 'sideboard',
				label: tStats('Top Sideboard Cards'),
				accent: 'bg-mana-blue',
				endpoint: buildEndpoint(id, 'sideboard', isLeague)
			},
			{
				id: 'artifacts',
				label: tStats('Top Artifacts'),
				accent: 'bg-arcane-gold',
				endpoint: buildEndpoint(id, 'artifacts', isLeague)
			},
			{
				id: 'sorceries',
				label: tStats('Top Sorceries'),
				accent: 'bg-primary',
				endpoint: buildEndpoint(id, 'sorceries', isLeague)
			},
			{
				id: 'enchantments',
				label: tStats('Top Enchantments'),
				accent: 'bg-tertiary',
				endpoint: buildEndpoint(id, 'enchantments', isLeague)
			},
			{
				id: 'planeswalkers',
				label: tStats('Top Planeswalkers'),
				accent: 'bg-mana-blue',
				endpoint: buildEndpoint(id, 'planeswalkers', isLeague)
			},
			{
				id: 'lands',
				label: tStats('Top Lands'),
				accent: 'bg-emerald-500',
				endpoint: buildEndpoint(id, 'lands', isLeague)
			},
			{
				id: 'creatures',
				label: tStats('Top Creatures'),
				accent: 'bg-mana-green',
				endpoint: buildEndpoint(id, 'creatures', isLeague)
			},
			{
				id: 'instants',
				label: tStats('Top Instants'),
				accent: 'bg-primary-container',
				endpoint: buildEndpoint(id, 'instants', isLeague)
			}
		],
		[id, isLeague, tStats]
	);

	return (
		<div className="flex w-full flex-col gap-space-lg">
			<StatsPanelHeader></StatsPanelHeader>
			<StatsPanelData id={id} isLeague={isLeague} configs={configs}></StatsPanelData>
		</div>
	);
};

export default StatsPanel;
