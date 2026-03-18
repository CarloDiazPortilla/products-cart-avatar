import { apiClient } from "../../../api/axios";
import type { ApiResponse } from "../../../shared/interfaces/api-response";
import type { Cart } from "../../../shared/interfaces/cart";
import type { AddItemPayload } from "../../../shared/interfaces/cart-item";


export const getCart = async (): Promise<Cart> => {
  const { data } = await apiClient.get<ApiResponse<Cart>>("/cart");
  return data.data ?? { items: [], totalCompra: 0 };
}

export const addItem = async (payload: AddItemPayload): Promise<Cart> => {
  const { data } = await apiClient.post<ApiResponse<Cart>>("/cart/items", payload);
  return data.data!;
}

export const removeItem = async (idProducto: number): Promise<Cart> => {
  const { data } = await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${idProducto}`);
  return data.data!;
}
