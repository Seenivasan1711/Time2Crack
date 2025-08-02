# Time2Crack Database Schema

This document outlines the complete database structure for the Time2Crack platform.

## Database Overview

- **Database Name**: `time2crack`
- **Engine**: PostgreSQL
- **ORM**: TypeORM with NestJS
- **Migration System**: TypeORM Migrations

## Table Structures

### 1. Users Table

**Purpose**: Store user accounts and authentication information

```sql
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "role" VARCHAR(50) DEFAULT 'user',
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `id` - Primary key, auto-incrementing
- `email` - Unique user email address
- `password` - Hashed password (bcrypt)
- `firstName` - User's first name
- `lastName` - User's last name
- `role` - User role (user, admin, etc.)
- `isActive` - Account status
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

**Indexes**:
- `IDX_users_email` - On email field for fast lookups

### 2. Categories Table

**Purpose**: Organize products into categories

```sql
CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "slug" VARCHAR(255) UNIQUE NOT NULL,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `id` - Primary key, auto-incrementing
- `name` - Category name
- `description` - Category description
- `slug` - URL-friendly category identifier
- `isActive` - Category status
- `createdAt` - Category creation timestamp
- `updatedAt` - Last update timestamp

### 3. Products Table

**Purpose**: Store product catalog information

```sql
CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "price" DECIMAL(10,2) NOT NULL,
  "stock" INTEGER DEFAULT 0,
  "categoryId" INTEGER REFERENCES "categories"(id),
  "slug" VARCHAR(255) UNIQUE NOT NULL,
  "imageUrl" VARCHAR(500),
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `id` - Primary key, auto-incrementing
- `name` - Product name
- `description` - Product description
- `price` - Product price (decimal with 2 decimal places)
- `stock` - Available stock quantity
- `categoryId` - Foreign key to categories table
- `slug` - URL-friendly product identifier
- `imageUrl` - Product image URL
- `isActive` - Product status
- `createdAt` - Product creation timestamp
- `updatedAt` - Last update timestamp

**Foreign Keys**:
- `categoryId` → `categories.id`

**Indexes**:
- `IDX_products_category` - On categoryId for fast category filtering

### 4. Cart Table

**Purpose**: Store shopping cart items for users

```sql
CREATE TABLE "cart" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES "users"(id),
  "productId" INTEGER REFERENCES "products"(id),
  "quantity" INTEGER DEFAULT 1,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `id` - Primary key, auto-incrementing
- `userId` - Foreign key to users table
- `productId` - Foreign key to products table
- `quantity` - Quantity of product in cart
- `createdAt` - Cart item creation timestamp
- `updatedAt` - Last update timestamp

**Foreign Keys**:
- `userId` → `users.id`
- `productId` → `products.id`

**Indexes**:
- `IDX_cart_user` - On userId for fast user cart retrieval

### 5. Orders Table

**Purpose**: Store order information

```sql
CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES "users"(id),
  "status" VARCHAR(50) DEFAULT 'pending',
  "totalAmount" DECIMAL(10,2) NOT NULL,
  "shippingAddress" TEXT,
  "deliveryDate" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `id` - Primary key, auto-incrementing
- `userId` - Foreign key to users table
- `status` - Order status (pending, confirmed, shipped, delivered, cancelled)
- `totalAmount` - Total order amount
- `shippingAddress` - Delivery address
- `deliveryDate` - Scheduled delivery date
- `createdAt` - Order creation timestamp
- `updatedAt` - Last update timestamp

**Foreign Keys**:
- `userId` → `users.id`

**Indexes**:
- `IDX_orders_user` - On userId for fast user order retrieval

### 6. Order Items Table

**Purpose**: Store individual items within orders

```sql
CREATE TABLE "order_items" (
  "id" SERIAL PRIMARY KEY,
  "orderId" INTEGER REFERENCES "orders"(id),
  "productId" INTEGER REFERENCES "products"(id),
  "quantity" INTEGER NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `id` - Primary key, auto-incrementing
- `orderId` - Foreign key to orders table
- `productId` - Foreign key to products table
- `quantity` - Quantity ordered
- `price` - Price at time of order
- `createdAt` - Order item creation timestamp

**Foreign Keys**:
- `orderId` → `orders.id`
- `productId` → `products.id`

**Indexes**:
- `IDX_order_items_order` - On orderId for fast order item retrieval

## Relationships

```
users (1) ←→ (many) cart
users (1) ←→ (many) orders
categories (1) ←→ (many) products
products (1) ←→ (many) cart
products (1) ←→ (many) order_items
orders (1) ←→ (many) order_items
```

## Status Values

### Order Status
- `pending` - Order placed, awaiting confirmation
- `confirmed` - Order confirmed, processing
- `shipped` - Order shipped, in transit
- `delivered` - Order delivered successfully
- `cancelled` - Order cancelled

### User Roles
- `user` - Regular customer
- `admin` - Administrator
- `moderator` - Content moderator

## Database Operations

### Creating a New User
```sql
INSERT INTO users (email, password, firstName, lastName, role)
VALUES ('user@example.com', 'hashed_password', 'John', 'Doe', 'user');
```

### Adding Product to Cart
```sql
INSERT INTO cart (userId, productId, quantity)
VALUES (1, 5, 2);
```

### Creating an Order
```sql
INSERT INTO orders (userId, status, totalAmount, shippingAddress)
VALUES (1, 'pending', 99.99, '123 Main St, City, State');
```

### Adding Items to Order
```sql
INSERT INTO order_items (orderId, productId, quantity, price)
VALUES (1, 5, 2, 49.99);
```

## Performance Considerations

1. **Indexes**: All foreign keys and frequently queried fields are indexed
2. **Constraints**: Foreign key constraints ensure data integrity
3. **Timestamps**: All tables include created/updated timestamps for auditing
4. **Soft Deletes**: `isActive` flags allow soft deletion without data loss

## Migration Commands

```bash
# Generate new migration
npm run migration:generate -- src/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

## Entity Files Location

The corresponding TypeORM entity files should be located in:
- `src/modules/users/entities/user.entity.ts`
- `src/modules/categories/entities/category.entity.ts`
- `src/modules/products/entities/product.entity.ts`
- `src/modules/cart/entities/cart.entity.ts`
- `src/modules/orders/entities/order.entity.ts`
- `src/modules/orders/entities/order-item.entity.ts` 