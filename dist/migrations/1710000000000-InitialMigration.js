"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1710000000000 = void 0;
class InitialMigration1710000000000 {
    constructor() {
        this.name = 'InitialMigration1710000000000';
    }
    async up(queryRunner) {
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
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_users_email" ON "users" ("email")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_products_category" ON "products" ("categoryId")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_cart_user" ON "cart" ("userId")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_orders_user" ON "orders" ("userId")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_order_items_order" ON "order_items" ("orderId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "order_items"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "orders"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "cart"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "products"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "categories"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
}
exports.InitialMigration1710000000000 = InitialMigration1710000000000;
//# sourceMappingURL=1710000000000-InitialMigration.js.map