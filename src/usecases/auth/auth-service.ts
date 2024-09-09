import { AuthRepository } from "../../repositories/auth/auth-repository";
import { UsersTokenRepository } from "../../repositories/usersToken/usersToken-repository";

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly usersTokensRepository: UsersTokenRepository
  ) {}

  async generateToken({ id, email }: { id: number; email: string }) {
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
          userId: id,
          token: accessToken,
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
  }

  async verifyUserByToken(token: string) {
    const user = await this.usersTokensRepository.findOneByToken({
      where: {
        token: token,
      },
    });

    return user;
  }

  async isPasswordValid({
    password,
    userPassword,
  }: {
    password: string;
    userPassword: string;
  }) {
    const isPasswordValid = await this.authRepository.validatePassword({
      password,
      userPassword,
    });

    return isPasswordValid;
  }
}
