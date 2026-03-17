import { Cart } from "../../domain/entities/cart.entity";
import { CartItem } from "../../domain/entities/cart-item.entity";
import { CartModel } from "../../data/mongodb/models/cart.model";
import { ICartRepository } from "../../domain/repository/cart.repository";

const recalcTotal = (items: CartItem[]): number =>
  parseFloat(items.reduce((sum, i) => sum + i.precio * i.cantidad, 0).toFixed(2));

export class CartRepository implements ICartRepository {
  async findByUserId(userId: string): Promise<Cart | null> {
    const doc = await CartModel.findOne({ idUsuario: userId });
    return doc ? Cart.toEntity(doc) : null;
  }

  async create(userId: string): Promise<Cart> {
    const doc = await CartModel.create({
      idUsuario: userId,
      items: [],
      totalCompra: 0,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    });
    return Cart.toEntity(doc);
  }

  async addItem(cartId: string, item: CartItem): Promise<Cart> {
    const doc = await CartModel.findById(cartId);
    if (!doc) throw new Error("Cart not found");

    const existingIdx = doc.items.findIndex((i) => i.idProducto === item.idProducto);
    if (existingIdx >= 0 && doc.items[existingIdx]) {
      doc.items[existingIdx].cantidad += item.cantidad;
    } else {
      doc.items.push(item);
    }

    const items = doc.items.map((i) => ({
      idProducto: i.idProducto,
      sku: i.sku,
      nombre: i.nombre,
      precio: i.precio,
      cantidad: i.cantidad,
      thumbnail: i.thumbnail,
    }));

    doc.totalCompra = recalcTotal(items);
    doc.fechaActualizacion = new Date();
    await doc.save();
    return Cart.toEntity(doc);
  }

  async removeItem(cartId: string, idProducto: number): Promise<Cart | null> {
    const doc = await CartModel.findById(cartId);
    if (!doc) return null;

    doc.items = doc.items.filter((i) => i.idProducto !== idProducto) as typeof doc.items;

    const items = doc.items.map((i) => ({
      idProducto: i.idProducto,
      sku: i.sku,
      nombre: i.nombre,
      precio: i.precio,
      cantidad: i.cantidad,
      thumbnail: i.thumbnail,
    }));

    doc.totalCompra = recalcTotal(items);
    doc.fechaActualizacion = new Date();
    await doc.save();
    return Cart.toEntity(doc);
  }

  async getItems(cartId: string): Promise<Cart | null> {
    const doc = await CartModel.findById(cartId);
    return doc ? Cart.toEntity(doc) : null;
  }
}
