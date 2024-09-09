import { PrismaClient } from "@prisma/client";

//controllers
import { AuthController } from "./auth-controller";

//repository
import { UserRepository } from "../../repositories/users/users-repository";
import { AuthRepository } from "../../repositories/auth/auth-repository";
import { UsersTokenRepository } from "../../repositories/usersToken/usersToken-repository";

//services
import { UserService } from "../users/users-service";
import { AuthService } from "./auth-service";

const prisma = new PrismaClient();
const authRepo = new AuthRepository();
const usersTokenRepo = new UsersTokenRepository(prisma);
const userRepo = new UserRepository(prisma);
const authService = new AuthService(authRepo, usersTokenRepo);
const userService = new UserService(userRepo);
const authController = new AuthController(authService, userService);

export { authController };
