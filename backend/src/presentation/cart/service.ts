import { CartItem } from "../../domain/entities/cart-item.entity";
import { Cart } from "../../domain/entities/cart.entity";
import { CartRepository } from "../../infrastructure/repository/cart.repository-impl";

export class CartService {
  constructor(
    private readonly cartRepository: CartRepository
  ) { }
  async addItem(userId: string, item: CartItem): Promise<Cart> {
    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.create(userId);
    }
    return this.cartRepository.addItem(cart.id, item);
  }

  async getCart(userId: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) return null;
    return this.cartRepository.getItems(cart.id);
  }

  async removeItem(userId: string, idProducto: number): Promise<Cart | null> {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) throw new Error("Cart not found");
    return this.cartRepository.removeItem(cart.id, idProducto);
  }
}