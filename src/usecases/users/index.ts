import { PrismaClient } from "@prisma/client";

//repository
import { UserRepository } from "../../repositories/users/users-repository";

//services
import { UserService } from "./users-service";

//controllers
import { UsersController } from "./users-controller";


const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);
const userService = new UserService(userRepo);
const userController = new UsersController(userService);

export { userController };
