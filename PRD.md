# Planning Guide

A premium organic D2C skincare e-commerce platform that enables customers to browse, select, and purchase natural skincare products with a sophisticated shopping experience.

**Experience Qualities**: 
1. **Luxurious** - The interface should evoke premium quality through refined typography, elegant spacing, and a sophisticated dark aesthetic that reflects the natural, high-end positioning of organic skincare.
2. **Trustworthy** - Clear product information, transparent pricing in INR, and a seamless cart-to-checkout flow that builds confidence in the brand and purchasing process.
3. **Calming** - Soft animations, gentle color transitions, and an uncluttered layout that mirrors the soothing nature of skincare rituals and organic ingredients.

**Complexity Level**: Light Application (multiple features with basic state)
This is an e-commerce application with essential shopping features including product browsing, cart management, user authentication, and checkout flow - all manageable within a single-view application with modals/sheets for interactions.

## Essential Features

### Product Catalog Display
- **Functionality**: Display 15 curated organic skincare products with images, names, descriptions, prices (₹100-₹1000), and category tags
- **Purpose**: Allow customers to browse the complete product range and discover items that meet their skincare needs
- **Trigger**: Automatic on page load
- **Progression**: Page loads → Grid of product cards displayed → Hover reveals quick-add to cart → Click card for detailed view
- **Success criteria**: All 15 products visible with clear pricing, smooth grid layout on all screen sizes, images load properly

### User Authentication
- **Functionality**: Register new users and login existing users with email/password, persist user session
- **Purpose**: Enable personalized shopping experience and associate carts/orders with specific customers
- **Trigger**: Click "Login" or "Sign Up" button in header
- **Progression**: Click auth button → Modal/dialog opens → Enter credentials → Validation → Success toast → Modal closes → User name appears in header
- **Success criteria**: User can register with email/password, login persists across sessions, logged-in state visible in UI

### Shopping Cart Management
- **Functionality**: Add products to cart, adjust quantities, remove items, view cart total, persist cart data
- **Purpose**: Allow customers to collect desired products before purchasing and review their selection
- **Trigger**: Click "Add to Cart" on product card or detail view
- **Progression**: Click add → Cart icon badge increments → Open cart sheet → View items with quantity controls → Adjust quantities or remove → See updated total → Proceed to checkout
- **Success criteria**: Cart persists between sessions, quantities update correctly, total calculates accurately including all items

### Product Detail View
- **Functionality**: Display comprehensive product information including full description, ingredients, benefits, usage instructions, and pricing
- **Purpose**: Provide customers with detailed information needed to make informed purchase decisions
- **Trigger**: Click on product card
- **Progression**: Click product → Dialog/modal opens → View full details with larger image → Read description/ingredients → Adjust quantity → Add to cart → Modal closes
- **Success criteria**: All product details clearly visible, images display at higher resolution, add-to-cart works from detail view

### Checkout Process
- **Functionality**: Review cart items, enter shipping details, complete purchase, clear cart post-purchase
- **Purpose**: Finalize the transaction and collect necessary shipping/payment information
- **Trigger**: Click "Checkout" button in cart
- **Progression**: Click checkout → Checkout sheet opens → Review cart summary → Enter shipping address → Enter payment details → Submit order → Success confirmation → Cart clears → Order confirmation displayed
- **Success criteria**: Form validates all required fields, order summary matches cart, successful submission clears cart and shows confirmation

## Edge Case Handling

- **Empty Cart Checkout**: Display helpful empty state with "Continue Shopping" CTA when cart is empty
- **Unauthenticated Checkout**: Prompt user to login/register when attempting checkout without authentication
- **Quantity Limits**: Prevent adding more than 10 units of any single product to cart
- **Session Expiry**: Handle gracefully by prompting re-login without losing cart data
- **Product Out of Stock**: Show "Currently Unavailable" badge and disable add-to-cart for out-of-stock items (2-3 products)
- **Invalid Form Data**: Display inline validation errors with constructive guidance for shipping/payment forms
- **Duplicate Registrations**: Prevent duplicate email registrations with clear error messaging

## Design Direction

The design should evoke a sense of organic luxury meets modern minimalism - think dark botanical elegance with touches of warm earth tones. The dark theme should feel sophisticated and calming, not harsh, with subtle gradients that suggest natural ingredients like clay, charcoal, and plant extracts. The interface should communicate premium quality while remaining approachable and easy to navigate.

## Color Selection

A sophisticated dark theme anchored in deep charcoals with warm botanical accents that reflect organic, natural ingredients.

- **Primary Color**: Rich Forest Green (oklch(0.45 0.12 155)) - Represents organic, natural ingredients and serves as the main brand color for CTAs and key actions. This earthy green communicates trust and natural authenticity.
- **Secondary Colors**: 
  - Deep Charcoal Background (oklch(0.15 0.008 264)) - Main canvas that provides sophisticated darkness without harshness
  - Warm Clay Accent (oklch(0.65 0.08 65)) - Supporting color for secondary actions and highlights, evoking natural clay masks
  - Soft Sage Muted (oklch(0.35 0.06 155)) - De-emphasized UI elements and disabled states
- **Accent Color**: Warm Terracotta (oklch(0.62 0.15 35)) - Attention-grabbing color for special offers, new products, and important notifications. Brings warmth to the dark palette.
- **Foreground/Background Pairings**:
  - Primary Green (oklch(0.45 0.12 155)): White text (oklch(0.98 0 0)) - Ratio 7.2:1 ✓
  - Background Charcoal (oklch(0.15 0.008 264)): Light Gray text (oklch(0.92 0.01 264)) - Ratio 12.8:1 ✓
  - Warm Clay (oklch(0.65 0.08 65)): Deep Charcoal text (oklch(0.15 0.008 264)) - Ratio 8.1:1 ✓
  - Accent Terracotta (oklch(0.62 0.15 35)): White text (oklch(0.98 0 0)) - Ratio 5.8:1 ✓
  - Card Surface (oklch(0.2 0.01 264)): Light Gray text (oklch(0.92 0.01 264)) - Ratio 10.5:1 ✓

## Font Selection

Typography should convey premium quality and modern elegance while maintaining excellent readability on dark backgrounds, combining a distinctive serif for headings with a clean sans-serif for interface elements.

- **Primary Font (Headings/Brand)**: Playfair Display - A high-contrast serif that communicates luxury and sophistication, perfect for product names and the brand identity
- **Secondary Font (UI/Body)**: Inter - Clean, highly readable sans-serif for product descriptions, navigation, and all interface text

- **Typographic Hierarchy**:
  - H1 (Brand Logo): Playfair Display Semibold / 32px / -0.02em letter-spacing
  - H2 (Section Headers): Playfair Display Semibold / 28px / -0.01em letter-spacing
  - H3 (Product Names): Playfair Display Medium / 20px / normal letter-spacing
  - Body (Descriptions): Inter Regular / 15px / 0.01em letter-spacing / 1.6 line-height
  - Small (Prices/Meta): Inter Medium / 14px / normal letter-spacing
  - Button Text: Inter Semibold / 14px / 0.02em letter-spacing / uppercase
  - Caption (Labels): Inter Regular / 13px / 0.01em letter-spacing

## Animations

Animations should be subtle and purposeful, enhancing the premium feel without distracting from the products. Use gentle, organic motion that suggests the smooth application of skincare products - fluid and calming.

- **Product Card Hover**: Gentle upward float (4px) with subtle shadow expansion over 200ms ease-out, paired with a soft opacity increase on the product image overlay
- **Add to Cart**: Satisfying scale pulse (1.0 → 1.05 → 1.0) on cart icon badge over 300ms with elastic easing when items are added
- **Modal/Sheet Transitions**: Smooth slide-in from bottom (mobile) or fade + scale from center (desktop) over 300ms with slight overshoot for organic feel
- **Quantity Adjusters**: Quick micro-interactions (100ms) with subtle button press effect on +/- controls
- **Checkout Success**: Delightful checkmark animation that draws in with spring physics over 400ms
- **Page Load**: Staggered fade-in of product cards (50ms delay between each) creating a gentle cascade effect
- **Hover States**: All interactive elements have smooth 150ms color/transform transitions

## Component Selection

- **Components**:
  - **Card**: Primary container for product displays with custom dark theme styling (dark border, elevated shadow on hover)
  - **Sheet**: For cart sidebar and checkout flow - slides from right on desktop, bottom on mobile
  - **Dialog**: For product detail views and authentication modals - centered with backdrop blur
  - **Button**: All CTAs with variants - default (primary green), secondary (outline), ghost (for icon buttons)
  - **Input & Label**: Form fields for auth and checkout with floating labels
  - **Badge**: Product categories, "New", "Out of Stock" indicators with custom color variants
  - **Separator**: Subtle dividers in cart and checkout sections
  - **ScrollArea**: Smooth scrolling for long product lists and cart contents
  - **Avatar**: User profile icon in header when logged in
  - **Form + react-hook-form**: Structured form handling for registration, login, and checkout
  - **Tabs**: Category filtering for products (All, Cleansers, Serums, Moisturizers, Masks)
  - **Select**: Quantity selectors in product details and checkout

- **Customizations**:
  - **Product Grid Component**: Custom responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop) with consistent card heights
  - **Cart Item Component**: Horizontal layout with thumbnail, product info, quantity controls, and remove button
  - **Price Display Component**: Consistently formatted INR pricing with currency symbol
  - **Empty State Component**: Illustrated empty cart and "no products" states with actionable CTAs

- **States**:
  - **Buttons**: Default with green gradient, hover with brightness increase and slight scale, active with pressed shadow, disabled with opacity reduction
  - **Product Cards**: Default subtle border, hover with elevated shadow + border glow, loading with skeleton shimmer
  - **Inputs**: Default with dark border, focus with green ring glow, error with terracotta border + error text, success with check icon
  - **Cart Badge**: Pulse animation when count increases, smooth number transitions

- **Icon Selection**:
  - ShoppingCart (phosphor) - Cart icon in header
  - User (phosphor) - Profile/auth actions
  - Plus/Minus (phosphor) - Quantity adjusters
  - X (phosphor) - Close modals and remove cart items
  - Check (phosphor) - Success confirmations
  - Heart (phosphor) - Wishlist (future feature indicator)
  - Funnel (phosphor) - Filter/category controls
  - Package (phosphor) - Order confirmation
  - SignIn/SignOut (phosphor) - Authentication actions

- **Spacing**: 
  - Layout container: px-4 md:px-8 lg:px-16
  - Section spacing: mb-16 md:mb-24
  - Card padding: p-4 md:p-6
  - Grid gaps: gap-4 md:gap-6 lg:gap-8
  - Form field spacing: space-y-4
  - Button padding: px-6 py-2.5

- **Mobile**: 
  - Header: Fixed with backdrop blur, cart and user actions always visible
  - Product Grid: Single column on mobile (<640px), 2 columns on tablet (640-1024px), 4 columns desktop (>1024px)
  - Navigation: Bottom-fixed nav bar on mobile with key actions (Home, Cart, Profile)
  - Sheets: Full-height sheets on mobile for cart and checkout, 80% height on desktop
  - Product Cards: Slightly larger touch targets (min 44x44px) for mobile interactions
  - Typography: Slightly reduced heading sizes on mobile (H1: 24px, H2: 20px, H3: 18px)
