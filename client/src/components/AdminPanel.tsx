import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { InsertProduct } from "@shared/schema";
import { Package, DollarSign, ShoppingBag } from "lucide-react";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: InsertProduct) => void;
  productCount: number;
  totalSales: number;
  ordersToday: number;
}

export function AdminPanel({ open, onClose, onAddProduct, productCount, totalSales, ordersToday }: AdminPanelProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    topNotes: "",
    heartNotes: "",
    baseNotes: "",
    price: "",
    gender: "",
    description: "",
    longevity: "6-8 hours",
    projection: "Moderate",
    type: "Eau de Parfum",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      ...formData,
      price: parseFloat(formData.price),
    });
    setFormData({
      name: "",
      category: "",
      topNotes: "",
      heartNotes: "",
      baseNotes: "",
      price: "",
      gender: "",
      description: "",
      longevity: "6-8 hours",
      projection: "Moderate",
      type: "Eau de Parfum",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-med-sea to-[#1E4A5F] text-white" data-testid="modal-admin">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Admin Dashboard</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <Card className="bg-white/10 border-white/20 p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-med-gold/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-med-gold" />
              </div>
              <div>
                <h4 className="text-sm text-white/70">Total Sales</h4>
                <p className="text-2xl font-bold text-med-gold" data-testid="text-total-sales">${totalSales.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-med-gold/20 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-med-gold" />
              </div>
              <div>
                <h4 className="text-sm text-white/70">Orders Today</h4>
                <p className="text-2xl font-bold text-med-gold" data-testid="text-orders-today">{ordersToday}</p>
              </div>
            </div>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-med-gold/20 rounded-lg">
                <Package className="w-6 h-6 text-med-gold" />
              </div>
              <div>
                <h4 className="text-sm text-white/70">Products</h4>
                <p className="text-2xl font-bold text-med-gold" data-testid="text-product-count">{productCount}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-white/10 border-white/20 p-6 mt-4">
          <h4 className="font-semibold text-lg mb-4">Add New Product</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-white text-gray-900"
                data-testid="input-product-name"
              />
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                <SelectTrigger className="bg-white text-gray-900" data-testid="select-category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="floral">Floral</SelectItem>
                  <SelectItem value="oriental">Oriental</SelectItem>
                  <SelectItem value="woody">Woody</SelectItem>
                  <SelectItem value="fresh">Fresh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Top Notes"
                value={formData.topNotes}
                onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                required
                className="bg-white text-gray-900"
                data-testid="input-top-notes"
              />
              <Input
                placeholder="Heart Notes"
                value={formData.heartNotes}
                onChange={(e) => setFormData({ ...formData, heartNotes: e.target.value })}
                required
                className="bg-white text-gray-900"
                data-testid="input-heart-notes"
              />
              <Input
                placeholder="Base Notes"
                value={formData.baseNotes}
                onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                required
                className="bg-white text-gray-900"
                data-testid="input-base-notes"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="number"
                step="0.01"
                placeholder="Price (10ml)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="bg-white text-gray-900"
                data-testid="input-price"
              />
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} required>
                <SelectTrigger className="bg-white text-gray-900" data-testid="select-gender">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="bg-white text-gray-900 min-h-24"
              data-testid="textarea-description"
            />
            <Button 
              type="submit" 
              className="w-full bg-med-gold hover:bg-med-gold/90 text-white"
              data-testid="button-submit-product"
            >
              Add Product
            </Button>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
