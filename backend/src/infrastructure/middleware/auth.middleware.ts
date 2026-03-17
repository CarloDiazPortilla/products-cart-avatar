import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../domain/entities/api-response.entity";
import { JwtAdapter } from "../../config/jwt.adapter";
import { EnvironmentAdapter } from "../../config/environment.adapter";

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json(ApiResponse.buildResponse(401, "Access token required", null));
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json(ApiResponse.buildResponse(401, "Couldn't get access token", null));
    return;
  }
  try {
    const payload = await JwtAdapter.verify(token, EnvironmentAdapter.envs.JWT_ACCESS_SECRET) as {
      sub: string;
      email: string;
    };
    req.userId = payload.sub;
    req.userEmail = payload.email;
    next();
  } catch {
    res.status(401).json(ApiResponse.buildResponse(401, "Invalid or expired access token", null));
  }
};
