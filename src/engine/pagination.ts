export const getPagination = (query: any) => {
    const limit = Number.parseInt(query.limit || 99999, 10);
    return (
        {
            limit: limit,
            offset:
                Number.parseInt(query.page, 10) - 1 >= 0
                    ? Number.parseInt(query.page, 10) - 1
                    : 0,
            takeLimit: query.page !== '-1' ? {take: limit} : null,
        } || {limit: 99999, offset: 0}
    );
};

export class Pagination {
    total = 0;
    perPage = 0;
    currentPage = 0;
    lastPage = 0;
    from = 0;
    to = 0;
    offset = 0;

    constructor(page: number, limit: number, countTotal: number) {
        if (page > -1) {
            this.currentPage = page + 1;
            this.perPage = limit;
            this.total = countTotal;
            this.lastPage = Math.ceil(countTotal / limit);
            this.offset = page * limit;
            this.from = this.offset;
            this.to = Math.min(this.offset + limit - 1, countTotal);
        } else {
            this.currentPage = 1;
            this.perPage = countTotal;
            this.total = countTotal;
            this.lastPage = 1;
            this.to = countTotal;
        }
    }
}
