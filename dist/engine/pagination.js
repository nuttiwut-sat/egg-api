"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = exports.getPagination = void 0;
const getPagination = (query) => {
    const limit = Number.parseInt(query.limit || 99999, 10);
    return ({
        limit: limit,
        offset: Number.parseInt(query.page, 10) - 1 >= 0
            ? Number.parseInt(query.page, 10) - 1
            : 0,
        takeLimit: query.page !== '-1' ? { take: limit } : null,
    } || { limit: 99999, offset: 0 });
};
exports.getPagination = getPagination;
class Pagination {
    constructor(page, limit, countTotal) {
        this.total = 0;
        this.perPage = 0;
        this.currentPage = 0;
        this.lastPage = 0;
        this.from = 0;
        this.to = 0;
        this.offset = 0;
        if (page > -1) {
            this.currentPage = page + 1;
            this.perPage = limit;
            this.total = countTotal;
            this.lastPage = Math.ceil(countTotal / limit);
            this.offset = page * limit;
            this.from = this.offset;
            this.to = Math.min(this.offset + limit - 1, countTotal);
        }
        else {
            this.currentPage = 1;
            this.perPage = countTotal;
            this.total = countTotal;
            this.lastPage = 1;
            this.to = countTotal;
        }
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map