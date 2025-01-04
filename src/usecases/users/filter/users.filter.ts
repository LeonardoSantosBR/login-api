export const usersFilter = (query: any) => {
  const where: any = {
    deletedAt: null,
  };

  if (query?.name) {
    where.name = {
      contains: query.name,
    };
  }

  if (query?.email) {
    where.email = {
      contains: query.email,
    };
  }

  return where;
};
