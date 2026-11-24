import Pagination from "@/components/List/Pagination";
import { useTranslations } from 'next-intl';

const PastLeaguesHeader = ({title, totalPastLeagues, numItems, currentPage, setCurrentPage} : {title: string, totalPastLeagues: number, numItems: number, currentPage: number, setCurrentPage: (page: number) => void}) => {
    const t         = useTranslations('past-leagues');
    const assetPath = "/images/home";

    return (
        <>
            <header className="section-header">
                <div className="section-heading">
                    <span className="heading-icon bg-surface-card" aria-hidden="true">
                        <img src={`${assetPath}/past.png`} alt="" />
                    </span>
                    <div>
                        <h2 id="past-leagues-title" className="mb-2">{title}</h2>
                        <p>{t("text-description")}</p>
                    </div>
                </div>
                <nav className="season-picker" aria-label="Filter leagues by season">
                    <span>{t("season")}:</span>
                    {totalPastLeagues > 0 &&
                        <Pagination total={totalPastLeagues} itemsPerPage={numItems} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                    }
                </nav>
            </header>
        </>
    );
}

export default PastLeaguesHeader;
