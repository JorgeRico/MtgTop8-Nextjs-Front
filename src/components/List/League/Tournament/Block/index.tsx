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
    renderElements : Array<any> | null;
    url            : string;
    isBlured       : boolean;
    numPlayers     : number;
    classification : string | null;
    location       : string | null;
    locationName   : string;
}

const LeagueTournamentBlock: React.FC<MyComponentProps> = ({ leagueName, format, renderElements, url, isBlured, numPlayers, classification, location, locationName }) => {
    const t = useTranslations('league');

    const getLocation = () => {
        return (
            <div className="left w100 f14 mb5">
                <Link href={`https://maps.app.goo.gl/${location}`} className="" target="_blank" rel="noopener noreferrer" title="">
                    <HTag
                        className = ""
                        Tag       = "p"
                        text      = {getLocationText()}
                    />
                </Link>
            </div>
        )
    }

    const getLocationText = (): any => {
        return (
            <>
                <span className="left mr5">{t('tournament.Location')}:</span>
                <LocationImage></LocationImage>
                <span className="left ml5">{locationName}</span>
            </>
        )
    }

    return (
        <>
            <div className={`left w100 mt40 mb40 ${isBlured ? 'blink blured' : ''}`}>
                <div className="left">
                    <div className="left mr10">
                        <Image
                            src    = "/images/trophy.webp"
                            height = {32}
                            width  = {32}
                            alt    = {`${t('tournament.Tournaments')} - ${leagueName}`}
                            title  = {`${t('tournament.Tournaments')} - ${leagueName}`}
                            priority
                        />
                    </div>
                    {leagueName &&
                        <HTag Tag="h1" text={`${t('tournament.Tournaments')} - ${leagueName}`} className="left f24 mb5" />
                    }
                </div>
                {location != null && getLocation()}
                <div className="left w100 f14">{t('tournament.Format')}: {format}</div>
                <div className="left w100 f14 mt5">{t('tournament.Average Players')}: {numPlayers}</div>
                {classification != null && (
                    <div className="left w100 f14 mt5">{t('tournament.Classification')}: {classification}</div>
                )}
            </div>
            <div className={`left w100 mb10 ${isBlured ? 'blink blured' : ''}`}>
                {renderElements &&
                    <TournamentList
                        url={url}
                        items={renderElements}
                    />
                }
            </div>
        </>
    )
}

export default LeagueTournamentBlock;