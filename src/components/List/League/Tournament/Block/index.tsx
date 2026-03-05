import TournamentList from "@/components/List/Tournament/Normal";
import HTag from "@/components/HTag";
import LocationImage from "@/components/Icons/Location";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ReactNode } from 'react';
import Image from "next/image";

type MyComponentProps = {
    leagueName     : string;
    format         : string;
    renderElements : PropTypes.array;
    ulr            : string;
    isBlured       : boolean;
    numPlayers     : number;
    classification : string;
    location       : string;
    locationName   : string;
}

const LeagueTournamentBlock: React.FC<MyComponentProps> = ({ leagueName, format, renderElements, url, isBlured, numPlayers, classification, location, locationName }) => {
    const t = useTranslations('tournament');

    const getLocation = () => {
        return (
            <div className="left w100 f14 mb5">
                <Link href={`https://maps.app.goo.gl/${location}`} className="" target="_blank" rel="noopener noreferrer" title="">
                    <HTag
                        Tag  = "p"
                        text = {
                            <span className="left mr5">{t('Location')}:</span>
                            <LocationImage></LocationImage>
                            <span className="left ml5">{locationName}</span>
                        }
                    />
                </Link>
            </div>
        )
    }

    return (
        <div className={`left w100 mt40 mb40 ${isBlured ? 'blink blured' : ''}`}>
            <div className="left">
                <div className="left mr10">
                    <Image
                        src="/images/trophy.webp"
                        height={32}
                        width={32}
                        alt={`${t('Tournaments')} - ${leagueName}`}
                        title={`${t('Tournaments')} - ${leagueName}`}
                        priority
                    />
                </div>
                {leagueName &&
                    <HTag Tag="h1" text={`${t('Tournaments')} - ${leagueName}`} className="left f24 mb5" />
                }
            </div>
            {location != null && getLocation()}
            <div className="left w100 f14">{t('Format')}: {format}</div>
            <div className="left w100 f14 mt5">{t('Average Players')}: {numPlayers}</div>
            {classification != null && (
                <div className="left w100 f14 mt5">{t('Classification')}: {classification}</div>
            )}
        </div>
        <div className={`left w100 mb10 ${isBlured ? 'blink blured' : ''}`}>
            <TournamentList url={url} items={renderElements}/>
        </div>
    )
}

export default LeagueTournamentBlock;