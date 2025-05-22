import bcrypt from "bcrypt";
import { UserRepository } from "../../repositories/users/users-repository";
import { UserDto } from "./users-dto";
import { usersFilter } from "./filter/users.filter";
import { paginationPrisma } from "../../helpers/pagination";
import { paginationHelper } from "../../helpers/pagination";
import { Prisma } from "@prisma/client";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: UserDto) {
    try {
      const { password, ...rest } = data;

      const userAlreadyExists = await this.userRepository.findOneByEmail({
        where: {
          email: data.email,
        },
      });

      if (userAlreadyExists) {
        throw new Error("Email ja existe.");
      }
      const newUser = await this.userRepository.create({
        data: {
          ...rest,
          password: bcrypt.hashSync(data.password, 10),
        },
      });
      return newUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAll(query: any) {
    try {
      const page = Number(query?.page);
      const limit = Number(query?.limit);
      const orderBy = query?.orderBy;
      const where = usersFilter(query);

      const data = await this.userRepository.findAll({
        where,
        select: {
          id: true,
          name: true,
          email: true,
        },
        orderBy,
        ...paginationPrisma(limit, page),
      });

      return paginationHelper(page, limit, data.count, data);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findOne(id: number, args?: Prisma.UsersFindFirstArgs) {
    try {
      const where = args?.where || { id, deletedAt: null };
      const data = await this.userRepository.findOne({ where, ...args });
      if (!data) throw new Error("Não foi encontrado usuário.");

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findOneByEmail(args: Prisma.UsersFindUniqueArgs) {
    try {
      const data = await this.userRepository.findOneByEmail(args);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async patch(where: Prisma.UsersWhereUniqueInput, data: UserDto) {
    try {
      await this.userRepository.update({
        where,
        data: data,
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: number) {
    try {
      await this.userRepository.delete({
        where: { id: id },
      });
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
