import { DataSource } from 'typeorm';
import { User, UserRole } from '../../modules/users/entities/user.entity';
import { Category } from '../../modules/categories/entities/category.entity';
import { Product } from '../../modules/products/entities/product.entity';
import * as bcrypt from 'bcrypt';

export const seedData = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  const categoryRepository = dataSource.getRepository(Category);
  const productRepository = dataSource.getRepository(Product);

  // Check if data already exists
  const existingUsers = await userRepository.count();
  const existingCategories = await categoryRepository.count();
  const existingProducts = await productRepository.count();

  if (existingUsers > 0 && existingCategories > 0 && existingProducts > 0) {
    console.log('Database already seeded, skipping...');
    return;
  }

  console.log('Seeding database with sample data...');

  // Create Categories
  const categories = [
    { name: 'Electronics', description: 'Latest electronic devices', slug: 'electronics', isActive: true },
    { name: 'Furniture', description: 'Home and office furniture', slug: 'furniture', isActive: true },
    { name: 'Clothing', description: 'Fashion and apparel', slug: 'clothing', isActive: true },
    { name: 'Kitchen', description: 'Kitchen appliances', slug: 'kitchen', isActive: true },
    { name: 'Accessories', description: 'Personal accessories', slug: 'accessories', isActive: true },
    { name: 'Sports', description: 'Sports equipment', slug: 'sports', isActive: true },
  ];

  const savedCategories = [];
  for (const categoryData of categories) {
    const category = categoryRepository.create(categoryData);
    const savedCategory = await categoryRepository.save(category);
    savedCategories.push(savedCategory);
  }

  // Create Users
  const users = [
    {
      email: 'admin@time2crack.com',
      password: await bcrypt.hash('admin123', 10),
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isActive: true,
    },
    {
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.USER,
      isActive: true,
    },
  ];

  const savedUsers = [];
  for (const userData of users) {
    const user = userRepository.create(userData);
    const savedUser = await userRepository.save(user);
    savedUsers.push(savedUser);
  }

  // Create Products
  const products = [
    {
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium wireless headphones with active noise cancellation',
      price: 299.99,
      stock: 15,
      slug: 'wireless-noise-cancelling-headphones',
      imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'electronics').id,
    },
    {
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with heart rate monitoring',
      price: 199.99,
      stock: 20,
      slug: 'smart-fitness-watch',
      imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'electronics').id,
    },
    {
      name: 'Ergonomic Office Chair',
      description: 'Comfortable office chair with lumbar support',
      price: 249.99,
      stock: 8,
      slug: 'ergonomic-office-chair',
      imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'furniture').id,
    },
    {
      name: 'Organic Cotton T-Shirt',
      description: 'Soft and breathable t-shirt made from organic cotton',
      price: 29.99,
      stock: 50,
      slug: 'organic-cotton-tshirt',
      imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'clothing').id,
    },
    {
      name: 'Professional Blender',
      description: 'High-powered blender for smoothies and soups',
      price: 129.99,
      stock: 12,
      slug: 'professional-blender',
      imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'kitchen').id,
    },
    {
      name: 'Leather Wallet',
      description: 'Genuine leather wallet with RFID protection',
      price: 49.99,
      stock: 30,
      slug: 'leather-wallet',
      imageUrl: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'accessories').id,
    },
  ];

  for (const productData of products) {
    const product = productRepository.create(productData);
    await productRepository.save(product);
  }

  console.log('Database seeded successfully!');
  console.log(`Created ${savedUsers.length} users`);
  console.log(`Created ${savedCategories.length} categories`);
  console.log(`Created ${products.length} products`);
}; 