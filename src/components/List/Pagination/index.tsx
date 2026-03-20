import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./module.css"
import { PaginationType } from "@/types/schemas/website/pagination";

const Pagination: React.FC<PaginationType> = ({ text, total, itemsPerPage, currentPage, setCurrentPage, isDisabled = false }) => {
    const [ firstPage ]               = useState<number>(1);
    const [ lastPage ]                = useState<number>(Math.ceil(total / itemsPerPage));
    const [ pageArray, setPageArray ] = useState<number[]>([]);

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

    return (
        <section className="left w100 grey-top">
            <section className="left padPagination flex total">
                Total {text}: {total}
            </section>
            {!isDisabled &&
                <section className="right padPagination flex">
                    <article key={uuidv4()} className="">
                        <button disabled={firstPage == currentPage} className={firstPage == currentPage ? "arrowButton disabled" : "arrowButton pointer"} onClick={() => handleClickPrevious()}> 
                            <span>&#171;</span>
                        </button>
                    </article>
                    {pageArray?.map((number) => (
                        <article key={uuidv4()} className="">
                            <button disabled={number == currentPage} className={number != currentPage ? "pagButton pointer" : "pagButton current disabled"} onClick={() => handleClick(number)}>{number}</button>
                        </article>
                    ))}
                    <article key={uuidv4()} className="">
                        <button className={lastPage == currentPage ? "arrowButton disabled" : "arrowButton pointer" } onClick={() => handleClickNext()}>
                            <span>&#187;</span>
                        </button>
                    </article>
                </section>
            }
        </section>
    );
}

export default Pagination;