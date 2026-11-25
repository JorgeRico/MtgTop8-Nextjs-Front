'use client';

import endpoints from '@/types/server/endpoints';
import {useState, useEffect} from 'react';
import {getAxiosEndpoint} from '@/hooks/useApi';
import {useTranslations} from 'next-intl';
import {LeagueType} from '@/types/schemas/database/league';
import {AxiosResponse} from 'axios';
import CurrentComponent from '@/components/List/League/Current/Current';
import Spinner from '@/components/Spinner';
import '@/app/styles/current_events.css';

const MIN_LOADING_MS = 1000;

const CurrentEvents = ({title}: {title: string}) => {
	const [currentLeagues, setCurrentLeagues] = useState<LeagueType[]>([]);
	const [isLoading, setIsLoading]           = useState<boolean>(true);
	const t                                   = useTranslations('current-leagues');
	const assetPathPrefix                     = '/images/home';

	useEffect(() => {
		let active = true;
		const startedAt = Date.now();

		async function apiCallCurrent(): Promise<void> {
			setIsLoading(true);

			try {
				const response: AxiosResponse<LeagueType[]> = await getAxiosEndpoint(
					endpoints.API_LEAGUE_CURRENT
				);
				if (!active) return;
				setCurrentLeagues(response.data);
			} catch (err) {
				if (!active) return;
				console.log(err);
				console.log('Error');
			} finally {
				if (!active) return;
				const remaining = Math.max(0, MIN_LOADING_MS - (Date.now() - startedAt));
				if (remaining > 0) {
					await new Promise<void>((resolve) => setTimeout(resolve, remaining));
				}
				if (active) {
					setIsLoading(false);
				}
			}
		}

		apiCallCurrent();

		return () => {
			active = false;
		};
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
							className="current-leagues-title mb-2 font-jakarta-semibold text-lg leading-6"
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
						{isLoading ? (
							<Spinner label={t('loading-current-leagues')} />
						) : (
							currentLeagues.map((league, index) => (
								<CurrentComponent key={index} league={league}></CurrentComponent>
							))
						)}
					</div>
				</section>
			</main>
		</>
	);
};

export default CurrentEvents;
