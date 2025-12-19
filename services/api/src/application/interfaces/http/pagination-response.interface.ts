export interface PaginationResponseInterface<T> {
    data: T[];
    limit: number;
    totalItems: number;
    currentPage: number;
    lastPage: number;
}