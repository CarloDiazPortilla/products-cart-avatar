import "dotenv/config";
import env from "env-var";

export class EnvironmentAdapter {
  static readonly envs = {
    MONGO_URI: env.get("MONGO_URI").required().asString(),
    PORT: env.get("PORT").default(3000).asPortNumber(),
    FRONTEND_URL: env.get("FRONTEND_URL").required().asString(),
    JWT_ACCESS_SECRET: env.get("JWT_ACCESS_SECRET").required().asString(),
    JWT_REFRESH_SECRET: env.get("JWT_REFRESH_SECRET").required().asString(),
    JWT_ACCESS_EXPIRES: env.get("JWT_ACCESS_EXPIRES").required().asString(),
    JWT_REFRESH_EXPIRES: env.get("JWT_REFRESH_EXPIRES").required().asString(),
  }
}