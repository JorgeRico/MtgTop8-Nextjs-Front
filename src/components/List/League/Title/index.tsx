import HTag from "@/components/HTag";
import LocationImage from "@/components/Icons/Location";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { LeagueTournamentType } from "@/types/schemas/database/league";

const LeagueTournamentTitle: React.FC<LeagueTournamentType> = ({ leagueName, format, isBlured, numPlayers, classification = null, location, locationName }) => {
    const t = useTranslations('league');

    const getLocation = () => {
        return (
            <div className="left w100 f14 mb5">
                <Link href={`https://maps.app.goo.gl/${location}`} className="" target="_blank" rel="noopener noreferrer" title="">
                    <div>
                        <span className="left mr5">{t('tournament.Location')}:</span>
                        <div className="locationItem">
                            <LocationImage></LocationImage>
                            <span className="left ml5">{locationName}</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <div className={`left w100 mt40 mb40 ${isBlured ? 'blink blured' : ''}`}>
            <div className="left">
                <div className="left mr10">
                    <Image
                        className = "trophyIcon"
                        src       = "/images/trophy.webp"
                        height    = {32}
                        width     = {32}
                        alt       = {`${t('tournament.Tournaments')} - ${leagueName}`}
                        title     = {`${t('tournament.Tournaments')} - ${leagueName}`}
                        priority
                    />
                </div>
                {leagueName &&
                    <HTag Tag="h1" text={`${t('tournament.Tournaments')} - ${leagueName}`} className="left f24 mb5 tournamentName" />
                }
            </div>
            {location != null && getLocation()}
            <div className="left w100 f14">{t('tournament.Format')}: {format}</div>
            <div className="left w100 f14 mt5">{t('tournament.Average Players')}: {numPlayers}</div>
            {classification != null && (
                <div className="left w100 f14 mt5">{t('tournament.Classification')}: {classification}</div>
            )}
        </div>
    )
}

export default LeagueTournamentTitle;