import { Product } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
  onAddToCart: (size: number) => void;
}

export function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] cursor-pointer"
      data-testid={`card-product-${product.id}`}
    >
      <div onClick={onViewDetails}>
        <div className="aspect-[4/5] bg-gradient-to-br from-med-sand via-med-cream to-white flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-24 h-32 mx-auto mb-4 bg-gradient-to-br from-med-sand via-med-gold to-amber-700 rounded-lg opacity-80" />
            <p className="font-serif text-med-sea text-sm">{product.type}</p>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-semibold text-med-sea" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
            <Badge 
              variant="secondary" 
              className="bg-med-sand text-med-sea capitalize shrink-0"
              data-testid={`badge-category-${product.id}`}
            >
              {product.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-2xl font-bold text-med-gold" data-testid={`text-price-${product.id}`}>
                ${product.price}
              </p>
              <p className="text-xs text-muted-foreground">10ml</p>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(10);
              }}
              className="bg-med-gold hover:bg-med-gold/90 text-white"
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
