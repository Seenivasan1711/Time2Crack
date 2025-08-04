# Time2Crack Complete Database Schema

## Overview

This document provides a complete overview of the Time2Crack database schema, including all tables, relationships, sample data, and setup instructions.

## Database Information

- **Database Name**: `time2crack`
- **Engine**: PostgreSQL 14
- **ORM**: TypeORM with NestJS
- **Location**: `src/database/seeds/seed-data.ts`

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

**Sample Data**:
```sql
-- Admin User
INSERT INTO users (email, password, firstName, lastName, role, isActive) 
VALUES ('admin@time2crack.com', '$2b$10$...', 'Admin', 'User', 'admin', true);

-- Regular User
INSERT INTO users (email, password, firstName, lastName, role, isActive) 
VALUES ('john.doe@example.com', '$2b$10$...', 'John', 'Doe', 'user', true);
```

**Fields**:
- `id` - Primary key, auto-incrementing
- `email` - Unique user email address
- `password` - Hashed password (bcrypt)
- `firstName` - User's first name
- `lastName` - User's last name
- `role` - User role (user, admin, moderator)
- `isActive` - Account status
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

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

**Sample Data**:
```sql
INSERT INTO categories (name, description, slug, isActive) VALUES
('Electronics', 'Latest electronic devices', 'electronics', true),
('Furniture', 'Home and office furniture', 'furniture', true),
('Clothing', 'Fashion and apparel', 'clothing', true),
('Kitchen', 'Kitchen appliances', 'kitchen', true),
('Accessories', 'Personal accessories', 'accessories', true),
('Sports', 'Sports equipment', 'sports', true);
```

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

**Sample Data**:
```sql
INSERT INTO products (name, description, price, stock, categoryId, slug, imageUrl, isActive) VALUES
('Wireless Noise-Cancelling Headphones', 'Premium wireless headphones with active noise cancellation', 299.99, 15, 1, 'wireless-noise-cancelling-headphones', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', true),
('Smart Fitness Watch', 'Track your fitness goals with heart rate monitoring', 199.99, 20, 1, 'smart-fitness-watch', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', true),
('Ergonomic Office Chair', 'Comfortable office chair with lumbar support', 249.99, 8, 2, 'ergonomic-office-chair', 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg', true),
('Organic Cotton T-Shirt', 'Soft and breathable t-shirt made from organic cotton', 29.99, 50, 3, 'organic-cotton-tshirt', 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg', true),
('Professional Blender', 'High-powered blender for smoothies and soups', 129.99, 12, 4, 'professional-blender', 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg', true),
('Leather Wallet', 'Genuine leather wallet with RFID protection', 49.99, 30, 5, 'leather-wallet', 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg', true);
```

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

## Relationships

```
users (1) ←→ (many) cart
users (1) ←→ (many) orders
categories (1) ←→ (many) products
products (1) ←→ (many) cart
products (1) ←→ (many) order_items
orders (1) ←→ (many) order_items
```

## Entity Relationships

### User Entity
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 50, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Category Entity
```typescript
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
```

### Product Entity
```typescript
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'int', nullable: true })
  categoryId: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
```

## Sample Data Summary

### Users (2)
1. **Admin User**
   - Email: `admin@time2crack.com`
   - Password: `admin123`
   - Role: `admin`
   - Name: Admin User

2. **Regular User**
   - Email: `john.doe@example.com`
   - Password: `password123`
   - Role: `user`
   - Name: John Doe

### Categories (6)
1. Electronics - Latest electronic devices
2. Furniture - Home and office furniture
3. Clothing - Fashion and apparel
4. Kitchen - Kitchen appliances
5. Accessories - Personal accessories
6. Sports - Sports equipment

### Products (6)
1. **Wireless Noise-Cancelling Headphones** - $299.99 (Electronics)
2. **Smart Fitness Watch** - $199.99 (Electronics)
3. **Ergonomic Office Chair** - $249.99 (Furniture)
4. **Organic Cotton T-Shirt** - $29.99 (Clothing)
5. **Professional Blender** - $129.99 (Kitchen)
6. **Leather Wallet** - $49.99 (Accessories)

## Setup Instructions

### 1. Database Creation
```bash
# Create database
npm run db:create

# Or manually
psql -h localhost -U postgres -d postgres -c "CREATE DATABASE time2crack;"
```

### 2. Run Migrations
```bash
# Run migrations
npm run migration:run

# Or start the app (auto-runs migrations)
npm run start:dev
```

### 3. Seed Data (Automatic)
The application automatically seeds the database with sample data on startup.

### 4. Manual Seeding
```bash
# If you need to reseed manually
npm run start:dev
# The SampleDataService will populate the database
```

## Development Commands

```bash
# Database operations
npm run db:create          # Create database
npm run db:setup           # Full database setup
npm run migration:run      # Run migrations
npm run migration:revert   # Revert last migration
npm run migration:show     # Show migration status

# Application
npm run start:dev          # Start development server
npm run build              # Build for production
npm run start:prod         # Start production server
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=time2crack
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_ENABLED=false

# AI Providers
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Application
NODE_ENV=development
PORT=3000
```

## Testing the Setup

1. **Start the backend**:
   ```bash
   cd Time2Crack
   npm run start:dev
   ```

2. **Start the frontend**:
   ```bash
   cd Time2Crack-FrontEnd
   npm run dev
   ```

3. **Test the application**:
   - Visit: `http://localhost:5173` (frontend)
   - API Docs: `http://localhost:3000/api-docs`
   - Health Check: `http://localhost:3000/api/health`

4. **Login with sample users**:
   - Admin: `admin@time2crack.com` / `admin123`
   - User: `john.doe@example.com` / `password123`

## Data Validation

All data is validated using:
- **Class-validator** for DTOs
- **Zod** for frontend forms
- **TypeORM** for database constraints
- **JWT** for authentication
- **bcrypt** for password hashing

This setup provides a complete, production-ready database schema with sample data for development and testing. 