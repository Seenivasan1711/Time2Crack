import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';
export declare class OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    order: Order;
    product: Product;
}
