import BlockLine from "@/components/List/Player/Normal/BlockLine";
import { useTranslations } from 'next-intl';

const TournamentHeaderPlayers: React.FC = () => {
    const t = useTranslations('player');

    return (
        <section className="item left mb20 bg-footer border-red overflowHidden playersBoxHeader">
            <BlockLine
                position = {null}
                player   = {t('Player')}
                deck     = {t('Deck')}
                isHeader = {true}
            />
        </section>
    )
}

export default TournamentHeaderPlayers;