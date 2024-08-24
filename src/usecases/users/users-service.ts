import { Users } from "@prisma/client";
import { UserRepository } from "../../repositories/users/users-repository";
import { UserDto } from "./users-dto";
import { paginationService } from "../../helpers/pagination/pagination-service";
import { IpaginationService } from "../../types/pagination/Ipagination-service";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: UserDto) {
    const newUser = await this.userRepository.create({
      data: data,
    });

    return newUser;
  }

  async findAll({
    page,
    limit,
    where,
    select,
    include,
    orderBy,
  }: IpaginationService) {
    const options = paginationService({
      page,
      limit,
      where,
      select,
      include,
      orderBy,
    });

    const [items, count] = await Promise.all([
      this.userRepository.findAll(options),
      this.userRepository.findAll({
        where: options.where || {},
      }),
    ]);

    const data: {
      items: Array<Users>;
      count: number;
      totalCount?: number;
    } = {
      items: items,
      count: count.length,
      totalCount: count.length,
    };

    return data;
  }

  async findOne(
    id: number,
    options?: {
      where?: any;
      select?: any;
      include?: any;
    }
  ) {
    const optionsService = paginationService({
      where: {
        id: id,
        ...options?.where,
      },
      select: options?.select,
      include: options?.include,
    });

    const data = await this.userRepository.findOne(optionsService);
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
