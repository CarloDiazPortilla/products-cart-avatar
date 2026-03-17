import { CartItem } from "./cart-item.entity";

export class Cart {
  constructor(
    public readonly id: string,
    public readonly idUsuario: string,
    public readonly items: CartItem[],
    public readonly totalCompra: number,
    public readonly fechaCreacion: Date,
    public readonly fechaActualizacion: Date,
  ) { }
}