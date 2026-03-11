"use client"

import { useState, useRef } from "react";
import "../module.css";
import Error from "@/components/Forms/Error";
import { degrees, PDFDocument, StandardFonts } from 'pdf-lib';
import downloadjs from "downloadjs";
import InputForm from "@/components/Forms/Input";
import TextareaForm from "@/components/Forms/Textarea";
import { useTranslations } from 'next-intl';
import Image from "next/image";

const DeckListForm: React.FC = () => {
    const [ showButton, setShowButton ]     = useState(true);
    const [ showError, setShowError ]       = useState(false);
    const [ toSend, setToSend ]             = useState<any>({ name: '', surname: '', event: '', deckName: '', mainboard: [], sideboard: [] });
    const form                              = useRef(null);
    const [ line ]                          = useState(18);
    const [ cardGap ]                       = useState(43);
    const [ size ]                          = useState(12);
    const [ errorMessage, setErrorMessage ] = useState('');
    const t                                 = useTranslations('decklist');
    const errors                            = useTranslations('errors');

    const description = (item: any, firstPage: any, fontFamily: any, values: any): void => {
        const xTop = 42;
        firstPage.drawText(item.name, { x: xTop, y: 250, size: size, font: fontFamily, rotate: degrees(90) });
        firstPage.drawText(item.surname, { x: xTop, y: 70,  size: size, font: fontFamily, rotate: degrees(90) });

        const xMove = 70;
        firstPage.drawText(item.deckName, { x: values.rightColumn + xMove, y: values.height-95, size: size, font: fontFamily });
        firstPage.drawText(item.event, { x: values.rightColumn + xMove, y: values.height-70, size: size, font: fontFamily });
    }

    const decklist = (items: any, firstPage: any, fontFamily: any, values: any): void => {
        const maindeckCards  = cardsList( items.maindeck );
        const sideboardCards = cardsList( items.sideboard );

        let totalMainboard = getMaindeck(maindeckCards, values, firstPage, fontFamily);
        let totalSideboard = getSideboard(sideboardCards, values, firstPage, fontFamily)

        // max items check
        if (totalSideboard > 15 ) {
            setShowError(true);
            setErrorMessage(errors('forms.Incorrect sideboard - Maximum 15 cards'));
            setTimeout(() => {setShowButton(true)}, 2000);
            setTimeout(() => {setShowError(false)}, 2000);
        }

        numberOfCards(totalMainboard, totalSideboard, firstPage, fontFamily, values);
    }

    function numberOfCards(totalMainboard: number, totalSideboard: number, firstPage: any, fontFamily: any, values: any): void {
        firstPage.drawText(totalMainboard.toString(), { x: values.rightColumn - 83, y: 27, size: 18, font: fontFamily });
        firstPage.drawText(totalSideboard.toString(), { x: values.width - 70,   y: 81, size: 17, font: fontFamily });
    }

    function getMaindeck(cards: any, values: any, firstPage: any, fontFamily: any): number {
        const top          = 214.5;
        const MaindeckY    =  values.height / 2 + top
        let totalMainboard = 0;

        // Maindeck left
        cards.forEach((item, index) => {
            if (item != null) {
                firstPage.drawText(item.num,  { x: values.leftColumn,           y: MaindeckY - (index*line), size: size, font: fontFamily });
                firstPage.drawText(item.card, { x: values.leftColumn + cardGap, y: MaindeckY - (index*line), size: size, font: fontFamily });
                totalMainboard += parseInt(item.num);
            }
        })

        return totalMainboard;
    }

    function getSideboard(cards: any, values: any, firstPage: any, fontFamily): number {
        const sideBoardY   = values.height / 2 - 38;
        let totalSideboard = 0;

        cards.forEach((item, index) => {
            if (item != null) {
                firstPage.drawText(item.num,  { x: values.rightColumn,           y: sideBoardY - (index*line), size: size, font: fontFamily });
                firstPage.drawText(item.card, { x: values.rightColumn + cardGap, y: sideBoardY - (index*line), size: size, font: fontFamily });
                totalSideboard += parseInt(item.num) ;
            }
        })

        return totalSideboard;
    }

    function cardsList(cards: any): any {
        const cardsSplitted = cards.split('\n');

        let items: any[] = [];

        cardsSplitted.forEach(item => {
            if (item.trim() !== '') {
                let num  = null;
                let card = null;

                if (item.charAt(1) == ' ') {
                    num = item.slice(0,2);
                    card = item.slice(2);
                } else if (item.charAt(2) == ' ') {
                    num = item.slice(0,3);
                    card = item.slice(3);
                } else {
                    setShowError(true);
                    setErrorMessage(errors('forms.Incorrect form - card incorrect format'));
                    setTimeout(() => {setShowButton(true)}, 2000);
                    setTimeout(() => {setShowError(false)}, 2000);
                }

                if (!Number.isNaN(num) && card != '') {
                    items.push({ num: num, card: card });
                }
            }
        })

        return items;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setShowButton(false);

        try {
            // Fetch an existing PDF document
            const url              = '/pdf/decklist.pdf'
            const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

            // Load a PDFDocument from the existing PDF bytes
            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            if (pdfDoc != null) {
                const pages = pdfDoc.getPages();
                const firstPage = pages[0];

                // font family
                const fontFamily        = await pdfDoc.embedFont(StandardFonts.TimesRoman);
                const { width, height } = firstPage.getSize();

                const pdfValues = {
                    'height'      : height,
                    'width'       : width,
                    'rightColumn' : (width / 2 + 46),
                    'leftColumn'  : 80
                }

                const descriptionItems = {
                    'name'     : toSend.name,
                    'surname'  : toSend.surname,
                    'deckName' : toSend.deckName,
                    'event'    : toSend.event
                }

                const deckItems = {
                    'maindeck'  : toSend.mainboard,
                    'sideboard' : toSend.sideboard
                }

                if (fontFamily != null) {
                    // get info from form
                    description( descriptionItems, firstPage, fontFamily, pdfValues );
                    decklist( deckItems, firstPage, fontFamily, pdfValues );
                }

                const pdfBytes = await pdfDoc.save()
                setShowButton(true);
                // Trigger the browser to download the PDF document
                downloadjs(pdfBytes, "decklist.pdf", "application/pdf");
            }
        } catch(err) {
            // console.log('FAILED...', err);
            setShowError(true);
            setErrorMessage(errors('forms.Incorrect form - fill form correctly'));
            setTimeout(() => {setShowButton(true)}, 2000);
            setTimeout(() => {setShowError(false)}, 2000);
        };
    }

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <section className="left w100 mb20">
            <form ref={form} onSubmit={onSubmit} className="left mb40 overflowHidden decklist">
                <article className="left w50">
                    <InputForm
                        name         = "name"
                        type         = "text"
                        placeholder  = {t('Your name')}
                        label        = {t('Name')}
                        value        = {toSend.name}
                        handleChange = {handleChange}
                    />
                </article>
                <article className="right w50">
                    <InputForm
                        name         = "surname"
                        type         = "text"
                        placeholder  = {t('Your surname')}
                        label        = {t('Surname')}
                        value        = {toSend.surname}
                        handleChange = {handleChange}
                    />
                </article>

                <article className="left w50">
                    <InputForm
                        name         = "event"
                        type         = "text"
                        placeholder  = {t('Event name')}
                        label        = {t('Event name')}
                        value        = {toSend.event}
                        handleChange = {handleChange}
                    />
                </article>
                <article className="right w50">
                    <InputForm
                        name         = "deckName"
                        type         = "text"
                        placeholder  = {t('Your Deck name')}
                        label        = {t('Deck name')}
                        value        = {toSend.deckName}
                        handleChange = {handleChange}
                    />
                </article>

                <article className="left w100 textarea">
                    <div className="left w50 mb20">
                        <TextareaForm
                            name         = "mainboard"
                            placeholder  = {t('Your mainboard cards')}
                            label        = {t('Mainboard cards')}
                            value        = {toSend.mainboard}
                            handleChange = {handleChange}
                        />
                        <TextareaForm
                            name         = "sideboard"
                            placeholder  = {t('Your sideboard cards')}
                            label        = {t('Sideboard cards')}
                            value        = {toSend.sideboard}
                            handleChange = {handleChange}
                        />
                    </div>
                    <div className="right w50 mb20 mt35 pdf">
                         <Image
                            className = "w80 pad radius5 cursorAuto"
                            src       = "/images/decklist.png"
                            width     = {280}
                            height    = {366}
                            sizes     = "100vw"
                            alt       = {t('decklist pdf - mtg legacy cat')}
                            title     = {t('decklist pdf - mtg legacy cat')}
                            priority
                        />
                    </div>
                </article>

                {showButton == true &&
                    <div className="left w100">
                        <button className="pointer pad bg-red color-white" type='submit'>{t('Generate Decklist pdf')}</button>
                    </div>
                }

                {showError == true &&
                    <Error message={errorMessage}></Error>
                }
            </form>
        </section>
    );
}

export default DeckListForm;