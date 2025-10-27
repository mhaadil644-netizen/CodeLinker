# MED Parfum - Design Guidelines

## Design Approach
**Reference-Based Luxury E-Commerce** - Drawing inspiration from premium fragrance brands like Jo Malone, Le Labo, and Diptyque, combined with the clean e-commerce patterns of Shopify. The design emphasizes Mediterranean elegance, sophistication, and a premium shopping experience.

## Core Design Elements

### A. Typography
**Font Families:**
- Primary Display: Playfair Display (serif) - for headings, brand name, and featured text
- Body & UI: Inter (sans-serif) - for navigation, descriptions, buttons, and all functional text

**Type Scale:**
- Hero Headlines: text-5xl to text-6xl (48-60px), font-bold
- Section Headings: text-4xl (36px), font-bold
- Subheadings: text-2xl (24px), font-semibold
- Body Large: text-xl (20px), regular
- Body Standard: text-lg (18px), regular
- UI Elements: text-sm to text-base (14-16px)

### B. Color Palette
**Primary Colors:**
- MED Gold: #D4AF37 - Primary CTA buttons, accents, active states
- MED Sea: #2C5F7C - Secondary buttons, admin panel, brand text
- MED Sand: #F5E6D3 - Gradient accents
- MED Cream: #FAF7F0 - Page background

**Supporting Colors:**
- White: #FFFFFF - Cards, modals, navigation background
- Gray Scale: text-gray-700, text-gray-600, text-gray-500 for text hierarchy
- Black Overlay: bg-black bg-opacity-50 for modal backgrounds

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Component padding: p-4, p-6, p-8
- Section padding: py-20 (desktop), py-12 (mobile)
- Element gaps: gap-4, gap-8, gap-12
- Margins: mb-4, mb-6, mb-8, mb-16

**Container Structure:**
- Max width: max-w-7xl for main content areas
- Max width: max-w-3xl for centered text content
- Padding: px-4 sm:px-6 lg:px-8 for responsive spacing

**Grid Layouts:**
- Hero: 2-column grid (md:grid-cols-2)
- Products: 3-column grid (lg:grid-cols-3, md:grid-cols-2)
- Responsive: Single column on mobile, expanding to multi-column on tablet and desktop

## Component Library

### Navigation
Sticky header with white background and shadow, height h-16. Logo left-aligned, center navigation links, right-aligned utility buttons (language selector, cart with count badge, admin button). Hover states transition to med-gold color.

### Hero Section
Full viewport min-h-screen with gradient background (hero-gradient: cream to sand to darker sand). Two-column layout: left side with headline, description, and 4 CTA buttons in flex-wrap layout; right side with centered decorative SVG bottle illustration. Buttons include primary gold, outlined gold, secondary sea, and outlined sea variants.

### Product Cards
White background cards with rounded corners, subtle shadow. Hover effect: translateY(-5px) with enhanced gold-tinted shadow. Each card displays product image placeholder, name, category badge, price, and "Add to Cart" button. Cards maintain consistent aspect ratios.

### Category Filters
Horizontal scrollable button group with rounded-full pills. Active state: med-gold background with white text. Inactive state: gray background that transitions to gold on hover.

### Modals
Full-screen overlay with bg-black bg-opacity-50. Centered white content container with rounded-lg corners, max-w-2xl to max-w-4xl depending on type. Scrollable content with max-h-screen constraint. Close button (×) in top-right.

### Shopping Cart
Cart icon with absolute positioned badge showing item count. Modal displays line items with quantity controls, discount code input, total calculation, and dual payment buttons (online and cash on delivery) in grid layout.

### Buttons
**Primary (Gold):** bg-med-gold text-white with hover opacity reduction and transform scale-105
**Secondary (Sea):** bg-med-sea text-white with hover opacity reduction
**Outlined:** border-2 with matching text color, hover fills background
**Ghost:** bg-gray-200 text-gray-700 for tertiary actions

Consistent padding: px-6 to px-8, py-2 to py-3. Rounded corners: rounded-lg. Font weight: font-semibold to font-medium.

### Form Inputs
Full width inputs with border, rounded-lg corners, p-3 padding. Focus states should add border-med-gold accent.

## Visual Treatments

### Gradients
- Hero Background: linear-gradient(135deg, #FAF7F0 0%, #F5E6D3 50%, #E8D5B7 100%)
- Admin Panel: linear-gradient(135deg, #2C5F7C 0%, #1E4A5F 100%)
- Bottle SVG: linear-gradient using med-sand, med-gold, and darker gold

### Animations
Minimal, purposeful animations:
- Fade-in entrance: 0.6s ease-in with translateY(20px) to 0
- Card hover: 0.3s ease transform and shadow
- Button hover: 0.3s transition-all with subtle scale
- Bottle glow: drop-shadow filter on hover

### Shadows
- Navigation: shadow-lg (large elevation)
- Cards: Dynamic shadow that intensifies on hover with gold tint
- Modals: No shadow (overlay provides depth)

## Images

**Hero Section:**
Custom SVG bottle illustration (300x400px) - Decorative perfume bottle rendered in code with gradient fills, featuring bottle body, neck, cap, and label with "MED Parfum" text. Gold and sea color scheme. Inline SVG allows for glow effects on hover.

**Product Cards:**
Product images (aspect ratio 3:4 or 4:5) showing individual perfume bottles. Images should convey luxury and premium quality. Consider lifestyle shots for some products showing usage context.

**Additional Image Opportunities:**
- About section: Mediterranean-inspired lifestyle imagery (optional based on content)
- Testimonial section: Customer photos if added
- Gift options: Elegant gift packaging visuals

## Interaction Patterns

**Product Selection:** Click product card opens detail modal with size selection (10ml, 30ml, 50ml, 100ml), full description, and add to cart functionality.

**Cart Management:** Badge updates dynamically, modal toggles with smooth transition, quantity adjustments with +/- controls.

**Category Filtering:** Instant filter without page reload, active state visual feedback.

**Checkout Flow:** Two-path checkout (online payment vs. cash on delivery) with clear visual distinction.

**Admin Access:** Toggle panel for product management, order tracking, and discount code administration.

## Responsive Behavior

Mobile-first approach:
- Single column layouts on mobile
- Navigation collapses to hamburger (implied for mobile)
- Hero stacks vertically (image below text on small screens)
- Product grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- Modal max-height with scroll for smaller viewports
- Touch-friendly button sizes (minimum 44px height)