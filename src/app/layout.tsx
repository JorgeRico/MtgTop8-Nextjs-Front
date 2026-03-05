import { NextIntlClientProvider } from 'next-intl';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "./styles/styles.css";
import { getLocale } from 'next-intl/server';

export default async function RootLayout({children}: LayoutProps<'/'>) {
    const locale = await getLocale();

    return (
        <NextIntlClientProvider>
            <html lang={locale}>
                <body>
                    <Header></Header>
                    <main className="overflowHidden container pBody">
                        <section className="left w100">
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