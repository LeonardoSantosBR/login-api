import { Prisma, PrismaClient } from "@prisma/client";
export class UsersTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.UsersTokenCreateInput) {
    const newUser = await this.prisma.usersToken.create({ data });
    return newUser;
  }

  async findAll(params: Prisma.UsersTokenFindManyArgs) {
    const query = await this.prisma.usersToken.findMany(params);
    return query;
  }

  async findOne(params: Prisma.UsersTokenFindFirstArgs) {
    const findedUser = await this.prisma.usersToken.findFirstOrThrow(params);
    return findedUser;
  }

  async findOneByToken(params: Prisma.UsersTokenFindUniqueArgs) {
    const findedUser = await this.prisma.usersToken.findUnique(params);
    return findedUser;
  }

  async update(params: Prisma.UsersTokenUpdateArgs) {
    await this.prisma.usersToken.update(params);
    return true;
  }

  async delete(params: Prisma.UsersTokenDeleteArgs) {
    await this.prisma.usersToken.delete(params);
    return true;
  }
}
