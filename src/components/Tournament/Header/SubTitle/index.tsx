import { useTranslations } from 'next-intl';
import { TournamentBluredType } from "@/types/schemas/database/tournament";
import SubTitle from "@/components/HTag/SubTitle";
import ListImage from "@/components/Icons/List";

const TournamentSubTitle: React.FC<TournamentBluredType> = ({ tournament, isBlured }) => {
    const t = useTranslations('tournaments');

    return (
        <section className={`left w100 mt30 mb10 ${isBlured ? "blink blured" : ""}`}>
            <SubTitle title={
                    <main>
                        <ListImage></ListImage>
                        <span className="left ml10 mt3">{`${t('players.Top Players')} ${tournament?.name ? '- ' + tournament?.name : ''}`}</span>
                    </main>
                }
            />
        </section>
    )
}

export default TournamentSubTitle;