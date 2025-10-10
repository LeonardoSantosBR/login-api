import { Prisma, PrismaClient } from "@prisma/client";
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.UsersCreateInput) {
    const newUser = await this.prisma.users.create({ data });
    return newUser;
  }

  async findAll(params: Prisma.UsersFindManyArgs) {
    const [rows, count] = await Promise.all([
      this.prisma.users.findMany(params),
      this.prisma.users.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(params: Prisma.UsersFindFirstArgs) {
    const findedUser = await this.prisma.users.findFirst(params);
    return findedUser;
  }

  async findOneByEmail(params: Prisma.UsersFindUniqueArgs) {
    const findedUser = await this.prisma.users.findUnique(params);
    return findedUser;
  }

  async update(params: Prisma.UsersUpdateArgs) {
    await this.prisma.users.update(params);
    return true;
  }

  async delete(params: Prisma.UsersDeleteArgs) {
    await this.prisma.users.delete(params);
    return true;
  }
}
