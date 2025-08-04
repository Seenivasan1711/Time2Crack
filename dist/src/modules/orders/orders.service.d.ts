import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
export declare class OrdersService {
    private orderRepository;
    private orderItemRepository;
    private productRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productRepository: Repository<Product>);
    getUserOrders(userId: number): Promise<Order[]>;
    getOrderById(userId: number, orderId: number): Promise<Order>;
    createOrder(userId: number, createOrderDto: any): Promise<Order>;
}
