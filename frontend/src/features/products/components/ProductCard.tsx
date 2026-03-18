import { ShoppingCart } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import type { Product } from '../../../shared/interfaces/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  adding: boolean;
}

export const ProductCard = ({ product, onAddToCart, adding }: ProductCardProps) => {
  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
          -{Math.round(product.discountPercentage)}%
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
          {product.title}
        </h3>

        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={adding}
            className="gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}
