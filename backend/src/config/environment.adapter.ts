import "dotenv/config";
import env from "env-var";

export class EnvironmentAdapter {
  static readonly envs = {
    MONGO_URI: env.get("MONGO_URI").required().asString(),
    PORT: env.get("PORT").default(3000).asPortNumber(),
  }
}