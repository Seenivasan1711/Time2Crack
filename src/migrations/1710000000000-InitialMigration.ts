import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1710000000000 implements MigrationInterface {
  name = 'InitialMigration1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create database if it doesn't exist
    // await queryRunner.query(`CREATE DATABASE IF NOT EXISTS "time2crack"`);
    
    // Create users table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        "role" VARCHAR(50) DEFAULT 'user',
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create categories table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "slug" VARCHAR(255) UNIQUE NOT NULL,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "products" (
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
      )
    `);

    // Create cart table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "cart" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES "users"(id),
        "productId" INTEGER REFERENCES "products"(id),
        "quantity" INTEGER DEFAULT 1,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "orders" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES "users"(id),
        "status" VARCHAR(50) DEFAULT 'pending',
        "totalAmount" DECIMAL(10,2) NOT NULL,
        "shippingAddress" TEXT,
        "deliveryDate" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create order_items table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "order_items" (
        "id" SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES "orders"(id),
        "productId" INTEGER REFERENCES "products"(id),
        "quantity" INTEGER NOT NULL,
        "price" DECIMAL(10,2) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_users_email" ON "users" ("email")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_products_category" ON "products" ("categoryId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_cart_user" ON "cart" ("userId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_orders_user" ON "orders" ("userId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_order_items_order" ON "order_items" ("orderId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE IF EXISTS "order_items"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "orders"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "cart"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "products"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "categories"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
} 