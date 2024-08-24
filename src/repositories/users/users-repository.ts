import { PrismaClient, Users } from "@prisma/client";

import {
  createParams,
  findAllParams,
  findOneParams,
  updateParams,
  deleteParams,
  findOneUniqueParams,
} from "../../types/users/users-types";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: createParams) {
    const newUser = await this.prisma.users.create(data);
    return newUser;
  }

  async findAll(params: findAllParams) {
    const query = await this.prisma.users.findMany(params);
    return query;
  }

  async findOne(params: findOneParams) {
    const findedUser = await this.prisma.users.findFirstOrThrow(params);
    return findedUser;
  }

  async findOneByEmail(params: findOneUniqueParams) {
    const findedUser = await this.prisma.users.findUnique(params);
    return findedUser;
  }

  async update(params: updateParams) {
    await this.prisma.users.update(params);
    return true;
  }

  async delete(params: deleteParams) {
    await this.prisma.users.delete(params);
    return true;
  }
}
