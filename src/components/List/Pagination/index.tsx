import { useState, useEffect } from "react";
import { PaginationType } from "@/types/schemas/website/pagination";
import { useTranslations } from 'next-intl';

const Pagination = ({ total, itemsPerPage, currentPage, setCurrentPage, isDisabled = false }: PaginationType) => {
    const [ firstPage ]               = useState<number>(1);
    const [ lastPage ]                = useState<number>(Math.ceil(total / itemsPerPage));
    const [ pageArray, setPageArray ] = useState<number[]>([]);
    const t                           = useTranslations('language');
    
    const handleClick = (number) => {
        setCurrentPage(number);
    }

    const handleClickNext = () => {
        setCurrentPage(currentPage+1);
    }

    const handleClickPrevious = () => {
        setCurrentPage(currentPage-1);
    }

    const getPageNumbersArray = () => {
        setPageArray([...Array(Math.ceil(lastPage)).keys()].map(x => ++x));
    }

    useEffect(() => {
        getPageNumbersArray();
    }, [])

    // TODO: prev and next button are disabled now

    return (
        <>
            {!isDisabled &&
                <section>
                    <button aria-label={t('Previous page')} disabled={firstPage == currentPage} className={firstPage == currentPage ? "hidden" : "hidden cursor-pointer"} onClick={() => handleClickPrevious()}> 
                        <span>&#171;</span>
                    </button>
                    {pageArray?.map((number) => (
                        <button key={number} aria-label={t('Current page')} disabled={number == currentPage} className={number != currentPage ? "cursor-pointer" : "active currentdisabled"} onClick={() => handleClick(number)}>{number}</button>
                    ))}
                    <button aria-label={t('Next page')} className={lastPage == currentPage ? "hidden" : "hidden cursor-pointer" } onClick={() => handleClickNext()}>
                        <span>&#187;</span>
                    </button>
                </section>
            }
        </>
    );
}

export default Pagination;