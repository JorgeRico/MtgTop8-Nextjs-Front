import { useTranslations } from 'next-intl';

const NotFound = () => {
	const t = useTranslations('not-found');

	return (
		<main>
			<p className="mb40 color-gray">{t('text-description')}</p>
		</main>
	);
};

export default NotFound;
