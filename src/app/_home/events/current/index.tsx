'use client';

import endpoints from '@/types/server/endpoints';
import {useState, useEffect} from 'react';
import {getAxiosEndpoint} from '@/hooks/useApi';
import {useTranslations} from 'next-intl';
import {LeagueType} from '@/types/schemas/database/league';
import {AxiosResponse} from 'axios';
import CurrentComponent from '@/components/List/League/Current/Current';
import './modules.css';

const CurrentEvents = ({title}: {title: string}) => {
	const [currentLeagues, setCurrentLeagues] = useState<LeagueType[]>([]);
	// const [ showCurrentElements, setShowCurrentElements ] = useState<boolean>(false);
	const t                                   = useTranslations('current-leagues');
	const assetPathPrefix                     = '/images/home';

	useEffect(() => {
		async function apiCallCurrent(): Promise<void> {
			try {
				const response: AxiosResponse<LeagueType[]> = await getAxiosEndpoint(
					endpoints.API_LEAGUE_CURRENT
				);
				setCurrentLeagues(response.data);
				// setShowCurrentElements(true);
			} catch (err) {
				console.log(err);
				console.log('Error');
			}
		}

		apiCallCurrent();
	}, []);

	const CurrentLeaguesHeader = () => {
		return (
			<>
				<div className="flex items-center gap-2">
					<div className="current-leagues-icon flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-card">
						<img
							alt=""
							className="current-leagues-icon-image"
							src={`${assetPathPrefix}/yellow_cup.png`}
						/>
					</div>
					<div>
						<h2
							className="current-leagues-title font-jakarta-semibold text-lg leading-6"
							id="current-leagues-title"
						>
							{title}
						</h2>
						<p className="current-leagues-description font-inter-regular text-xs leading-4">
							{t(
								'Explore current leagues, view standings, round pairings, and decklists'
							)}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-1.5 rounded-full bg-surface-card px-2.5 py-1">
					<span className="current-leagues-status-dot size-2 rounded-full" />
					<span className="current-leagues-status-label font-inter-bold">
						{t('In Progress')}
					</span>
				</div>
			</>
		);
	};

	return (
		<>
			<main className="mb-20">
				<section
					aria-labelledby="current-leagues-title"
					className="flex w-full flex-col gap-6"
				>
					<header className="section-heading flex mb-2 w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
						<CurrentLeaguesHeader></CurrentLeaguesHeader>
					</header>
					<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{currentLeagues.map((league, index) => (
							<CurrentComponent key={index} league={league}></CurrentComponent>
						))}
					</div>
				</section>
			</main>
		</>
	);
};

export default CurrentEvents;
