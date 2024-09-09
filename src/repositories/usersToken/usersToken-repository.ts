import { PrismaClient } from "@prisma/client";

export class UsersTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: any) {
    const newUser = await this.prisma.userToken.create(data);
    return newUser;
  }

  async findAll(params: any) {    
    const query = await this.prisma.userToken.findMany(params);
    return query;
  }

  async findOne(params: any) {
    const findedUser = await this.prisma.userToken.findFirstOrThrow(params);
    return findedUser;
  }

  async findOneByToken(params: any) {
    const findedUser = await this.prisma.userToken.findUnique(params);
    return findedUser;
  }

  async update(params: any) {
    await this.prisma.userToken.update(params);
    return true;
  }

  async delete(params: any) {
    await this.prisma.userToken.delete(params);
    return true;
  }
}
