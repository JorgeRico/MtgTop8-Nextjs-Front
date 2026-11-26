'use client';

import {StatsCardTotal} from '@/types/schemas/database/stats';
import {StatsSectionId} from '@/types/schemas/website/stats';
import LayersIcon from '@/components/Icons/Layers';

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

interface StatsPanelProps {
	section: SectionResult;
    config: StatSectionConfig;
}

const StatsPanelDataHeader = ({config, section}: StatsPanelProps) => {
	
	return (
		<>	
            <header className="flex items-center justify-between border-b border-outline-variant/15 bg-surface-container-low/40 px-5 py-3">
                <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-mana-white">
                    <span className={`h-2 w-2 rounded-full ${config.accent}`} />
                    <LayersIcon />
                    {config.label}
                </h3>
                <span className="rounded-full bg-surface-elevated px-2 py-0.5 font-label-sm text-label-sm text-mana-black">
                    {section?.items.length ?? 0}
                </span>
            </header>					
        </>
	);
};

export default StatsPanelDataHeader;
