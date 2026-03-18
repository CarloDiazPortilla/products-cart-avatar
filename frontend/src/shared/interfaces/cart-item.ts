export interface CartItem {
  idProducto: number;
  sku: string;
  nombre: string;
  precio: number;
  cantidad: number;
  thumbnail: string;
}

export interface AddItemPayload {
  idProducto: number;
  sku: string;
  nombre: string;
  precio: number;
  cantidad: number;
  thumbnail: string;
}