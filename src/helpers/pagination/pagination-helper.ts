export const paginationHelper = (
    page: any,
    limit: any,
    count: any,
    data: any,
  ) => {
    if (page && limit) {
      return {
        pagination: {
          page: page ? Number(page) : 1,
          lastPage: limit ? Math.ceil(count / limit) : 1,
          totalQuantity: count,
        },
        count: count,
        rows: data?.rows,
      };
    }
    return data;
  };
  