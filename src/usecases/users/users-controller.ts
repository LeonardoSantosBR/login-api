import { Request, Response } from "express";
import { UserService } from "./users-service";
import { CreateUserSchema } from "./user-schema";
import { UpdateUserSchema } from "./user-schema";
import { paginationController } from "../../helpers/pagination/pagination-controller";
import { paginationHelper } from "../../helpers/pagination/pagination-helper";

export class UsersController {
  constructor(private readonly userService: UserService) {}

  async create(request: Request, response: Response) {
    try {
      const body = request.body;
      const { error } = CreateUserSchema.validate(body, { abortEarly: false });

      if (error) {
        return response.status(400).json({
          message: error.details
            .map((detail: any) => detail.message)
            .join(", "),
        });
      }

      const data = await this.userService.create(body);

      return response.status(200).json(data);
    } catch (error: any) {
      return response.status(500).json({
        message: error.message || "unexpected error",
      });
    }
  }

  async findAll(request: Request, response: Response) {
    try {
      const { page, limit, where, select, include, orderBy } = request.query;

      const options = paginationController({
        page,
        limit,
        where,
        select,
        include,
        orderBy,
      });

      const data = await this.userService.findAll(options);

      if (page && limit) {
        const pagination = paginationHelper(
          page,
          limit,
          data.count,
          data.totalCount
        );

        delete data.totalCount;
        return { items: data.items, pagination };
      }

      return data;
    } catch (error: any) {
      return response.status(500).json({
        message: error.message || "unexpected error",
      });
    }
  }

  async findOne(request: Request, response: Response) {
    try {
      const options = paginationController(request.query);
      const data = await this.userService.findOne(
        Number(request.params.id),
        options
      );
      return data;
    } catch (error: any) {
      return response.status(500).json({
        message: error.message || "unexpected error",
      });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const body = request.body;

      const { error } = UpdateUserSchema.validate(body, { abortEarly: false });

      if (error) {
        return response.status(400).json({
          message: error.details
            .map((detail: any) => detail.message)
            .join(", "),
        });
      }

      await this.userService.update(Number(id), body);
      return response.status(204).send("Usuário atualizado com sucesso.");
    } catch (error: any) {
      return response.status(500).json({
        message: error.message || "unexpected error",
      });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id)
        return response.status(400).json({
          message: "Id não enviado.",
        });

      await this.userService.delete(Number(id));
      return response.status(204).send("Usuário deletado com sucesso.");
    } catch (error: any) {
      return response.status(500).json({
        message: error.message || "unexpected error",
      });
    }
  }
}
