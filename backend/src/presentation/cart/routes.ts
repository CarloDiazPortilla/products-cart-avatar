import { Router } from "express";
import { authMiddleware } from "../../infrastructure/middleware/auth.middleware";

export class CartRouter {
  static get router() {
    const router = Router()
    router.use(authMiddleware);


    return router;
  }
}