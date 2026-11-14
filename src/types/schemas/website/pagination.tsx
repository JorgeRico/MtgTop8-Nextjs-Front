export type PaginationType = {
    total          : number,
    itemsPerPage   : number,
    currentPage    : number,
    setCurrentPage : (page: number) => void,
    isDisabled?    : boolean
}
