import { Request, Response } from "express";
import { UserService } from "../users/users-service";
import { AuthService } from "./auth-service";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async signIn(request: Request, response: Response) {
    try {
      const { email, password }: { email: string; password: string } =
        request.body;
      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        return response.status(400).send({
          message: "Email não encontrado.",
        });
      }

      const isPasswordValid = await this.authService.isPasswordValid({
        password: password,
        userPassword: user.password,
      });

      if (!isPasswordValid) {
        return response.status(400).send({
          message: "Senha inválida.",
        });
      }

      const { accessToken, refreshToken } =
        await this.authService.generateToken({
          id: user.id,
          email: user.email,
        });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      return response.status(500).send({
        message: error.message || "unexpected error",
      });
    }
  }
}
