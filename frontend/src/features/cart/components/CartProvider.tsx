import type { Cart } from "../../../shared/interfaces/cart";
import type { AddItemPayload } from "../../../shared/interfaces/cart-item";
import { useAuth } from "../../auth/hooks/useAuth";
import useAlert from "../../../shared/hooks/useAlert";
import React, { useCallback, useEffect, useState } from "react";
import {
  getCart as getCartService,
  addItem as addItemService,
  removeItem as removeItemService
} from "../services/cart.service";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const alert = useAlert();

  const [cart, setCart] = useState<Cart>({ items: [], totalCompra: 0 });
  const [adding, setAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cart.items.reduce((s, i) => s + i.cantidad, 0);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await getCartService();
      setCart(data);
    } catch (error) {
      console.log(error)
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(
    async (payload: AddItemPayload) => {
      setAdding(true);
      try {
        const updated = await addItemService(payload);
        setCart(updated);
        alert.success(`Producto agregado: ${payload.nombre}`);
      } catch {
        alert.error("No se pudo agregar el producto");
      } finally {
        setAdding(false);
      }
    },
    [alert]
  );

  const removeItem = useCallback(
    async (idProducto: number) => {
      try {
        const updated = await removeItemService(idProducto);
        setCart(updated);
        alert.success("Producto eliminado del carrito");
      } catch {
        alert.error("No se pudo eliminar el producto");
      }
    },
    [alert]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        adding,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
