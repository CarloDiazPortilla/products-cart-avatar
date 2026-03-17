import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { UserRepository } from "../../infrastructure/repository/user.repository-impl";

export class AuthRouter {
  static get router() {
    const router = Router();
    const repository = new UserRepository()
    const service = new AuthService(repository)
    const controller = new AuthController(service);

    router.post("/login", controller.login);
    router.post("/refresh", controller.refresh);
    router.post("/logout", controller.logout);

    return router;
  }
}