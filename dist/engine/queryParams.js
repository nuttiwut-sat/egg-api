"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchQueryParams = exports.getSortQueryParams = void 0;
const getSortQueryParams = (query) => {
    let sortField = query.sort ? query.sort.toString() : 'createdAt';
    let direction = (query.direction ? query.direction.toString().toLowerCase() : 'desc');
    let orderBy = {};
    orderBy[sortField] = direction;
    return orderBy;
};
exports.getSortQueryParams = getSortQueryParams;
const getSearchQueryParams = (query, fields) => {
    // console.log('queryparams', query.search);
    let search = query.search ? query.search.toString() : '';
    if (search == '')
        return;
    search = search.replace('[semicon]', ';');
    // console.log('searchparam', search);
    let orContains = fields.map(v => {
        let where = {};
        where[v] = {
            contains: search,
        };
        return Object.assign({}, where);
    });
    return {
        OR: orContains,
    };
};
exports.getSearchQueryParams = getSearchQueryParams;
//# sourceMappingURL=queryParams.js.map