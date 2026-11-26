import { useTranslations } from 'next-intl';
import Image from "next/image";
import { TournamentItemType } from "@/types/schemas/database/tournament";

const TournamentItem = ({ name, description, buttonText }: TournamentItemType) => {
    const t = useTranslations('alt-tags');

    return (
        <div className="left w100 mb10 bg-footer">
            <div className="wAuto padBox overflowHidden border-red">
                <div className="cupBox border-grey left radius5 bg-red p5 w-25">
                    <Image
                        className = "cupIcon w-15"
                        src       = "/images/cup.webp"
                        height    = {14}
                        width     = {15}
                        alt       = {t('Cup Champion')}
                        title     = {t('Cup Champion')}
                        priority
                    />
                </div>
                <div className="left format wAuto ml25 tournamentDescription">
                    <strong>{name}</strong>
                    <br></br>
                    <span className="left f12 mt5" style={{whiteSpace: 'pre-wrap'}}>
                        {description}
                    </span>
                </div>
                <button
                    aria-label={buttonText}
                    className="listButton right bg-red border-grey radius5 color-white f14 pointer"
                    type="button"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default TournamentItem;