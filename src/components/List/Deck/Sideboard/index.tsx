import CardTypeList from "@/components/List/Deck/Card/Block";
import { useTranslations } from 'next-intl';
import { DeckBoardType } from "@/types/schemas/database/deck";

const DeckSideboard: React.FC<DeckBoardType> = ({ items }) => {
    const t = useTranslations('deck');

    return (
        <article className="left sideboard" aria-label={t('Sideboard')}>
            <CardTypeList items={items} text={t('Sideboard')}></CardTypeList>
        </article>
    )
}

export default DeckSideboard;