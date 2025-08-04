import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../products/entities/product.entity';
export declare class CartService {
    private cartRepository;
    private productRepository;
    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>);
    getUserCart(userId: number): Promise<Cart[]>;
    addToCart(userId: number, productId: number, quantity: number): Promise<Cart>;
    updateCartItem(userId: number, cartItemId: number, quantity: number): Promise<Cart | {
        message: string;
    }>;
    removeFromCart(userId: number, cartItemId: number): Promise<{
        message: string;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
}
