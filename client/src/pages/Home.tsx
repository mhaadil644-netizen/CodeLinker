import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Product, CartItem, InsertProduct } from "@shared/schema";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { ShoppingCartModal } from "@/components/ShoppingCartModal";
import { AdminPanel } from "@/components/AdminPanel";
import { PerfumeBottle } from "@/components/PerfumeBottle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Gift, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

type Category = "all" | "floral" | "oriental" | "woody" | "fresh";

export default function Home() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch products
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (product: InsertProduct) => {
      return await apiRequest("POST", "/api/products", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Added",
        description: "New product has been added to the collection successfully!",
      });
    },
  });

  // Checkout mutation
  const checkoutMutation = useMutation({
    mutationFn: async (data: { items: CartItem[]; paymentMethod: "online" | "cod"; discountCode?: string }) => {
      return await apiRequest("POST", "/api/orders", data);
    },
    onSuccess: () => {
      setCart([]);
      setCartOpen(false);
      toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. We'll process your order shortly.",
      });
    },
  });

  // Contact form mutation
  const contactMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
      });
    },
  });

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (productId: string, size: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const multiplier = size === 10 ? 1 : size === 30 ? 2.8 : size === 50 ? 4.5 : 8.5;
    const price = product.price * multiplier;

    const existingIndex = cart.findIndex(item => item.productId === productId && item.size === size);
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, {
        productId,
        productName: product.name,
        size,
        quantity: 1,
        pricePerUnit: price,
      }]);
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} (${size}ml) added to your cart`,
    });
  };

  const updateQuantity = (productId: string, size: number, quantity: number) => {
    const newCart = cart.map(item =>
      item.productId === productId && item.size === size
        ? { ...item, quantity }
        : item
    );
    setCart(newCart);
  };

  const removeItem = (productId: string, size: number) => {
    setCart(cart.filter(item => !(item.productId === productId && item.size === size)));
  };

  const handleCheckout = (paymentMethod: "online" | "cod", discountCode?: string) => {
    checkoutMutation.mutate({ items: cart, paymentMethod, discountCode });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    contactMutation.mutate({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    });
    e.currentTarget.reset();
  };

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="font-serif text-2xl font-bold text-med-sea" data-testid="text-brand-name">MED Parfum</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-foreground/70 hover:text-med-gold transition-colors" data-testid="link-home">Home</a>
              <a href="#collection" className="text-foreground/70 hover:text-med-gold transition-colors" data-testid="link-collection">Collection</a>
              <a href="#about" className="text-foreground/70 hover:text-med-gold transition-colors" data-testid="link-about">About</a>
              <a href="#contact" className="text-foreground/70 hover:text-med-gold transition-colors" data-testid="link-contact">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-foreground/70 hover:text-med-gold transition-colors"
                data-testid="button-cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-med-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="text-cart-count">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <Button
                onClick={() => setAdminOpen(true)}
                className="bg-med-sea hover:bg-med-sea/90 text-white"
                data-testid="button-admin"
              >
                Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-med-cream via-med-sand to-[#E8D5B7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in duration-700">
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-med-sea leading-tight">
                The Art of Scent
              </h2>
              <p className="text-xl text-foreground/80 leading-relaxed">
                Discover timeless fragrances inspired by the Mediterranean. Choose your perfume, select your bottle size (starting from 10ml), and enjoy the freedom to pay your way — online or cash on delivery.
              </p>
              <p className="text-lg text-foreground/70">
                Indulge in a luxurious shopping experience designed for perfume lovers who value elegance, quality, and personalization.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={scrollToCollection}
                  size="lg"
                  className="bg-med-gold hover:bg-med-gold/90 text-white transition-all hover:scale-105"
                  data-testid="button-shop-now"
                >
                  Shop Now
                </Button>
                <Button
                  onClick={scrollToCollection}
                  size="lg"
                  variant="outline"
                  className="border-2 border-med-gold text-med-gold hover:bg-med-gold hover:text-white"
                  data-testid="button-discover"
                >
                  Discover the Collection
                </Button>
                <Button
                  size="lg"
                  className="bg-med-sea hover:bg-med-sea/90 text-white"
                  data-testid="button-gift"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Gift a Perfume
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-med-sea text-med-sea hover:bg-med-sea hover:text-white"
                  data-testid="button-custom-set"
                >
                  <Layers className="w-5 h-5 mr-2" />
                  Create Your Set
                </Button>
              </div>
            </div>
            <div className="text-center">
              <PerfumeBottle />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl font-bold text-med-sea mb-4">Our Collection</h3>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Each fragrance tells a story of elegance and individuality, inspired by the Mediterranean essence.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {(["all", "floral", "oriental", "woody", "fresh"] as Category[]).map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "secondary"}
                className={selectedCategory === category 
                  ? "bg-med-gold hover:bg-med-gold/90 text-white rounded-full" 
                  : "rounded-full hover:bg-med-gold hover:text-white"}
                data-testid={`button-filter-${category}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={() => setSelectedProduct(product)}
                onAddToCart={(size) => addToCart(product.id, size)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-med-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-serif text-4xl font-bold text-med-sea mb-8">About MED Parfum</h3>
            <p className="text-xl text-foreground leading-relaxed max-w-4xl mx-auto">
              At MED Parfum, we believe scent is emotion — a story you wear. Our fragrances are inspired by the timeless beauty of the Mediterranean, where luxury meets authenticity. Each bottle captures the essence of golden sunsets, azure seas, and warm Mediterranean breezes.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-4xl font-bold text-med-sea mb-4">Get in Touch</h3>
            <p className="text-xl text-foreground/70">We're here to help you find your perfect scent</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="font-semibold text-xl mb-4">Contact Information</h4>
              <div className="space-y-3 text-foreground/80">
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📧</span> info@medparfum.com
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📱</span> +1 (555) 123-4567
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📍</span> Mediterranean Coast
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">💬</span> 
                  <a href="#" className="text-med-gold hover:underline">WhatsApp Support</a>
                </p>
              </div>
            </div>
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  data-testid="input-contact-name"
                />
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  required 
                  data-testid="input-contact-email"
                />
                <Textarea 
                  name="message" 
                  placeholder="Your Message" 
                  required 
                  className="min-h-32"
                  data-testid="textarea-contact-message"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-med-gold hover:bg-med-gold/90 text-white"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-med-sea text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-serif text-xl font-bold mb-4">MED Parfum</h4>
              <p className="text-white/70">The Art of Scent - Mediterranean luxury fragrances</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-white/70">
                <li><a href="#home" className="hover:text-med-gold transition-colors">Home</a></li>
                <li><a href="#collection" className="hover:text-med-gold transition-colors">Collection</a></li>
                <li><a href="#about" className="hover:text-med-gold transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-med-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Customer Care</h5>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-med-gold transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-med-gold transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-med-gold transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-med-gold transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4 text-2xl">
                <a href="#" className="text-white/70 hover:text-med-gold transition-colors">📘</a>
                <a href="#" className="text-white/70 hover:text-med-gold transition-colors">📷</a>
                <a href="#" className="text-white/70 hover:text-med-gold transition-colors">🐦</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 MED Parfum. All rights reserved. | "At MED Parfum, we believe scent is emotion — a story you wear. Choose your fragrance, define your moment."</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <ShoppingCartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        onAddProduct={(product) => addProductMutation.mutate(product)}
        productCount={products.length}
        totalSales={12450}
        ordersToday={23}
      />
    </div>
  );
}
