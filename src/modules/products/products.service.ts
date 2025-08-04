import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      where: { isActive: true },
      relations: ['category'],
    });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, isActive: true },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async createSampleData(): Promise<void> {
    // Check if products already exist
    const existingProducts = await this.productRepository.count();
    if (existingProducts > 0) {
      return;
    }

    const sampleProducts = [
      {
        name: 'Premium Sparklers Pack',
        description: 'High-quality sparklers for celebrations and parties',
        price: 299.99,
        stock: 15,
        slug: 'premium-sparklers-pack',
        imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
        isActive: true,
      },
      {
        name: 'Fireworks Display Kit',
        description: 'Complete fireworks kit for grand celebrations',
        price: 199.99,
        stock: 20,
        slug: 'fireworks-display-kit',
        imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
        isActive: true,
      },
      {
        name: 'Traditional Laddu',
        description: 'Authentic traditional laddu made with pure ingredients',
        price: 249.99,
        stock: 8,
        slug: 'traditional-laddu',
        imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg',
        isActive: true,
      },
      {
        name: 'Gulab Jamun Mix',
        description: 'Premium gulab jamun mix for homemade sweets',
        price: 29.99,
        stock: 50,
        slug: 'gulab-jamun-mix',
        imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
        isActive: true,
      },
      {
        name: 'Chocolate Cake',
        description: 'Delicious chocolate cake for celebrations',
        price: 129.99,
        stock: 12,
        slug: 'chocolate-cake',
        imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
        isActive: true,
      },
      {
        name: 'Ice Cream Sundae',
        description: 'Premium ice cream sundae with toppings',
        price: 49.99,
        stock: 30,
        slug: 'ice-cream-sundae',
        imageUrl: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
        isActive: true,
      },
    ];

    for (const productData of sampleProducts) {
      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);
    }
  }
} 