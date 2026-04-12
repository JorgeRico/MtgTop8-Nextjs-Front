import HTag from "@/components/HTag";
import { useTranslations } from 'next-intl';
import { TournamentBluredType } from "@/types/schemas/database/tournament";
import { getFormat } from '@/hooks/useCommon';

const TournamentTitle: React.FC<TournamentBluredType> = ({ tournament, isBlured }) => {
    const t = useTranslations('tournaments');

    return (
        <section className={`left w100 mt40 pb0 ${isBlured ? "blink blured" : ""}`}>
            <HTag Tag="h1" text={tournament.name} className="left f24 mb5" />
            <article className="left w100">
                <div className="left">{getFormat(tournament.format)}</div>
                <div className="left ml10"> | </div>
                <div className="left ml10">{tournament.players} {t("title.players")}</div>
                <div className="left ml10"> | </div>
                <div className="left ml10">{tournament.date}</div>
            </article>
        </section>
    )
}

export default TournamentTitle;