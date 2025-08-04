"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const seed_data_1 = require("../src/database/seeds/seed-data");
(0, dotenv_1.config)();
async function seedDatabase() {
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'time2crack',
        entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: true,
    });
    try {
        await dataSource.initialize();
        console.log('Database connected successfully');
        await (0, seed_data_1.seedData)(dataSource);
        console.log('Database seeded successfully!');
        await dataSource.destroy();
        console.log('Database connection closed');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed-database.js.map