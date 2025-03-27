import { Prisma } from "@prisma/client";

export interface IcreateParams {
  data: Prisma.UsersCreateInput;
  include?: Prisma.UsersInclude;
}

export interface IfindAllParams {
  where?: Prisma.UsersWhereInput;
  include?: Prisma.UsersInclude;
  select?: Prisma.UsersSelect;
  orderBy?: Prisma.UsersOrderByWithAggregationInput;
  skip?: number;
  take?: number;
}

export interface IfindOneParams {
  where?: Prisma.UsersWhereInput;
  include?: Prisma.UsersInclude | null;
  select?: Prisma.UsersSelect | null;
}

export interface IfindOneUniqueParams {
  where: Prisma.UsersWhereUniqueInput;
  select?: Prisma.UsersSelect | null;
}

export interface IupdateParams {
  where: Prisma.UsersWhereUniqueInput;
  data: Prisma.UsersUpdateInput;
}

export interface IdeleteParams {
  where: Prisma.UsersWhereUniqueInput;
}
