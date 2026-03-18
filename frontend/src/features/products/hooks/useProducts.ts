import { useEffect, useState } from "react";
import type { Product } from "../../../shared/interfaces/product";
import { getAllProducts } from "../services/products.service";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
