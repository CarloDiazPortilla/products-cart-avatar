import { createContext } from "react";
import type { Cart } from "../../../shared/interfaces/cart";
import type { AddItemPayload } from "../../../shared/interfaces/cart-item";

interface CartContextValue {
  cart: Cart;
  cartCount: number;
  adding: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (payload: AddItemPayload) => Promise<void>;
  removeItem: (idProducto: number) => Promise<void>;
  fetchCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue | null>(null);