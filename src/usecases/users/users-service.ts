import bcrypt from "bcrypt";
import { UserRepository } from "../../repositories/users/users-repository";
import { UserDto } from "./users-dto";
import { paginationService } from "../../helpers/pagination";
import { usersFilter } from "./filter/users.filter";
import { paginationPrisma } from "../../helpers/pagination";
import { paginationHelper } from "../../helpers/pagination";
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: UserDto) {
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
  }

  async findAll(query: any) {
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
  }

  async findOne(
    id: number,
    options?: {
      where?: any;
      select?: any;
      include?: any;
    }
  ) {
    const optionsParams = paginationService({
      where: {
        id: id,
        ...options?.where,
      },
      select: options?.select,
      include: options?.include,
    });

    const data = await this.userRepository.findOne(optionsParams);
    return data;
  }

  async findOneByEmail(email: string) {
    const data = await this.userRepository.findOneByEmail({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    return data;
  }

  async patch(id: number, data: UserDto) {
    await this.userRepository.update({
      where: {
        id: id,
      },
      data: data,
    });

    return true;
  }

  async delete(id: number) {
    await this.userRepository.delete({
      where: { id: id },
    });
  }
}
