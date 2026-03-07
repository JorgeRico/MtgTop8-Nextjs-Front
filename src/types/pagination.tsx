export type PaginationType = {
    text           : string,
    total          : number,
    itemsPerPage   : number,
    currentPage    : number,
    setCurrentPage : Function,
    isDisabled?    : boolean
}
