import { Router } from "express";

export class ServerRouter {
  static get routes(): Router {
    const router = Router();

    // router.use("/api/auth",);
    // router.use("/api/cart",);

    return router;
  }
}