import { UserRepository } from "../../repositories/users/users-repository";
import { UserService } from "./users-service";
import { UsersController } from "./users-controller";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);
const userService = new UserService(userRepo);
const userController = new UsersController(userService);

export { userController };
