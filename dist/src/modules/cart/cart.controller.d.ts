import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getUserCart(req: any): Promise<import("./entities/cart.entity").Cart[]>;
    addToCart(req: any, addToCartDto: {
        productId: number;
        quantity: number;
    }): Promise<import("./entities/cart.entity").Cart>;
    updateCartItem(req: any, id: string, updateDto: {
        quantity: number;
    }): Promise<import("./entities/cart.entity").Cart | {
        message: string;
    }>;
    removeFromCart(req: any, id: string): Promise<{
        message: string;
    }>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
}
