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
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Premium wireless headphones with active noise cancellation for an immersive audio experience.',
        price: 299.99,
        stock: 15,
        slug: 'wireless-noise-cancelling-headphones',
        imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        isActive: true,
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
        price: 199.99,
        stock: 20,
        slug: 'smart-fitness-watch',
        imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        isActive: true,
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Comfortable office chair with lumbar support and adjustable height for better posture.',
        price: 249.99,
        stock: 8,
        slug: 'ergonomic-office-chair',
        imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        isActive: true,
      },
      {
        name: 'Organic Cotton T-Shirt',
        description: 'Soft and breathable t-shirt made from 100% organic cotton.',
        price: 29.99,
        stock: 50,
        slug: 'organic-cotton-tshirt',
        imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        isActive: true,
      },
      {
        name: 'Professional Blender',
        description: 'High-powered blender for smoothies, soups, and more with multiple speed settings.',
        price: 129.99,
        stock: 12,
        slug: 'professional-blender',
        imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        isActive: true,
      },
      {
        name: 'Leather Wallet',
        description: 'Genuine leather wallet with multiple card slots and RFID protection.',
        price: 49.99,
        stock: 30,
        slug: 'leather-wallet',
        imageUrl: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        isActive: true,
      },
    ];

    for (const productData of sampleProducts) {
      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);
    }
  }
} 