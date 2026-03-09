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
	maximumScale : 1,
	userScalable : false,
}

export const metadata: Metadata = {
    title: {
        template: '%s | example.com',
        default: 'Home | example.com',
    },
}

export default async function RootLayout({children}: LayoutProps<'/'>) {
    const locale = await getLocale();

    return (
        <NextIntlClientProvider>
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