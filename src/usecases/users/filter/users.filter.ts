import { Prisma } from "@prisma/client";

export const usersFilter = (query: any) => {
  const where: Prisma.UsersWhereInput = {
    deletedAt: null,
  };
  if (query?.search) {
    where.OR = [{ name: query.search }, { email: query.search }];
  }

  return where;
};
