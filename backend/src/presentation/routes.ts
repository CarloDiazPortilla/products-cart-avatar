import { Router } from "express";
import { AuthRouter } from "./auth/routes";

export class ServerRouter {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRouter.router);
    // router.use("/api/cart",);

    return router;
  }
}