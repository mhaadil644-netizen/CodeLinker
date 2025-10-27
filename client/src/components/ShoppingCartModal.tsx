import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, CreditCard, Banknote } from "lucide-react";
import { CartItem } from "@shared/schema";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface ShoppingCartModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: number, quantity: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onCheckout: (paymentMethod: 'online' | 'cod', discountCode?: string) => void;
}

export function ShoppingCartModal({ 
  open, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: ShoppingCartModalProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
  const discount = subtotal * (appliedDiscount / 100);
  const total = subtotal - discount;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "WELCOME10") {
      setAppliedDiscount(10);
    } else if (discountCode.toUpperCase() === "SUMMER20") {
      setAppliedDiscount(20);
    } else {
      setAppliedDiscount(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-cart">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-med-sea">Shopping Cart</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add some fragrances to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-3" data-testid="cart-items">
                {items.map((item, index) => (
                  <div 
                    key={`${item.productId}-${item.size}`} 
                    className="flex items-center gap-4 p-4 bg-card rounded-lg border"
                    data-testid={`cart-item-${index}`}
                  >
                    <div className="w-16 h-20 bg-gradient-to-br from-med-sand via-med-gold to-amber-700 rounded opacity-80 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate" data-testid={`text-cart-item-name-${index}`}>
                        {item.productName}
                      </h4>
                      <p className="text-sm text-muted-foreground">{item.size}ml</p>
                      <p className="text-sm font-medium text-med-gold">${item.pricePerUnit.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))}
                        data-testid={`button-decrease-${index}`}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium" data-testid={`text-quantity-${index}`}>
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                        data-testid={`button-increase-${index}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.productId, item.size)}
                      className="text-destructive"
                      data-testid={`button-remove-${index}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    data-testid="input-discount-code"
                  />
                  <Button 
                    variant="secondary" 
                    onClick={handleApplyDiscount}
                    data-testid="button-apply-discount"
                  >
                    Apply
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium" data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedDiscount}%):</span>
                      <span data-testid="text-discount">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-med-gold" data-testid="text-total">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    size="lg"
                    onClick={() => onCheckout('online', appliedDiscount > 0 ? discountCode : undefined)}
                    className="bg-med-gold hover:bg-med-gold/90 text-white"
                    data-testid="button-checkout-online"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay Online
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => onCheckout('cod', appliedDiscount > 0 ? discountCode : undefined)}
                    className="bg-med-sea hover:bg-med-sea/90 text-white"
                    data-testid="button-checkout-cod"
                  >
                    <Banknote className="w-5 h-5 mr-2" />
                    Cash on Delivery
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
