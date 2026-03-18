import { ICartDocument } from "../../data/mongodb/models/cart.model";
import { CartItem } from "./cart-item.entity";

export class Cart {
  constructor(
    public readonly id: string,
    public readonly idUsuario: string,
    public readonly items: CartItem[],
    public readonly fechaCreacion: Date,
    public readonly fechaActualizacion: Date,
    public readonly totalCompra: number,
  ) { }

  static toEntity = (doc: ICartDocument): Cart => {
    return new Cart(
      doc._id.toString(),
      doc.idUsuario.toString(),
      doc.items.map((i) => new CartItem(
        i.idProducto,
        i.sku,
        i.nombre,
        i.precio,
        i.cantidad,
        i.thumbnail
      )),
      doc.fechaCreacion,
      doc.fechaActualizacion,
      doc.totalCompra
    );
  };
}