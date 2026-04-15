import { v4 as uuidv4 } from "uuid";
import Link from 'next/link';
import Button from "@/components/List/Button";
import { getFormat } from '@/hooks/useCommon';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { LeagueItemsType } from "@/types/schemas/database/league";

const LeagueList: React.FC<LeagueItemsType> = ({ url, items, isBlured }) => {
    const t    = useTranslations('league');
    const tags = useTranslations('alt-tags');

    const leagueItemBlock = (item) => {
        return (
            <div className="left w100 mb10 bg-footer">
                <div className="wAuto padBox overflowHidden border-red">
                    <div className="cupBox border-grey left radius5 bg-red p5 w-25">
                        <Image
                            className = "cupIcon w-15"
                            src       = "/images/cup.webp"
                            height    = {14}
                            width     = {15}
                            alt       = {tags('Cup Champion')}
                            title     = {tags('Cup Champion')}
                            priority
                        />
                    </div>
                    <div className="left format wAuto ml25 tournamentDescription" aria-label={`${item.name} ${item.year}`}>
                        <strong>{item.name} {item.year}</strong>
                        <br></br>
                        <span className="left f12 mt5" style={{whiteSpace: 'pre-wrap'}}>
                            {t('Format')}: {getFormat(item.isLegacy)}
                        </span>
                    </div>
                    <Button buttonText={t('View league')}></Button>
                </div>
            </div>
        )
    }

    return (
        <section className={`left w100 overflowHidden ${isBlured ? 'blink blured' : ''}`}>
            {(items?.length > 0) && (
                items?.map((item) => (
                    <article className="listItem pointer title mb15 overflowHidden" key={uuidv4()}>
                        <Link href={url + item.id}>
                            {leagueItemBlock(item)}
                        </Link>
                    </article>
                ))
            )}
        </section>
    )
}

export default LeagueList;