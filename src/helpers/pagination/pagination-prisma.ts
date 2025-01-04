export const paginationPrisma = (limit: number, page: number) => {
  if (!limit || !page) return {};
  return {
    skip: (page - 1) * limit || 0,
    take: Number(limit),
  };
};
