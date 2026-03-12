import { NextIntlClientProvider } from 'next-intl';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "./styles/styles.css";
import { getLocale } from 'next-intl/server';
import type { Viewport, Metadata } from 'next';

export const viewport: Viewport = {
	width        : 'device-width',
	initialScale : 1,
	maximumScale : 5,
	userScalable : false,
}

export const metadata: Metadata = {
    title: {
        template : '%s | MTG Stats - Eternal Català',
        default  : 'MTG Stats - Eternal Català',
    },
    description : "%s | MTG Stats - Eternal Català",
    keywords    : "Magic the Gathering, Eternal Català, Legacy, Lliga Catalana de Legacy, LCL, Vintage, Lliga Catalana de Vintage, Lliga Minoria, mtg, tcg, stats",
    robots      : "index, follow",
    openGraph   : {
        title       : "%s | MTG Stats - Eternal Català",
        description : "%s | MTG Stats - Eternal Català",
        url         : new URL(process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app'),
        siteName    : "MTG Stats - Eternal Català",
        images: [
            {
                url    : new URL((process.env.NEXT_PUBLIC_BASE_WEBSITE_URL+'/mtg-stats-eternal-catala.jpg') || 'https://mtg-stats.vercel.app/mtg-stats-eternal-catala.jpg')),
                width  : 1000,
                height : 829,
                alt    : "MTG Stats - Eternal Català"
            },
        ],
        locale : "en_US",
        type   : "website",
    },
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