import { IpaginationService } from "../../types/pagination/Ipagination-service";

export const paginationService = ({
  page,
  limit,
  where,
  select,
  include,
  orderBy,
}: any) => {
  const options: IpaginationService = {};

  if ((page || page === 0) && limit) {
    options.skip = (page - 1) * limit;
  }

  if (limit) {
    options.take = parseInt(limit);
  }

  if (where) {
    options.where = where;
  }
  if (orderBy) {
    options.orderBy = orderBy;
  }
  if (select) {
    options.select = select;
  }
  if (include) {
    options.include = include;
  }

  return options;
};
