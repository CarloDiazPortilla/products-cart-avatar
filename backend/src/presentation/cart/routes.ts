import { Router } from "express";
import { authMiddleware } from "../../infrastructure/middleware/auth.middleware";
import { CartController } from "./controller";
import { CartService } from "./service";
import { CartRepository } from "../../infrastructure/repository/cart.repository-impl";

export class CartRouter {
  static get router() {
    const router = Router()
    const repository = new CartRepository();
    const service = new CartService(repository);
    const controller = new CartController(service);

    router.use(authMiddleware);

    router.get("/", controller.getCart);
    router.post("/items", controller.addItem);
    router.delete("/items/:idProducto", controller.removeItem);


    return router;
  }
}