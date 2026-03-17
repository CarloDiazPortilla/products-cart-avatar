import { CartItem } from "../entities/cart-item.entity";
import { Cart } from "../entities/cart.entity";

export interface ICartRepository {
  findByUserId(userId: string): Promise<Cart | null>;
  create(userId: string): Promise<Cart>;
  addItem(cartId: string, item: CartItem): Promise<Cart>;
  removeItem(cartId: string, idProducto: number): Promise<Cart | null>;
  getItems(cartId: string): Promise<Cart | null>;
}
