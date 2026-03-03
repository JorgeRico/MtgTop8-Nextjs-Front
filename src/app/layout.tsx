// import { NextIntlClientProvider } from 'next-intl';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "./styles/styles.css";

export default async function LocaleLayout({children}: LayoutProps<'/'>) {

    return (
        <html lang="en">
            <body>
                <Header></Header>
                <main className="overflowHidden container">
                    <section className="left w100 overflowHidden">
                        {children}
                    </section>
                </main>
                <Footer></Footer>
            </body>
        </html>
    );
}