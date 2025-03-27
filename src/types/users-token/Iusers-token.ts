import { Prisma } from "@prisma/client";

export interface IcreateParams {
  data: Prisma.UsersTokenCreateInput;
  include?: Prisma.UsersTokenInclude;
}

export interface IfindAllParams {
  where?: Prisma.UsersTokenWhereInput;
  include?: Prisma.UsersTokenInclude;
  select?: Prisma.UsersTokenSelect;
  orderBy?: Prisma.UsersTokenOrderByWithAggregationInput;
  skip?: number;
  take?: number;
}

export interface IfindOneParams {
  where?: Prisma.UsersTokenWhereInput;
  include?: Prisma.UsersTokenInclude | null;
  select?: Prisma.UsersTokenSelect | null;
}

export interface IfindOneUniqueParams {
  where: Prisma.UsersTokenWhereUniqueInput;
  select?: Prisma.UsersTokenSelect | null;
}

export interface IupdateParams {
  where: Prisma.UsersTokenWhereUniqueInput;
  data: Prisma.UsersTokenUpdateInput;
}

export interface IdeleteParams {
  where: Prisma.UsersTokenWhereUniqueInput;
}