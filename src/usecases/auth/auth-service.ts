import { AuthRepository } from "../../repositories/auth/auth-repository";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async generateToken({ id, email }: { id: number; email: string }) {
    const { accessToken, refreshToken } = await this.authRepository.generateToken({
      id,
      email,
    });
    return { accessToken, refreshToken };
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
