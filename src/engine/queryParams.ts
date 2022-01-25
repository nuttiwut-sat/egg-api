export const getSortQueryParams = (query: any) => {
    let sortField = query.sort ? query.sort.toString() : 'createdAt';
    let direction = (
        query.direction ? query.direction.toString().toLowerCase() : 'desc'
    ) as 'asc' | 'desc';
    let orderBy: any = {};
    orderBy[sortField] = direction;

    return orderBy;
};

export const getSearchQueryParams = (query: any, fields: string[]) => {
    // console.log('queryparams', query.search);

    let search = query.search ? query.search.toString() : '';
    if (search == '') return;
    search = search.replace('[semicon]', ';');
    // console.log('searchparam', search);

    let orContains = fields.map(v => {
        let where = {} as any;
        where[v] = {
            contains: search,
        };
        return {
            ...where,
        };
    });

    return {
        OR: orContains,
    };
};
