export class CartItem {
  constructor(
    public readonly idProducto: number,
    public readonly sku: string,
    public readonly nombre: string,
    public readonly precio: number,
    public readonly cantidad: number,
    public readonly thumbnail: string,
  ) { }
}