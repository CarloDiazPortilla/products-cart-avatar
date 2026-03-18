import { ApiResponse } from "../../domain/entities/api-response.entity";
import type { AuthRequest } from "../../infrastructure/middleware/auth.middleware";
import type { Response } from "express"
import { CartService } from "./service";

export class CartController {
  constructor(
    private readonly cartService: CartService
  ) { }
  addItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const { idProducto, sku, nombre, precio, cantidad, thumbnail } = req.body;
      const cart = await this.cartService.addItem(userId, {
        idProducto,
        sku,
        nombre,
        precio,
        cantidad,
        thumbnail,
      });
      res.status(200).json(ApiResponse.buildResponse(200, "Item added to cart", cart));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to add item";
      res.status(500).json(ApiResponse.buildResponse(500, message, null));
    }
  };

  getCart = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const cart = await this.cartService.getCart(req.userId!);
      if (!cart) {
        res.status(200).json(ApiResponse.buildResponse(200, "Cart is empty", { items: [], totalCompra: 0 }));
        return;
      }
      res.status(200).json(ApiResponse.buildResponse(200, "Cart retrieved", cart));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to get cart";
      res.status(500).json(ApiResponse.buildResponse(500, message, null));
    }
  };

  removeItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (typeof req.params.idProducto !== "string") {
        res.status(400).json(ApiResponse.buildResponse(400, "idProducto is required", null));
        return;
      }
      const idProducto = parseInt(req.params.idProducto, 10);
      if (isNaN(idProducto)) {
        res.status(400).json(ApiResponse.buildResponse(400, "Invalid idProducto", null));
        return;
      }
      const cart = await this.cartService.removeItem(req.userId!, idProducto);
      res.status(200).json(ApiResponse.buildResponse(200, "Item removed from cart", cart));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to remove item";
      res.status(500).json(ApiResponse.buildResponse(500, message, null));
    }
  };
}