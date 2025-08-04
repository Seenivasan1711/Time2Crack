import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '../../../common/enums';
export declare class Order {
    id: number;
    userId: number;
    status: OrderStatus;
    totalAmount: number;
    shippingAddress: string;
    deliveryDate: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    orderItems: OrderItem[];
}
