import { Prisma } from "@prisma/client";

export interface createParams {
  data: Prisma.UsersCreateInput;
  include?: Prisma.UsersInclude;
}

export interface findAllParams {
  where?: Prisma.UsersWhereInput;
  include?: Prisma.UsersInclude;
  select?: Prisma.UsersSelect;
  orderBy?: Prisma.UsersOrderByWithAggregationInput;
  skip?: number;
  take?: number;
}

export interface findOneParams {
  where?: Prisma.UsersWhereInput;
  include?: Prisma.UsersInclude | null;
  select?: Prisma.UsersSelect | null;
}

export interface findOneUniqueParams {
  where: Prisma.UsersWhereUniqueInput;
  select?: Prisma.UsersSelect | null;
}

export interface updateParams {
  where: Prisma.UsersWhereUniqueInput;
  data: Prisma.UsersUpdateInput;
}

export interface deleteParams {
  where: Prisma.UsersWhereUniqueInput;
}
