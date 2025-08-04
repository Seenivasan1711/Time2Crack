import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
export declare class Cart {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    product: Product;
}
