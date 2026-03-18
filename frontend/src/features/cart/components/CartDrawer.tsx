import { ShoppingCart, Trash2, X } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { Button } from "../../../components/ui/button";

export const CartDrawer = () => {
  const { cart, isOpen, closeCart, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">Carrito</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 opacity-20" />
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.idProducto}
                className="flex gap-3 p-3 rounded-lg border bg-background"
              >
                <img
                  src={item.thumbnail}
                  alt={item.nombre}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2 leading-snug">{item.nombre}</p>
                  <p className="text-xs text-muted-foreground mt-1">SKU: {item.sku}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-xs text-muted-foreground">
                        {item.cantidad} × ${item.precio.toFixed(2)}
                      </span>
                      <p className="text-sm font-bold text-primary">
                        ${(item.cantidad * item.precio).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive h-8 w-8"
                      onClick={() => removeItem(item.idProducto)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {cart.items.reduce((s, i) => s + i.cantidad, 0)} productos
              </span>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-xl font-bold text-foreground">
                  ${cart.totalCompra.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
