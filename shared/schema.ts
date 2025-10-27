import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Products table
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(), // floral, oriental, woody, fresh
  type: text("type").notNull().default("Eau de Parfum"),
  topNotes: text("top_notes").notNull(),
  heartNotes: text("heart_notes").notNull(),
  baseNotes: text("base_notes").notNull(),
  longevity: text("longevity").notNull(),
  projection: text("projection").notNull(),
  gender: text("gender").notNull(), // men, women, unisex
  price: real("price").notNull(), // Price for 10ml
  description: text("description").notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  items: text("items").notNull(), // JSON stringified array of cart items
  subtotal: real("subtotal").notNull(),
  discount: real("discount").notNull().default(0),
  total: real("total").notNull(),
  paymentMethod: text("payment_method").notNull(), // online, cod
  status: text("status").notNull().default("pending"), // pending, shipped, delivered
  createdAt: text("created_at").notNull(),
});

// Discount codes table
export const discountCodes = pgTable("discount_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  percentage: integer("percentage").notNull(),
  active: boolean("active").notNull().default(true),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

// Zod schemas for inserts
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, orderNumber: true, createdAt: true });
export const insertDiscountCodeSchema = createInsertSchema(discountCodes).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

// TypeScript types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type DiscountCode = typeof discountCodes.$inferSelect;
export type InsertDiscountCode = z.infer<typeof insertDiscountCodeSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// Cart item type (frontend only, not persisted)
export interface CartItem {
  productId: string;
  productName: string;
  size: number; // 10, 30, 50, 100 ml
  quantity: number;
  pricePerUnit: number;
}
