import { IpaginationController } from "../../types/pagination/Ipagination-controller";

export const paginationController = ({
  page,
  limit,
  where,
  select,
  include,
  orderBy,
}: any) => {
  const options: IpaginationController = {};

  if (Number(page)) options.page = page;

  if (Number(limit)) options.limit = limit;

  if (where) options.where = JSON.parse(where);

  if (select) options.select = JSON.parse(select);

  if (include) options.include = JSON.parse(include);

  if (orderBy) options.orderBy = JSON.parse(orderBy);

  return options;
};
