import { Loader2, LogOut, Package, ShoppingCart } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { Button } from "../../../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { CartDrawer } from "../../cart/components/CartDrawer";
import { useCart } from "../../cart/hooks/useCart";
import type { Product } from "../../../shared/interfaces/product";

export const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const { user, logout } = useAuth();
  const { addItem, adding, cartCount, openCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      idProducto: product.id,
      sku: product.sku,
      nombre: product.title,
      precio: product.price,
      cantidad: 1,
      thumbnail: product.thumbnail,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Navbar */}
        <header className="sticky top-0 z-30 bg-card border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Product cart</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Hola, {user?.name}
              </span>

              <Button variant="outline" size="sm" className="relative gap-2" onClick={openCart}>
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Carrito</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">Productos</h1>

          {loading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-24 text-destructive">{error}</div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  adding={adding}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      <CartDrawer />
    </>

  );
}
