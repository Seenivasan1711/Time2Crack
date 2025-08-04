import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { UserRole } from '../../common/enums';
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
    { name: 'Crackers', description: 'Premium fireworks and crackers for celebrations', slug: 'crackers', isActive: true },
    { name: 'Sweets', description: 'Traditional and modern sweets for all occasions', slug: 'sweets', isActive: true },
    { name: 'Desserts', description: 'Delicious desserts and cakes for celebrations', slug: 'desserts', isActive: true },
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
      name: 'Premium Sparklers Pack',
      description: 'High-quality sparklers for celebrations and parties',
      price: 299.99,
      stock: 15,
      slug: 'premium-sparklers-pack',
      imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'crackers').id,
    },
    {
      name: 'Fireworks Display Kit',
      description: 'Complete fireworks kit for grand celebrations',
      price: 199.99,
      stock: 20,
      slug: 'fireworks-display-kit',
      imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'crackers').id,
    },
    {
      name: 'Traditional Laddu',
      description: 'Authentic traditional laddu made with pure ingredients',
      price: 249.99,
      stock: 8,
      slug: 'traditional-laddu',
      imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'sweets').id,
    },
    {
      name: 'Gulab Jamun Mix',
      description: 'Premium gulab jamun mix for homemade sweets',
      price: 29.99,
      stock: 50,
      slug: 'gulab-jamun-mix',
      imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'sweets').id,
    },
    {
      name: 'Chocolate Cake',
      description: 'Delicious chocolate cake for celebrations',
      price: 129.99,
      stock: 12,
      slug: 'chocolate-cake',
      imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'desserts').id,
    },
    {
      name: 'Ice Cream Sundae',
      description: 'Premium ice cream sundae with toppings',
      price: 49.99,
      stock: 30,
      slug: 'ice-cream-sundae',
      imageUrl: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
      isActive: true,
      categoryId: savedCategories.find(c => c.slug === 'desserts').id,
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