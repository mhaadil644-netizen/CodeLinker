# MED Parfum - Luxury Mediterranean Fragrance E-Commerce Platform

## Overview

MED Parfum is a luxury e-commerce web application for selling Mediterranean-inspired perfumes. The platform allows customers to browse fragrances by category, view detailed product information including fragrance notes and characteristics, select bottle sizes (10ml, 30ml, 50ml, 100ml), and complete purchases with flexible payment options (online or cash on delivery). The application features an admin panel for product management and includes discount code functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React** with TypeScript for the UI layer
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TanStack Query** (React Query) for server state management and data fetching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for styling with custom Mediterranean color palette

**Design System:**
- Custom color palette: MED Gold (#D4AF37), MED Sea (#2C5F7C), MED Sand (#F5E6D3), MED Cream (#FAF7F0)
- Typography: Playfair Display (serif) for headings, Inter (sans-serif) for body text
- Component library follows "new-york" shadcn style variant
- Responsive grid layouts with mobile-first approach

**State Management:**
- Server state managed via TanStack Query with aggressive caching (staleTime: Infinity)
- Client state (cart, modals) managed via React local state
- Shopping cart persisted in component state (could be enhanced with localStorage)

**Key UI Components:**
- `ProductCard`: Displays individual perfume with hover effects
- `ProductDetailModal`: Full product details with size selection
- `ShoppingCartModal`: Cart management with discount code application
- `AdminPanel`: Product creation and management interface

### Backend Architecture

**Technology Stack:**
- **Express.js** server with TypeScript
- **Node.js** runtime (ESM modules)
- **Drizzle ORM** for database interactions
- **Neon Database** (@neondatabase/serverless) for PostgreSQL hosting

**API Design:**
- RESTful API endpoints under `/api` prefix
- Standard CRUD operations for products, orders, discount codes, and contact messages
- Request validation using Zod schemas (imported from shared schema)
- JSON response format with proper HTTP status codes

**Key API Endpoints:**
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/orders` - Create order with cart items
- `GET /api/discount/:code` - Validate discount code

**Storage Layer:**
- Dual storage implementation: `IStorage` interface allows switching between in-memory (`MemStorage`) and database implementations
- MemStorage used for development with seeded sample data
- Database implementation would use Drizzle ORM with PostgreSQL

**Error Handling:**
- Zod validation for request payloads
- Try-catch blocks with appropriate HTTP error responses
- Request/response logging middleware for API routes

### Data Storage

**Database Schema (Drizzle ORM with PostgreSQL):**

**Products Table:**
- UUID primary key with auto-generation
- Core fields: name, category (floral/oriental/woody/fresh), type, description
- Fragrance profile: topNotes, heartNotes, baseNotes
- Characteristics: longevity, projection, gender (men/women/unisex)
- Pricing: base price for 10ml bottle (multipliers applied for larger sizes)

**Orders Table:**
- UUID primary key with auto-generated order numbers
- Customer information: name, email, phone
- Items stored as JSON stringified array of cart items
- Pricing: subtotal, discount, total
- Payment method: online or COD
- Status tracking: pending, shipped, delivered
- Timestamp for order creation

**Discount Codes Table:**
- UUID primary key
- Unique code string
- Percentage-based discount
- Active/inactive flag

**Contact Messages Table:**
- UUID primary key
- Customer contact information: name, email, message

**Data Flow:**
- Client components fetch data via TanStack Query
- API routes validate requests with Zod schemas
- Storage layer abstracts database operations
- Drizzle ORM handles SQL generation and execution

### External Dependencies

**UI Component Libraries:**
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (@radix-ui/react-*)
  - Dialog, Dropdown Menu, Select, Toast, Tooltip, and 20+ other components
  - Provides accessibility features (ARIA, keyboard navigation) out of the box
  
- **shadcn/ui**: Pre-styled components built on Radix UI
  - Configured via components.json
  - Custom theming through Tailwind CSS variables

**Form Handling:**
- **React Hook Form**: Form state management (via @hookform/resolvers)
- **Zod**: Schema validation for both client and server

**Database:**
- **Neon Database**: Serverless PostgreSQL provider
- **Drizzle ORM**: Type-safe SQL query builder
- **drizzle-kit**: Database migration tool

**Development Tools:**
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)
- **ESBuild**: Backend bundling for production
- **TypeScript**: Type safety across full stack

**Styling:**
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant styling
- **clsx/tailwind-merge**: Conditional class name management

**Utilities:**
- **date-fns**: Date formatting and manipulation
- **nanoid**: Unique ID generation
- **cmdk**: Command palette component (if implemented)
- **embla-carousel-react**: Image carousel functionality

**Font Integration:**
- Google Fonts: Playfair Display (serif) and Inter (sans-serif) loaded via CDN in index.html

**Session Management:**
- **connect-pg-simple**: PostgreSQL session store for Express (configured but may not be fully implemented)