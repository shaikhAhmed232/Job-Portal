exports.paginate = (limit = 10, pageNo = 1) => {
    return {
        offset: pageNo * limit,
        limit
    }
};
