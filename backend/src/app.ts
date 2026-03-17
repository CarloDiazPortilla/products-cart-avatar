import { EnvironmentAdapter } from "./config/environment.adapter";
import { connectDB } from "./data/mongodb/init";
import { ServerRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main()
})();

async function main() {

  await connectDB();

  const server = new Server({
    port: EnvironmentAdapter.envs.PORT,
    routes: ServerRouter.routes,
    frontend_url: EnvironmentAdapter.envs.FRONTEND_URL,
  });

  await server.start();
}