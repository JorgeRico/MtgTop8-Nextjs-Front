"use client"

import { useState, useRef } from "react";
import { degrees, PDFDocument, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';
import downloadjs from "downloadjs";
import { useTranslations } from 'next-intl';
import { PdfItemType, PdfValuesType, PdfType, PdfCardType } from "@/types/schemas/website/pdf";
import { Format, FORMATS, SAMPLE_MAINBOARD, SAMPLE_SIDEBOARD } from "./fakeData"

const DeckListForm = () => {
    const [ showButton, setShowButton ]     = useState<boolean>(true);
    const [ showError, setShowError ]       = useState<boolean>(false);
    const [ toSend, setToSend ]             = useState<PdfType>({ name: '', surname: '', event: '', deckName: '', mainboard: '', sideboard: '' });
    const form                              = useRef<HTMLFormElement>(null);
    const [ line ]                          = useState<number>(18);
    const [ cardGap ]                       = useState<number>(43);
    const [ size ]                          = useState<number>(12);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ format, setFormat ]             = useState<Format>('Legacy');
    const [ playerId, setPlayerId ]         = useState<string>('');
    const t                                 = useTranslations('decklist');
    const errors                            = useTranslations('errors');

    /** Counts the cards in a decklist block, ignoring blank lines and malformed rows. */
    const countCards = (block: string): number => {
        return block
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line !== '')
            .reduce((total, line) => {
                const match = line.match(/^(\d+)\s+(.+)$/);
                return match ? total + parseInt(match[1], 10) : total;
            }, 0);
    };

    const mainboardCount = countCards(toSend.mainboard);
    const sideboardCount = countCards(toSend.sideboard);

    const isMainboardValid = mainboardCount >= 60;
    const isSideboardValid = sideboardCount === 0 || sideboardCount <= 15;

    const showDeckError = (key: string): void => {
        setShowError(true);
        setErrorMessage(errors(`forms.${key}`));
        setTimeout(() => {setShowButton(true)}, 2000);
        setTimeout(() => {setShowError(false)}, 2000);
    };

    const description = (item: PdfItemType, firstPage: PDFPage, fontFamily: PDFFont, values: PdfValuesType): boolean => {
        if (!item.name || item.name.trim() === '') {
            showDeckError('Incorrect form - Name is required');
            return false;
        }

        if (!item.surname || item.surname.trim() === '') {
            showDeckError('Incorrect form - Surname is required');
            return false;
        }

        if (!item.deckName || item.deckName.trim() === '') {
            showDeckError('Incorrect form - Deck name is required');
            return false;
        }

        const xTop = 42;
        firstPage.drawText(item.name, { x: xTop, y: 250, size: size, font: fontFamily, rotate: degrees(90) });
        firstPage.drawText(item.surname, { x: xTop, y: 70,  size: size, font: fontFamily, rotate: degrees(90) });

        const xMove = 70;
        firstPage.drawText(item.deckName, { x: values.rightColumn + xMove, y: values.height-95, size: size, font: fontFamily });
        firstPage.drawText(item.event, { x: values.rightColumn + xMove, y: values.height-70, size: size, font: fontFamily });
        
        return true;
    }

    const decklist = (maindeck: string, sideboard: string, firstPage: PDFPage, fontFamily: PDFFont, values: PdfValuesType): boolean => {
        let hasError = false;

        const maindeckResult = cardsList( maindeck );
        const sideboardResult = cardsList( sideboard );
        const maindeckCards  = maindeckResult.items;
        const sideboardCards = sideboardResult.items;
        const totalMainboard = maindeckCards.reduce((total, card) => total + parseInt(card.num, 10), 0);
        const totalSideboard = sideboardCards.reduce((total, card) => total + parseInt(card.num, 10), 0);

        if (maindeckResult.hasError || sideboardResult.hasError) {
            showDeckError('Incorrect form - card incorrect format');
            hasError = true;
        }

        if (maindeckCards.length === 0 || totalMainboard === 0) {
            showDeckError('Incorrect maindeck - No cards found');
            hasError = true;
        } else if (totalMainboard < 40) {
            showDeckError('Incorrect maindeck - Minimum 40 cards required');
            hasError = true;
        }

        if (totalSideboard > 15) {
            showDeckError('Incorrect sideboard - Maximum 15 cards');
            hasError = true;
        }

        const basicLands = ['swamp', 'plains', 'mountain', 'forest', 'island'];
        const cardCounts: Record<string, number> = {};

        [...maindeckCards, ...sideboardCards].forEach(item => {
            const card = item.card.trim().toLowerCase();
            const copies = parseInt(item.num, 10);

            if (basicLands.includes(card) || !card || Number.isNaN(copies)) return;
            cardCounts[card] = (cardCounts[card] || 0) + copies;
        });

        if (Object.values(cardCounts).some(copies => copies > 4)) {
            showDeckError('Incorrect card count - Same cards cannot exceed 4 copies in maindeck and sideboard combined, except basic lands');
            hasError = true;
        }

        if (hasError) return false;

        getMaindeck(maindeckCards, values, firstPage, fontFamily);
        getSideboard(sideboardCards, values, firstPage, fontFamily);
        numberOfCards(totalMainboard, totalSideboard, firstPage, fontFamily, values);

        return true;
    }

    function numberOfCards(totalMainboard: number, totalSideboard: number, firstPage: PDFPage, fontFamily: PDFFont, values: PdfValuesType): void {
        firstPage.drawText(totalMainboard.toString(), { x: values.rightColumn - 83, y: 27, size: 18, font: fontFamily });
        firstPage.drawText(totalSideboard.toString(), { x: values.width - 70,   y: 81, size: 17, font: fontFamily });
    }

    function getMaindeck(cards: PdfCardType[], values: PdfValuesType, firstPage: PDFPage, fontFamily: PDFFont): void {
        const top       = 214.5;
        const MaindeckY = values.height / 2 + top;

        cards.forEach((item, index) => {
            if (item != null) {
                firstPage.drawText(item.num,  { x: values.leftColumn,           y: MaindeckY - (index*line), size: size, font: fontFamily });
                firstPage.drawText(item.card, { x: values.leftColumn + cardGap, y: MaindeckY - (index*line), size: size, font: fontFamily });
            }
        })
    }

    function getSideboard(cards: PdfCardType[], values: PdfValuesType, firstPage: PDFPage, fontFamily: PDFFont): void {
        const sideBoardY = values.height / 2 - 38;

        cards.forEach((item, index) => {
            if (item != null) {
                firstPage.drawText(item.num,  { x: values.rightColumn,           y: sideBoardY - (index*line), size: size, font: fontFamily });
                firstPage.drawText(item.card, { x: values.rightColumn + cardGap, y: sideBoardY - (index*line), size: size, font: fontFamily });
            }
        });
    }

    function cardsList(cards: string): { items: PdfCardType[], hasError: boolean } {
        const cardsSplitted = cards.split('\n');
        const items: PdfCardType[] = [];
        let hasError = false;

        cardsSplitted.forEach(item => {
            const line = item.trim();
            if (line === '') return;

            const match = line.match(/^(\d+)\s+(.+)$/);

            if (!match) {
                hasError = true;
                return;
            }

            const num  = match[1];
            const card = match[2];

            items.push({ num, card });
        });

        return { items, hasError };
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setShowButton(false);

        try {
            // Fetch an existing PDF document
            const url              = process.env.NEXT_PUBLIC_DECKLIST_PDF_URL || '/pdf/decklist.pdf'
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

                if (fontFamily != null) {
                    // get info from form
                    const descValid = description( descriptionItems, firstPage, fontFamily, pdfValues );
                    
                    if (!descValid) return;

                    const decklistValid = decklist( toSend.mainboard, toSend.sideboard, firstPage, fontFamily, pdfValues );
                    
                    if (!decklistValid) return;

                }

                const pdfBytes = await pdfDoc.save()
                setShowButton(true);
                // Trigger the browser to download the PDF document
                downloadjs(pdfBytes, "decklist.pdf", "application/pdf");
            }
        } catch(err) {
            // console.log('FAILED...', err);
            console.log(err);
            setShowError(true);
            setErrorMessage(errors('forms.Incorrect form - fill form correctly'));
            setTimeout(() => {setShowButton(true)}, 2000);
            setTimeout(() => {setShowError(false)}, 2000);
        };
    };

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    const loadSample = () => {
        setToSend({
            name: t('sample_name'),
            surname: t('sample_surname'),
            event: "Lliga Catalana de Legacy 2026",
            deckName: t('sample_deck'),
            mainboard: SAMPLE_MAINBOARD,
            sideboard: SAMPLE_SIDEBOARD,
        });
        setPlayerId('CAT-88402');
    };

    const resetFields = () => {
        setToSend({ name: '', surname: '', event: '', deckName: '', mainboard: '', sideboard: '' });
        setPlayerId('');
        setFormat('Legacy');
    };

    const copyPlaintext = async () => {
        const text = [
            `${toSend.name} ${toSend.surname}`.trim(),
            toSend.event,
            toSend.deckName,
            '',
            t('mainboard_label'),
            toSend.mainboard,
            '',
            t('sideboard_label'),
            toSend.sideboard,
        ].join('\n');

        try {
            await navigator.clipboard.writeText(text);
        } catch {
            console.log('Clipboard unavailable');
        }
    };

    const inputClass  = "w-full bg-surface-base text-mana-white rounded-lg px-3.5 py-2.5 font-body-md text-body-md placeholder:text-mana-black/50 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner";
    const labelClass = "font-label-md text-label-md text-mana-white flex items-center justify-between";
    const metaClass  = "font-label-sm text-label-sm text-mana-black";

    const fullName = `${toSend.name} ${toSend.surname}`.trim();

    return (
        <form ref={form} onSubmit={onSubmit}>
            {/* 1. Two-column interactive form layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
                {/* LEFT COLUMN: Competitor & Event Details (5 cols) */}
                <section className="lg:col-span-5 flex flex-col gap-space-md">
                    <div className="bg-surface-card rounded-xl p-space-lg shadow-lg flex flex-col gap-space-md">
                        <div className="flex items-center justify-between pb-space-xs">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-size-22">badge</span>
                                <h2 className="font-headline-sm text-headline-sm text-mana-white">{t('competitor_details')}</h2>
                            </div>
                            <span className={`${metaClass} uppercase tracking-wider`}>{t('mtr_section')}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                            <div className="flex flex-col gap-1">
                                <label className={labelClass} htmlFor="player-name">
                                    <span>{t('first_name')}</span>
                                    <span className="text-primary text-size-10">{t('required')}</span>
                                </label>
                                <input className={inputClass} id="player-name" name="name" onChange={handleChange} placeholder={t('first_name_placeholder')} type="text" value={toSend.name} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className={labelClass} htmlFor="player-surname">
                                    <span>{t('surname')}</span>
                                    <span className="text-primary text-size-10">{t('required')}</span>
                                </label>
                                <input className={inputClass} id="player-surname" name="surname" onChange={handleChange} placeholder={t('surname_placeholder')} type="text" value={toSend.surname} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <label className={labelClass} htmlFor="dci-id">{t('circuit_player_id')}</label>
                                <span className={metaClass}>{t('optional_recommended')}</span>
                            </div>
                            <div className="relative flex items-center">
                                <span className="material-symbols-outlined absolute left-3 text-mana-black text-size-18">pin</span>
                                <input className={`${inputClass} pl-10 font-stat-mono text-body-md focus:ring-mana-blue`} id="dci-id" onChange={(e) => setPlayerId(e.target.value)} placeholder={t('circuit_player_id_placeholder')} type="text" value={playerId} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className={labelClass} htmlFor="event-name">
                                <span>{t('event_name')}</span>
                                <span className="text-mana-blue text-size-10 font-semibold">{t('active_series')}</span>
                            </label>
                            <div className="relative">
                                <input className={inputClass} id="event-name" name="event" onChange={handleChange} placeholder={t('event_name_placeholder')} type="text" value={toSend.event} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>{t('tournament_format')}</label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1 bg-surface-base rounded-lg">
                                {FORMATS.map((option) => (
                                    <button
                                        aria-pressed={format === option}
                                        className={`form-padding rounded text-center font-label-sm text-label-sm transition-all ${format === option ? 'bg-primary-container text-white shadow-sm' : 'text-mana-black hover:text-mana-white hover:bg-surface-elevated'}`}
                                        key={option}
                                        onClick={() => setFormat(option)}
                                        type="button"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className={labelClass} htmlFor="deck-name">
                                <span>{t('deck_name')}</span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-mana-blue"></span>
                                    <span className="w-2 h-2 rounded-full bg-mana-red"></span>
                                    <span className={`${metaClass} text-size-10`}>{t('archetype_hint')}</span>
                                </span>
                            </label>
                            <input className={inputClass} id="deck-name" name="deckName" onChange={handleChange} placeholder={t('deck_name_placeholder')} type="text" value={toSend.deckName} />
                        </div>
                    </div>

                    {/* Platform Integration */}
                    <div className="bg-surface-card rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
                        <div className="flex items-center justify-between">
                            <span className={`${metaClass} uppercase tracking-wider`}>{t('platform_integration')}</span>
                            <span className="text-xs text-mana-blue font-semibold">{t('fast_sync')}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-elevated text-mana-white font-label-md text-label-md hover:bg-surface-container-high transition-all shadow-sm" onClick={loadSample} type="button">
                                <span className="material-symbols-outlined text-size-16 text-mana-blue">download</span>
                                <span>{t('load_sample')}</span>
                            </button>
                            <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-elevated text-error font-label-md text-label-md hover:bg-error-container/20 transition-all shadow-sm" onClick={resetFields} type="button">
                                <span className="material-symbols-outlined text-size-16">delete_sweep</span>
                                <span>{t('reset_fields')}</span>
                            </button>
                        </div>
                        <div className="p-2.5 rounded bg-surface-base flex items-start gap-2 text-xs text-mana-black font-body-sm">
                            <span className="material-symbols-outlined text-arcane-gold text-size-16 shrink-0 mt-0.5">info</span>
                            <span>{t('format_hint')}</span>
                        </div>
                    </div>
                </section>

                {/* RIGHT COLUMN: Deck Registration (7 cols) */}
                <section className="lg:col-span-7 flex flex-col gap-space-md">
                    <div className="bg-surface-card rounded-xl p-space-lg shadow-lg flex flex-col gap-space-sm relative">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-space-xs">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-mana-blue text-size-22">view_column</span>
                                <h2 className="font-headline-sm text-headline-sm text-mana-white">{t('mainboard_title')}</h2>
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-stat-mono text-label-md shadow-sm ${isMainboardValid ? 'bg-mana-green/15 text-mana-green' : 'bg-error-container/20 text-error'}`}>
                                <span className="material-symbols-outlined text-size-16">{isMainboardValid ? 'check_circle' : 'error'}</span>
                                <span>{mainboardCount}</span> / 60 {t('cards')}
                            </div>
                        </div>
                        <div className="relative">
                            <textarea className="w-full bg-surface-base text-mana-white rounded-lg p-3.5 font-stat-mono text-body-md placeholder:text-mana-black/40 focus:outline-none focus:ring-2 focus:ring-mana-blue shadow-inner resize-y leading-relaxed tracking-wide" id="mainboard-input" name="mainboard" onChange={handleChange} placeholder={t('mainboard_placeholder')} rows={12} value={toSend.mainboard} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-mana-black font-body-sm pt-1">
                            <span>{t('mainboard_note')}</span>
                            <span className={`font-semibold ${isMainboardValid ? 'text-mana-green' : 'text-error'}`}>{isMainboardValid ? t('mainboard_ok') : t('mainboard_under_minimum')}</span>
                        </div>
                    </div>

                    <div className="bg-surface-card rounded-xl p-space-lg shadow-lg flex flex-col gap-space-sm relative">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-space-xs">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-arcane-gold text-size-22">auto_stories</span>
                                <h2 className="font-headline-sm text-headline-sm text-mana-white">{t('sideboard_title')}</h2>
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-stat-mono text-label-md shadow-sm ${isSideboardValid ? 'bg-mana-green/15 text-mana-green' : 'bg-error-container/20 text-error'}`}>
                                <span className="material-symbols-outlined text-size-16">{isSideboardValid ? 'check_circle' : 'error'}</span>
                                <span>{sideboardCount}</span> / 15 {t('cards')}
                            </div>
                        </div>
                        <div className="relative">
                            <textarea className="w-full bg-surface-base text-mana-white rounded-lg p-3.5 font-stat-mono text-body-md placeholder:text-mana-black/40 focus:outline-none focus:ring-2 focus:ring-arcane-gold shadow-inner resize-y leading-relaxed tracking-wide" id="sideboard-input" name="sideboard" onChange={handleChange} placeholder={t('sideboard_placeholder')} rows={6} value={toSend.sideboard} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-mana-black font-body-sm pt-1">
                            <span>{t('sideboard_note')}</span>
                            <span className={`font-semibold ${isSideboardValid ? 'text-mana-green' : 'text-error'}`}>{isSideboardValid ? t('sideboard_ok') : t('sideboard_too_many')}</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* 2. Preview & Export master action card */}
            <section className="bg-surface-card rounded-xl p-space-lg md:p-space-xl shadow-2xl mb-space-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-container/10 via-transparent to-mana-blue/10 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-space-lg">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">{t('verification_engine')}</span>
                            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-mana-white">{t('sheet_inspection')}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded bg-surface-elevated text-mana-white font-label-md text-label-md flex items-center gap-1.5 shadow-sm">
                                <span className="material-symbols-outlined text-size-16 text-mana-green">lock</span>
                                {t('a4_ready')}
                            </span>
                        </div>
                    </div>

                    {/* Live styled mini preview bar */}
                    <div className="bg-surface-base rounded-lg p-space-md shadow-inner grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-body-md">
                        <div className="flex flex-col">
                            <span className="text-mana-black uppercase font-label-sm text-size-10">{t('preview_pilot')}</span>
                            <span className="text-mana-white font-headline-sm text-body-lg font-bold truncate">{fullName || '—'}</span>
                            <span className="text-primary font-mono text-size-11">{playerId ? `ID: ${playerId}` : '—'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-mana-black uppercase font-label-sm text-size-10">{t('preview_event')}</span>
                            <span className="text-mana-white font-semibold truncate">{toSend.event || '—'}</span>
                            <span className="text-mana-black text-size-11">{t('format_prefix')} <strong className="text-mana-blue">{format}</strong></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-mana-black uppercase font-label-sm text-size-10">{t('preview_archetype')}</span>
                            <span className="text-mana-white font-semibold truncate">{toSend.deckName || '—'}</span>
                            <span className="text-mana-black text-size-11">{t('colors_prefix')} <strong className="text-mana-red">{t('colors_value')}</strong></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-mana-black uppercase font-label-sm text-size-10">{t('preview_totals')}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={`font-stat-mono text-body-lg font-bold ${isMainboardValid && isSideboardValid ? 'text-mana-green' : 'text-error'}`}>{mainboardCount} / {sideboardCount}</span>
                                <span className={`material-symbols-outlined text-size-18 ${isMainboardValid && isSideboardValid ? 'text-mana-green' : 'text-error'}`}>verified_user</span>
                            </div>
                            <span className={`text-size-11 ${isMainboardValid && isSideboardValid ? 'text-mana-green' : 'text-error'}`}>{isMainboardValid && isSideboardValid ? t('decklist_legal') : t('decklist_illegal')}</span>
                        </div>
                    </div>

                    {/* CTA row */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md pt-space-xs">
                        <button className="group relative inline-flex items-center justify-center gap-3 px-space-xl py-3.5 rounded-lg bg-primary-container text-white font-headline-sm text-body-lg font-bold shadow-[0_0_24px_rgba(249,115,22,0.45)] hover:bg-[#ea580c] hover:shadow-[0_0_32px_rgba(249,115,22,0.6)] active:scale-[0.99] transition-all" disabled={!showButton} type="submit">
                            <span className="material-symbols-outlined text-size-24">picture_as_pdf</span>
                            <span>{t('generate_pdf')}</span>
                            <span className="material-symbols-outlined text-size-20 transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-space-md py-3 rounded-lg bg-surface-elevated text-mana-white font-label-lg text-label-lg hover:bg-surface-container-high transition-all shadow-sm" onClick={copyPlaintext} title={t('copy_plaintext')} type="button">
                                <span className="material-symbols-outlined text-size-18 text-mana-blue">content_copy</span>
                                <span>{t('copy_plaintext')}</span>
                            </button>
                            <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-space-md py-3 rounded-lg bg-surface-elevated text-mana-white font-label-lg text-label-lg hover:bg-surface-container-high transition-all shadow-sm" onClick={() => window.print()} title={t('print_direct')} type="button">
                                <span className="material-symbols-outlined text-size-18 text-arcane-gold">print</span>
                                <span>{t('print_direct')}</span>
                            </button>
                        </div>
                    </div>

                    {showError == true && (
                        <div className="flex items-center gap-2 rounded-lg bg-error-container/20 px-3.5 py-2.5 text-error text-xs font-body-sm" role="alert">
                            <span className="material-symbols-outlined text-size-18">error</span>
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </div>
            </section>
        </form>
    );
};

export default DeckListForm;
