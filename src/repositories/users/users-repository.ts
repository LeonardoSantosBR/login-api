import { PrismaClient } from "@prisma/client";

import {
  IcreateParams,
  IfindAllParams,
  IfindOneParams,
  IupdateParams,
  IdeleteParams,
  IfindOneUniqueParams,
} from "../../types/users/Iusers-types";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: IcreateParams) {
    const newUser = await this.prisma.users.create(data);
    return newUser;
  }

  async findAll(params: IfindAllParams) {
    const [rows, count] = await Promise.all([
      this.prisma.users.findMany(params),
      this.prisma.users.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(params: IfindOneParams) {
    const findedUser = await this.prisma.users.findFirstOrThrow(params);
    return findedUser;
  }

  async findOneByEmail(params: IfindOneUniqueParams) {
    const findedUser = await this.prisma.users.findUnique(params);
    return findedUser;
  }

  async update(params: IupdateParams) {
    await this.prisma.users.update(params);
    return true;
  }

  async delete(params: IdeleteParams) {
    await this.prisma.users.delete(params);
    return true;
  }
}
