import { 
  Product, InsertProduct, 
  Order, InsertOrder,
  DiscountCode, InsertDiscountCode,
  ContactMessage, InsertContactMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  // Discount Codes
  getDiscountCodes(): Promise<DiscountCode[]>;
  getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined>;
  createDiscountCode(discountCode: InsertDiscountCode): Promise<DiscountCode>;
  
  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private discountCodes: Map<string, DiscountCode>;
  private contactMessages: Map<string, ContactMessage>;
  private orderCounter: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.discountCodes = new Map();
    this.contactMessages = new Map();
    this.orderCounter = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed sample Mediterranean perfumes
    const sampleProducts: InsertProduct[] = [
      {
        name: "Mediterranean Breeze",
        category: "fresh",
        type: "Eau de Parfum",
        topNotes: "Bergamot, Lemon, Sea Salt",
        heartNotes: "Lavender, Rosemary, Jasmine",
        baseNotes: "Cedar, Ambergris, Musk",
        longevity: "6-8 hours",
        projection: "Moderate",
        gender: "unisex",
        price: 25,
        description: "A refreshing coastal escape in a bottle"
      },
      {
        name: "Golden Sunset",
        category: "oriental",
        type: "Eau de Parfum",
        topNotes: "Saffron, Cardamom, Orange Blossom",
        heartNotes: "Rose, Jasmine, Ylang-Ylang",
        baseNotes: "Vanilla, Amber, Sandalwood",
        longevity: "8-10 hours",
        projection: "Strong",
        gender: "women",
        price: 32,
        description: "Warm and luxurious, like a Mediterranean sunset"
      },
      {
        name: "Ocean Mist",
        category: "fresh",
        type: "Eau de Toilette",
        topNotes: "Aquatic Notes, Mint, Grapefruit",
        heartNotes: "Sea Breeze, Neroli, Green Tea",
        baseNotes: "Driftwood, Musk, White Amber",
        longevity: "4-6 hours",
        projection: "Light",
        gender: "unisex",
        price: 28,
        description: "Crystal clear freshness inspired by the Aegean Sea"
      },
      {
        name: "Olive Grove",
        category: "woody",
        type: "Eau de Parfum",
        topNotes: "Bergamot, Fig Leaf, Cypress",
        heartNotes: "Olive Blossom, Vetiver, Cedarwood",
        baseNotes: "Oakmoss, Patchouli, Tonka Bean",
        longevity: "7-9 hours",
        projection: "Moderate",
        gender: "men",
        price: 30,
        description: "Earthy and sophisticated, reminiscent of ancient olive groves"
      },
      {
        name: "Rose Garden",
        category: "floral",
        type: "Eau de Parfum",
        topNotes: "Pink Pepper, Mandarin, Peach",
        heartNotes: "Bulgarian Rose, Peony, Magnolia",
        baseNotes: "White Musk, Vanilla, Blonde Woods",
        longevity: "6-8 hours",
        projection: "Moderate",
        gender: "women",
        price: 35,
        description: "A romantic bouquet of Mediterranean roses in full bloom"
      },
      {
        name: "Coastal Citrus",
        category: "fresh",
        type: "Eau de Cologne",
        topNotes: "Lemon, Lime, Blood Orange",
        heartNotes: "Neroli, Petit Grain, Basil",
        baseNotes: "Vetiver, White Musk, Cedar",
        longevity: "3-5 hours",
        projection: "Light",
        gender: "unisex",
        price: 22,
        description: "Bright and invigorating, perfect for summer days"
      }
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });

    // Seed discount codes
    const discountCodes: InsertDiscountCode[] = [
      { code: "WELCOME10", percentage: 10, active: true },
      { code: "SUMMER20", percentage: 20, active: true },
      { code: "VIP30", percentage: 30, active: true },
    ];

    discountCodes.forEach(code => {
      const id = randomUUID();
      this.discountCodes.set(id, { ...code, id });
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const orderNumber = `ORD${String(this.orderCounter++).padStart(4, '0')}`;
    const createdAt = new Date().toISOString();
    const order: Order = { 
      ...insertOrder, 
      id, 
      orderNumber, 
      createdAt 
    };
    this.orders.set(id, order);
    return order;
  }

  // Discount Codes
  async getDiscountCodes(): Promise<DiscountCode[]> {
    return Array.from(this.discountCodes.values());
  }

  async getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined> {
    return Array.from(this.discountCodes.values()).find(
      dc => dc.code.toUpperCase() === code.toUpperCase() && dc.active
    );
  }

  async createDiscountCode(insertDiscountCode: InsertDiscountCode): Promise<DiscountCode> {
    const id = randomUUID();
    const discountCode: DiscountCode = { ...insertDiscountCode, id };
    this.discountCodes.set(id, discountCode);
    return discountCode;
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const message: ContactMessage = { ...insertMessage, id, createdAt };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
