import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../infrastructure/repository/user.repository-impl";
import { EnvironmentAdapter } from "../../config/environment.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }
  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return this.generateTokens(user.id, user.name, user.email);
  }

  async refreshTokens(refreshToken: string) {
    let payload: { sub: string; name: string; email: string };
    try {
      payload = jwt.verify(refreshToken, EnvironmentAdapter.envs.JWT_REFRESH_SECRET) as typeof payload;
    } catch {
      throw new Error("Invalid refresh token");
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) throw new Error("User not found");

    return this.generateTokens(user.id, user.name, user.email);
  }

  private async generateTokens(id: string, name: string, email: string) {
    const accessToken = await JwtAdapter.sign(
      { sub: id, name, email },
      EnvironmentAdapter.envs.JWT_ACCESS_SECRET,
      EnvironmentAdapter.envs.JWT_ACCESS_EXPIRES as `${number}${'s' | 'm' | 'h' | 'd'}`
    );

    const refreshToken = await JwtAdapter.sign(
      { sub: id, name, email },
      EnvironmentAdapter.envs.JWT_REFRESH_SECRET,
      EnvironmentAdapter.envs.JWT_REFRESH_EXPIRES as `${number}${'s' | 'm' | 'h' | 'd'}`
    );

    return { accessToken, refreshToken, user: { id, name, email } };
  }
}