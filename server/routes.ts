import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertOrderSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Create product (admin)
  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Delete product (admin)
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Create order (checkout)
  app.post("/api/orders", async (req, res) => {
    try {
      const { items, paymentMethod, discountCode } = req.body;

      // Calculate totals
      const subtotal = items.reduce((sum: number, item: any) => 
        sum + (item.pricePerUnit * item.quantity), 0
      );

      let discount = 0;
      if (discountCode) {
        const code = await storage.getDiscountCodeByCode(discountCode);
        if (code) {
          discount = subtotal * (code.percentage / 100);
        }
      }

      const total = subtotal - discount;

      const orderData = {
        items: JSON.stringify(items),
        subtotal,
        discount,
        total,
        paymentMethod,
        status: "pending",
        customerName: req.body.customerName || null,
        customerEmail: req.body.customerEmail || null,
        customerPhone: req.body.customerPhone || null,
      };

      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Get all orders (admin)
  app.get("/api/orders", async (_req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Validate discount code
  app.get("/api/discount/:code", async (req, res) => {
    try {
      const discountCode = await storage.getDiscountCodeByCode(req.params.code);
      if (!discountCode) {
        return res.status(404).json({ error: "Invalid discount code" });
      }
      res.json(discountCode);
    } catch (error) {
      res.status(500).json({ error: "Failed to validate discount code" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact form data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to submit contact message" });
    }
  });

  // Get all contact messages (admin)
  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
