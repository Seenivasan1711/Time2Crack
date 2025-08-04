import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { seedData } from '../src/database/seeds/seed-data';

// Load environment variables
config();

async function seedDatabase() {
  const dataSource = new DataSource({
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
    
    await seedData(dataSource);
    console.log('Database seeded successfully!');
    
    await dataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 