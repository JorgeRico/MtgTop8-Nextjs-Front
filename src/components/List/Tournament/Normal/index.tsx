import { v4 as uuidv4 } from "uuid";
import Link from 'next/link';
import TournamentItem from "@/components/List/Tournament/Block";
import { useTranslations } from 'next-intl';

type MyComponentProps = {
    url   : string,
    items : PropTypes.array
}

const TournamentList: React.FC<MyComponentProps> = ({ url, items }) => {
    const t = useTranslations('tournaments');

    return (
        <section className="tournaments">
            {(items.length > 0) && (
                items.map((item) => (
                    <div key={uuidv4()} className="left w100 listItem pointer title">
                        <Link key={Math.random()} href={url + item.id}>
                            <TournamentItem name={item.name} description={`${t('block.Date')}: ${item.date}   |   ${item.players} ${t('block.players')}`} buttonText={t('block.View Tournament')}></TournamentItem>
                        </Link>
                    </div>
                ))
            )}
        </section>
    )
}

export default TournamentList;