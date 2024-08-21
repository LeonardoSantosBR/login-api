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
  where?: Prisma.UsersWhereUniqueInput;
  include?: Prisma.UsersInclude;
  select?: Prisma.UsersSelect;
}

export interface updateParams {
  where: Prisma.UsersWhereUniqueInput;
  data: Prisma.UsersUpdateInput;
}

export interface deleteParams {
  where: Prisma.UsersWhereUniqueInput;
}
