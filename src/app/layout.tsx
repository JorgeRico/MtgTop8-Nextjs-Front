import { NextIntlClientProvider } from 'next-intl';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "./styles/styles.css";
import { getLocale } from 'next-intl/server';
import type { Viewport, Metadata } from 'next';
import { defaultOpenGraph } from '@/components/Seo';

export const viewport: Viewport = {
	width        : 'device-width',
	initialScale : 1,
	maximumScale : 5,
	userScalable : false,
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),

    title: {
        template : '%s | MTG Stats - Eternal Català',
        default  : 'MTG Stats - Eternal Català',
    },
    description : '%s | MTG Stats - Eternal Català',
    keywords    : "Magic the Gathering, Eternal Català, Legacy, Lliga Catalana de Legacy, LCL, Vintage, Lliga Catalana de Vintage, Lliga Minoria, mtg, tcg, stats",
    robots      : "index, follow",
}

export default async function RootLayout({children}: LayoutProps<'/'>) {
    const locale = await getLocale();

    return (
        <NextIntlClientProvider>
            <script
                async
                src = {`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
                crossOrigin = "anonymous"
            />
            <html lang={locale}>
                <body>
                    <Header></Header>
                    <main className="overflowHidden container">
                        <section className="mAuto">
                            <article className="pBody overflowHidden">
                                {children}
                            </article>
                        </section>
                    </main>
                    <Footer></Footer>
                </body>
            </html>
        </NextIntlClientProvider>
    );
}