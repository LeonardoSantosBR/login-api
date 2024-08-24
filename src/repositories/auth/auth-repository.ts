import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class AuthRepository {
  constructor() {}

  async generateToken({ id, email }: { id: number; email: string }) {
    const refreshToken = uuidv4();
    const envTokenSecret: any = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign({ id, email }, envTokenSecret, {
      expiresIn: "15m",
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async validatePassword({
    password,
    userPassword,
  }: {
    password: string;
    userPassword: string;
  }) {
    const validate = await bcrypt.compare(password, userPassword);
    return validate;
  }
}
