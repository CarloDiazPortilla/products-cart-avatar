import type { CartItem } from "./cart-item";

export interface Cart {
  id?: string;
  idUsuario?: string;
  items: CartItem[];
  totalCompra: number;
}