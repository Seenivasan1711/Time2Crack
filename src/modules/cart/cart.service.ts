import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getUserCart(userId: number) {
    return this.cartRepository.find({
      where: { userId },
      relations: ['product'],
    });
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    // Check if product exists
    const product = await this.productRepository.findOne({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Check if item already exists in cart
    const existingCartItem = await this.cartRepository.findOne({
      where: { userId, productId },
    });

    if (existingCartItem) {
      // Update quantity
      existingCartItem.quantity += quantity;
      return this.cartRepository.save(existingCartItem);
    } else {
      // Create new cart item
      const cartItem = this.cartRepository.create({
        userId,
        productId,
        quantity,
      });
      return this.cartRepository.save(cartItem);
    }
  }

  async updateCartItem(userId: number, cartItemId: number, quantity: number) {
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, userId },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }

    if (quantity <= 0) {
      await this.cartRepository.remove(cartItem);
      return { message: 'Cart item removed' };
    }

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeFromCart(userId: number, cartItemId: number) {
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, userId },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }

    await this.cartRepository.remove(cartItem);
    return { message: 'Cart item removed successfully' };
  }

  async clearCart(userId: number) {
    await this.cartRepository.delete({ userId });
    return { message: 'Cart cleared successfully' };
  }
} 