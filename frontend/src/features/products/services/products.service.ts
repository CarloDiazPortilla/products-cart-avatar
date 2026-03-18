import axios from "axios";
import type { ApiProductResponse, Product } from "../../../shared/interfaces/product";
import { ENDPOINTS } from "../../../api/endpoints";

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<ApiProductResponse>(ENDPOINTS.PRODUCTS.GET, {
    params: {
      limit: 30
    }
  });
  return data.products.map((p) => ({
    id: p.id,
    title: p.title,
    brand: p.brand ?? "Sin marca",
    price: p.price,
    discountPercentage: p.discountPercentage,
    originalPrice: parseFloat((p.price / (1 - p.discountPercentage / 100)).toFixed(2)),
    thumbnail: p.thumbnail,
    sku: p.sku,
  }));
}