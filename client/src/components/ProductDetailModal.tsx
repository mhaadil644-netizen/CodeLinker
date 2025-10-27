import { Product } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ShoppingCart, Clock, Waves } from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, size: number) => void;
}

const SIZES = [
  { ml: 10, multiplier: 1 },
  { ml: 30, multiplier: 2.8 },
  { ml: 50, multiplier: 4.5 },
  { ml: 100, multiplier: 8.5 },
];

export function ProductDetailModal({ product, open, onClose, onAddToCart }: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState(10);

  if (!product) return null;

  const price = (product.price * (SIZES.find(s => s.ml === selectedSize)?.multiplier || 1)).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-product-detail">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl text-med-sea">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gradient-to-br from-med-sand via-med-cream to-white rounded-lg flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-32 h-48 mx-auto mb-6 bg-gradient-to-br from-med-sand via-med-gold to-amber-700 rounded-lg opacity-80" />
                <p className="font-serif text-med-sea">{product.type}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="bg-med-sand text-med-sea capitalize">
                {product.category}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {product.gender}
              </Badge>
            </div>

            <p className="text-lg text-foreground leading-relaxed">{product.description}</p>

            <div className="space-y-4 border-t border-b py-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Top Notes</h4>
                <p className="text-foreground">{product.topNotes}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Heart Notes</h4>
                <p className="text-foreground">{product.heartNotes}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Base Notes</h4>
                <p className="text-foreground">{product.baseNotes}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-med-gold" />
                <span className="text-muted-foreground">Longevity:</span>
                <span className="font-medium">{product.longevity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-med-gold" />
                <span className="text-muted-foreground">Projection:</span>
                <span className="font-medium">{product.projection}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <h4 className="font-semibold mb-3">Select Size</h4>
                <div className="grid grid-cols-4 gap-2">
                  {SIZES.map(({ ml, multiplier }) => (
                    <Button
                      key={ml}
                      variant={selectedSize === ml ? "default" : "outline"}
                      onClick={() => setSelectedSize(ml)}
                      className={selectedSize === ml ? "bg-med-gold hover:bg-med-gold/90 border-med-gold" : ""}
                      data-testid={`button-size-${ml}`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{ml}ml</div>
                        <div className="text-xs">${(product.price * multiplier).toFixed(0)}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="text-3xl font-bold text-med-gold">${price}</p>
                </div>
                <Button
                  size="lg"
                  onClick={() => {
                    onAddToCart(product.id, selectedSize);
                    onClose();
                  }}
                  className="bg-med-gold hover:bg-med-gold/90 text-white"
                  data-testid="button-add-to-cart-modal"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
