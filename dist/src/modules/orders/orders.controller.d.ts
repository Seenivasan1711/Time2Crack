import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getUserOrders(req: any): Promise<import("./entities/order.entity").Order[]>;
    getOrderById(req: any, id: string): Promise<import("./entities/order.entity").Order>;
    createOrder(req: any, createOrderDto: any): Promise<import("./entities/order.entity").Order>;
}
