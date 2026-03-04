import { useTranslations } from 'next-intl';

const CopyrightFooter: React.FC = () => {
    const t = useTranslations('footer');

    return (
        <>
            <section className="left w100 copyright f10 bg-footer">
                <div className="container">
                    <div className="message mt10 center color-copyright">
                        {t('copyright')}
                    </div>
                </div>
            </section>
        </>
    );
}

export default CopyrightFooter;