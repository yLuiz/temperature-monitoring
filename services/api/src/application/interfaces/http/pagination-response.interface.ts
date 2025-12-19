export interface PaginationResponseInterface<T> {
    data: T[];
    take: number;
    limit: number;
    totalItems: number;
    currentPage: number;
}