import { PrismaClient } from "@prisma/client";

import {
  IcreateParams,
  IfindAllParams,
  IfindOneParams,
  IfindOneUniqueParams,
  IupdateParams,
  IdeleteParams,
} from "../../types/users-token/Iusers-token";

export class UsersTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: IcreateParams) {
    const newUser = await this.prisma.usersToken.create(data);
    return newUser;
  }

  async findAll(params: IfindAllParams) {
    const query = await this.prisma.usersToken.findMany(params);
    return query;
  }

  async findOne(params: IfindOneParams) {
    const findedUser = await this.prisma.usersToken.findFirstOrThrow(params);
    return findedUser;
  }

  async findOneByToken(params: IfindOneUniqueParams) {
    const findedUser = await this.prisma.usersToken.findUnique(params);
    return findedUser;
  }

  async update(params: IupdateParams) {
    await this.prisma.usersToken.update(params);
    return true;
  }

  async delete(params: IdeleteParams) {
    await this.prisma.usersToken.delete(params);
    return true;
  }
}
