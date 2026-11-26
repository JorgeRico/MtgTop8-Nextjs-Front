'use client';

import {useEffect} from 'react';
import CloseIcon from '@/components/Icons/Close';

interface CardModalState {
	src: string;
	name: string;
}

interface StatsPanelProps {
	cardModal: CardModalState | null;
	setCardModal: (cardModal: CardModalState | null) => void;
}

const StatsPanelModal = ({cardModal, setCardModal}: StatsPanelProps) => {
	
	useEffect(() => {
		if (!cardModal) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setCardModal(null);
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [cardModal]);

	return (
		<>
			{cardModal && (
				<div
					aria-label={cardModal.name}
					aria-modal="true"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
					onClick={() => setCardModal(null)}
					role="dialog"
				>
					<div
						className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xl bg-surface-container-low shadow-2xl"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="flex items-center justify-between bg-surface-container p-space-md">
							<span className="font-headline-sm text-headline-sm text-mana-white">
								{cardModal.name}
							</span>
							<button
								aria-label="Close"
								className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant transition-colors hover:text-on-surface"
								onClick={() => setCardModal(null)}
								type="button"
							>
								<CloseIcon className="size-5 shrink-0" />
							</button>
						</div>
						<div className="flex items-center justify-center overflow-y-auto p-space-md">
							<img
								alt={cardModal.name}
								className="max-h-[75vh] w-auto rounded-[20px] shadow-2xl"
								src={cardModal.src}
							/>
						</div>
					</div>
				</div>
			)}
        </>
	);
};

export default StatsPanelModal;