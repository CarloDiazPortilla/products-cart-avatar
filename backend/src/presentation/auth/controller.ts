import type { Request, Response } from "express"
import { AuthService } from "./service";
import { ApiResponse } from "../../domain/entities/api-response.entity";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const tokens = await this.authService.login(email, password);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json(
        ApiResponse.buildResponse(200, "Login successful", {
          accessToken: tokens.accessToken,
          user: tokens.user,
        })
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      res.status(401).json(ApiResponse.buildResponse(401, message, null));
    }
  };

  refresh = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        res.status(401).json(ApiResponse.buildResponse(401, "Refresh token not found", null));
        return;
      }

      const tokens = await this.authService.refreshTokens(refreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json(
        ApiResponse.buildResponse(200, "Token refreshed", {
          accessToken: tokens.accessToken,
          user: tokens.user,
        })
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Token refresh failed";
      res.status(401).json(ApiResponse.buildResponse(401, message, null));
    }
  };

  logout = (_req: Request, res: Response): void => {
    res.clearCookie("refreshToken");
    res.status(200).json(ApiResponse.buildResponse(200, "Logged out successfully", null));
  };
}