import Link from 'next/link';
import TournamentItem from "@/components/List/Tournament/Block";
import { useTranslations } from 'next-intl';
import { TournamentNormalType } from "@/types/schemas/database/tournament";

const TournamentList = ({ url, items }: TournamentNormalType) => {
    const t = useTranslations('tournaments');

    return (
        <section className="tournaments">
            {(items.length > 0) && (
                <>
                    {items.map((item) => (
                        <div key={item.id} className="left w100 listItem pointer title mb5" aria-label={item.name}>
                            <Link key={item.id} href={url + item.id}>
                                <TournamentItem
                                    name        = {item.name}
                                    description = {`${t('block.Date')}: ${item.date}   |   ${item.players} ${t('block.players')}`}
                                    buttonText  = {t('block.View Tournament')}>
                                </TournamentItem>
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </section>
    )
}

export default TournamentList;