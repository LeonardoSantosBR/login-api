import { AuthRepository } from "../../repositories/auth/auth-repository";
import { UsersTokenRepository } from "../../repositories/users-token/users-token-repository";

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly usersTokensRepository: UsersTokenRepository
  ) {}

  async generateToken({ id, email }: { id: number; email: string }) {
    try {
      const { accessToken, refreshToken } =
        await this.authRepository.generateToken({
          id,
          email,
        });

      const userHasToken = await this.usersTokensRepository.findOneByToken({
        where: {
          userId: id,
        },
        select: {
          id: true,
          token: true,
        },
      });

      if (!userHasToken) {
        await this.usersTokensRepository.create({
          data: {
            token: accessToken,
            tokens: {
              connect: {
                id: id,
              },
            },
          },
        });
      } else {
        await this.usersTokensRepository.update({
          where: {
            id: userHasToken.id,
          },
          data: {
            token: accessToken,
          },
        });
      }

      return { accessToken, refreshToken };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async verifyUserByToken(token: string) {
    try {
      const user = await this.usersTokensRepository.findOneByToken({
        where: {
          token: token,
        },
      });

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async isPasswordValid({
    password,
    userPassword,
  }: {
    password: string;
    userPassword: string;
  }) {
    try {
      const isPasswordValid = await this.authRepository.validatePassword({
        password,
        userPassword,
      });

      return isPasswordValid;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
