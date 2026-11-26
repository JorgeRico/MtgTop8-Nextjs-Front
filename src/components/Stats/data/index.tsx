'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {getAxiosEndpoint} from '@/hooks/useApi';
import {StatsCardTotal} from '@/types/schemas/database/stats';
import {StatsSectionId} from '@/types/schemas/website/stats';
import StatsPanelModal from '@/components/Stats/data/modal';
import InfoIcon from '@/components/Icons/Info';
import StyleIcon from '@/components/Icons/Style';
import Spinner from '@/components/Spinner';
import StatsPanelDataHeader from '@/components/Stats/data/header';

interface StatSectionConfig {
	id: StatsSectionId;
	label: string;
	accent: string;
	endpoint: string;
}

interface SectionResult {
	items: StatsCardTotal[];
	hasError: boolean;
	isLoading: boolean;
}

interface CardModalState {
	src: string;
	name: string;
}

interface StatsPanelProps {
	id: string;
	isLeague?: boolean;
    configs: StatSectionConfig[];
}

const StatsPanelData = ({configs}: StatsPanelProps) => {
	const t = useTranslations('tournaments.detail');
	const [sections, setSections] = useState<Record<string, SectionResult>>({});
	const [cardModal, setCardModal] = useState<CardModalState | null>(null);

	useEffect(() => {
		let active = true;
		setSections({});

		async function loadStats(): Promise<void> {
			await Promise.all(
				configs.map(async (config) => {
					try {
						const response = await getAxiosEndpoint<{stats: StatsCardTotal[]}>(
							config.endpoint
						);

						if (!active) return;

						setSections((prev) => ({
							...prev,
							[config.id]: {
								items: response.data.stats ?? [],
								hasError: false,
								isLoading: false
							}
						}));
					} catch {
						if (!active) return;

						setSections((prev) => ({
							...prev,
							[config.id]: {
								items: [],
								hasError: true,
								isLoading: false
							}
						}));
					}
				})
			);
		}

		loadStats();

		return () => {
			active = false;
		};
	}, [configs]);

	useEffect(() => {
		if (!cardModal) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setCardModal(null);
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [cardModal]);

	const sectionBlock = (section, config) => {
		return (
			<>
				<div className="divide-y divide-outline-variant/10">
					{!section || section.isLoading ? (
						<div className="flex min-h-32 items-center justify-center px-5 py-8">
							<Spinner label={t('loading_stats')} />
						</div>
					) : (
						<>
							{section.items.map((item, index) => (
								<div
									className="flex items-center gap-3 px-5 transition-colors hover:bg-surface-container-low"
									key={`${config.id}-${item.name}-${index}`}
								>
									<span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-container text-body-sm text-mana-black">
										{index + 1}
									</span>
									{item.imgUrl ? (
										<button
											aria-label={item.name}
											className="shrink-0 cursor-pointer rounded transition-transform hover:scale-105"
											onClick={() =>
												setCardModal({
													src: item.imgUrl ?? '',
													name: item.name
												})
											}
											title={item.name}
											type="button"
										>
											<img
												alt=""
												className="size-8-width shrink-0 rounded bg-surface-container-high object-cover"
												src={item.imgUrl}
											/>
										</button>
									) : (
										<StyleIcon className="size-[18px] shrink-0 text-primary" />
									)}
									<span className="min-w-0 flex-1 truncate font-label-lg text-label-lg text-mana-white">
										{item.name}
									</span>
									<span className="shrink-0 font-label-lg text-label-lg text-mana-black">
										{item.num}
									</span>
								</div>
							))}

							{section.items.length === 0 && (
								<div className="flex items-center gap-2 px-5 py-6 text-body-sm text-mana-black">
									<InfoIcon className="size-[18px] shrink-0" />
									{t('no_stats')}
								</div>
							)}
						</>
					)}
				</div>
			</>
		)
	}

	return (
		<>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{configs.map((config) => {
					const section = sections[config.id];

					return (
						<section
							className="overflow-hidden rounded-xl mb-2 border border-outline-variant/20 bg-surface-container/40 shadow-lg"
							key={config.id}
						>
							<StatsPanelDataHeader config={config} section={section}></StatsPanelDataHeader>
							{sectionBlock(section, config)}
						</section>
					);
				})}
			</div>
			<StatsPanelModal cardModal={cardModal} setCardModal={setCardModal}></StatsPanelModal>
        </>
	);
};

export default StatsPanelData;
